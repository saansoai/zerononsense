<?php

declare(strict_types=1);

/*
 * Contact endpoint for the enquiry form in src/components/Contact.jsx.
 *
 * It lives in public/, so the build copies it to the root of dist/ and it is
 * served at /contact.php. Point the form at it with
 * VITE_CONTACT_ENDPOINT=/contact.php — same origin, which is why the site's
 * Content-Security-Policy can keep connect-src at 'self'.
 *
 * Only Hostinger runs it: there is no PHP in `vite dev`, so locally the form
 * keeps its mail-client fallback.
 *
 * The From address has to be on this domain or SPF and DKIM will not vouch for
 * it and the mail lands in spam. The visitor's address goes in Reply-To, so
 * hitting reply answers them.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const RECIPIENT = 'info@zerononsense.in';
const SENDER = 'website@zerononsense.in';
const MIN_SECONDS_BETWEEN = 20;

function fail(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function succeed(): void
{
    echo json_encode(['ok' => true]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Send this as a POST.');
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '') {
    fail(400, 'Empty request.');
}
if (strlen($raw) > 20000) {
    fail(413, 'That message is too long to send.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail(400, 'Expected a JSON object.');
}

$field = static function (string $key) use ($data): string {
    return trim((string) ($data[$key] ?? ''));
};

/* The form hides this field from sight and from assistive technology, so
   anything in it came from a bot. Answer 200 so it cannot tell. */
if ($field('company') !== '') {
    succeed();
}

$name = $field('name');
$email = $field('email');
$phone = $field('phone');
$subject = $field('subject');
$message = $field('message');

if ($name === '' || $email === '' || $message === '') {
    fail(422, 'Name, email and message are all needed.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'That email address does not look right.');
}
if (
    mb_strlen($name) > 120
    || mb_strlen($email) > 254
    || mb_strlen($phone) > 40
    || mb_strlen($subject) > 200
    || mb_strlen($message) > 5000
) {
    fail(422, 'One of those fields is longer than we can accept.');
}

/* A newline in a value that reaches a mail header would let the sender write
   headers of their own. Reject rather than strip — a legitimate enquiry has no
   line breaks in its name or phone number. */
foreach ([$name, $email, $phone, $subject] as $value) {
    if (preg_match('/[\r\n]/', $value) === 1) {
        fail(422, 'Line breaks are not allowed in that field.');
    }
}

/* A light throttle, so a single source cannot hammer the mailbox. Any failure
   to read or write the marker is ignored: throttling must never be the reason
   a genuine enquiry is lost. */
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
if ($ip !== '') {
    $marker = sys_get_temp_dir() . '/zn-contact-' . sha1($ip);
    $last = @filemtime($marker);
    if ($last !== false && (time() - $last) < MIN_SECONDS_BETWEEN) {
        fail(429, 'That was sent a moment ago — give it a minute before sending another.');
    }
    @touch($marker);
}

$lines = [
    $message,
    '',
    '—',
    'Name:    ' . $name,
    'Email:   ' . $email,
];
if ($phone !== '') {
    $lines[] = 'Phone:   ' . $phone;
}
$lines[] = 'Enquiry: ' . ($subject !== '' ? $subject : 'not stated');
$lines[] = 'Sent:    ' . gmdate('Y-m-d H:i') . ' UTC';
$lines[] = 'From IP: ' . ($ip !== '' ? $ip : 'unknown');

$headers = [
    'From: Zero Nonsense website <' . SENDER . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
];

$sent = mail(
    RECIPIENT,
    mb_encode_mimeheader($subject !== '' ? $subject : 'Website enquiry', 'UTF-8'),
    implode("\r\n", $lines),
    implode("\r\n", $headers)
);

if (!$sent) {
    fail(502, 'The message could not be sent.');
}

succeed();

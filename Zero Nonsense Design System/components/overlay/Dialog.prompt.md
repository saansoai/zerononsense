Modal on a blurred blue scrim; serif title, asterisk close button.

```jsx
<Dialog open={open} onClose={()=>setOpen(false)} title="Added to bag"
  footer={<Button onClick={()=>setOpen(false)}>Checkout</Button>}>14 sachets · ₹699</Dialog>
```


export default function OrderSummary({cart}){

// Total price
const subtotal = cart.reduce((sum, item) => {
  return sum + item.product.price * item.quantity;
}, 0);

// Total quantity (important fix)
const totalItems = cart.reduce((sum, item) => {
  return sum + item.quantity;
}, 0);

// Discount (20%)
const discount = subtotal * 0.2;

// Final total
const finalTotal = subtotal - discount;

    return (
      <div className="cart-right ms-5 me-5">
  <h3>Order Summary</h3>
  <hr className="mt-3"/>


  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{subtotal}</span>
  </div>

  <div className="summary-row">
   <span>Total Items</span>
  <span>{totalItems}</span>
  </div>

  <div className="summary-row">
    <span>Discount</span>
    <span>20%</span>
    {/* <span>₹{total * 0.2}</span> */}
  </div>

  



<hr/>
  <div className="summary-row total">
   <span>Total Cost   </span>

    {/* <span>   ₹{subtotal - (subtotal * 0.2)}</span> */}
    <span>₹{finalTotal}</span>
  </div>

 
</div>
            
    );
}
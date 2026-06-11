import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

const [cart, setCart] = useState([]);
  
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.userId;

useEffect(() => {
  if (userId) {
    axios.get(`http://localhost:8080/cart/${userId}`)
      .then((res) => setCart(res.data));
  }
}, [userId]); 


const updateQuantity = async (cartId, newQty) => {
  try {
    await axios.put(`http://localhost:8080/cart/${cartId}?quantity=${newQty}`);

    setCart(prevCart =>
      prevCart.map(item => {
        if (item.cartId === cartId) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  } catch (err) {
    console.log(err);
  }
};


const removeCartItem = async (cartId) =>{

  try{
      await axios.delete(`http://localhost:8080/cart/${cartId}`);
      setCart(prev => prev.filter(item => item.cartId != cartId));
  }catch(err){
    console.log(err);
  }
}

const clearCart = async () => {
  try {
    await axios.delete(`http://localhost:8080/cart/clear/${userId}`);
    setCart([]);
  } catch (err) {
    console.log(err);
  }
};

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
    <div className="cart-container bg-white" >

      {/* LEFT */}
      <div className="cart-left">
        <h2>Shopping Cart</h2>

        <div className="cart-header">
          <span>Product</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>

        {cart.map(item => (
          <div className="cart-row" key={item.cartId}>

            {/* PRODUCT */}
            <div className="product-info">
              <img src={item.product.imgUrl} alt="" />
              <div>
                <p>{item.product.name}</p>
                <small  onClick={() => removeCartItem(item.cartId)}>Remove</small>
              </div>
            </div>

            {/* QUANTITY */}
   <div className="qty-box">
  <button 
    disabled={item.quantity === 1}
    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
  >
    -
  </button>

  <span>{item.quantity}</span>

  <button 
    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
  >
    +
  </button>
</div>

            {/* PRICE */}
            <div>₹{item.product.price}</div>

            {/* TOTAL */}
            <div>₹{item.product.price * item.quantity}</div>

         
          </div>
          
        ))}
{/* <a href="/shop" className="continue-link">
  ← Continue Shopping
</a> */}

<div className="d-flex justify-content-between align-items-center mt-3">

  {/* LEFT */}
  <a href="/shop" className="continue-link">
    ← Continue Shopping
  </a>

  {/* RIGHT (Empty Cart Icon) */}
  <i className="bi bi-trash btn btn-danger" style={{ cursor: "pointer", fontSize: "20px" }} onClick={clearCart}></i>

</div>


 

      </div>

      
    {/* RIGHT */}
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

  <button className="checkout-btn" onClick={()=>navigate("/checkout")}>
   Checkout 
  </button>
</div>
</div>
  );
}

export default Cart;
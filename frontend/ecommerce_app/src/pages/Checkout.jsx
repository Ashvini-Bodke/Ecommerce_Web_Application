import { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";
import OrderSummary from "./OrderSummary";
import { toast } from "react-toastify";

function Checkout() {

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/cart/${userId}`)
        .then(res => setCart(res.data));
    }
  }, [userId]);

  // calculations
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const discount = subtotal * 0.2;
  const finalTotal = subtotal - discount;

  const handlePlaceOrder = async () => {

      if (!address.name || !address.phone || !address.address) {
    toast.error("Please fill all details");
    return;
  }

  if (!userId) {
    toast.error("User not logged in");
    return;
  }


    const orderData = {
        user:{
            userId:userId
        },
   
       name : address.name,
       phone : address.phone,
       address: address.address,
       paymentMethod,
      totalAmount: finalTotal
    };

    try {
      await axios.post("http://localhost:8080/order", orderData);
      toast.success("order placed successfullty")
    } catch (err) {
      console.log(err);
      toast.error("Order failed");
    }
  };

  return (
    <div className="checkout-container ms-5 me-5 ">

      {/* LEFT */}
      <div className="checkout-left">

        <h3>Shipping Address</h3>
<div className="mb-3 ">
        <input
          placeholder="Full Name"
          value={address.name}
          onChange={(e) =>
            setAddress({ ...address, name: e.target.value })
          }
          style={{borderRadius:4}}
          required
        />

        </div>

   <div className="mb-3">

        <input
          placeholder="Phone"
          value={address.phone}
          onChange={(e) =>
            setAddress({ ...address, phone: e.target.value })
          }
          style={{borderRadius:4}}
          required
        />

        </div>

          <div className="mb-3">

        <textarea
          placeholder="Full Address"
          value={address.address}
          onChange={(e) =>
            setAddress({ ...address, address: e.target.value })
          }
          style={{borderRadius:4}}
          required
        />

        </div>

        <h4>Payment Method</h4>

<div className="ms-2 p-4 d-flex align-items-center gap-4">
       <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
           
          />
         CASH
        </label>
      
      

       <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
         name="payment"
            value="UPI"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <label className="d-flex align-items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="CARD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card
        </label>

</div>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>

      </div>

      {/* RIGHT */}
      <div className="checkout-right">
        <OrderSummary cart={cart}/>

      </div>
    </div>
  );
}

export default Checkout;
import axios from "axios";
import { useEffect, useState } from "react";


import "./Shop.css";
import {  useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




export default function Shop(){

  const[categories,setCategories] = useState([]);
  const[products,setProducts] = useState([]);
  const navigate = useNavigate();



  //search
   const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");



  // load all categories
  useEffect(()=>{
    axios.get("http://localhost:8080/categories")
    .then(res => setCategories(res.data))
    .catch(err=>console.log(err));
  },[]);

  //load all products
  useEffect(()=>{
  loadAllProducts()
  },[]);


  const loadAllProducts = () =>{
    axios.get("http://localhost:8080/products")
   .then(res => setProducts(res.data))
   .catch(err => console.log(err));
  }


  const handleCategoryClick = (id) =>{
    axios.get(`http://localhost:8080/products/categories/${id}`)
    .then(res => setProducts(res.data) );
   
  };


 const addToCart = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  await axios.post("http://localhost:8080/cart/add", null, {
    params: {
      userId: user.userId,
      productId: product.proId,
      quantity: 1
    }
  });
};


//search
  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then(res => {
      //  console.log("All products:", res.data); 

        if (keyword) {
          const filtered = res.data.filter((item) =>
            item.name.toLowerCase().includes(keyword.toLowerCase())
          );

          console.log("Filtered:", filtered); // debug
          setProducts(filtered);
        } else {
          setProducts(res.data);
        }
      });
  }, [keyword]);


    return (
       <div className="container mt-4">

        <div className="d-flex gap-3 flex-wrap mb-4 justify-content-center">
            <button className="category-btn" onClick={loadAllProducts}>All Products</button>
       

        {categories.map(cat =>(
            <button key={cat.catId}
            className="category-btn"
         onClick={()=>handleCategoryClick(cat.catId)}
        
            >{cat.name} 
           
            </button>
              
            ))}
             

       </div>

       <div className="row">
         {products.map(prod =>(
            <div className="col-md-3 mb-4" key={prod.proId}>

       <div className="card product-card shadow-sm">
              
              <img
                src={prod.imgUrl}
                className="card-img-top"
                alt={prod.name}
                style={{height:"180px",objectFit:"cover"}}

              />

              <div className="card-body text-center">
                <h5>{prod.name}</h5>
                <p >₹{prod.price}</p>

                <button className="btn btn-warning btn-sm" 
                
              onClick={async () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  try {
  await addToCart(prod);
  toast.success("added to cart");
  navigate("/cart");
} catch (err) {
  console.log(err);
  alert("Failed");
}
}}
                >
                  Add to Cart
                </button>
              </div>
              </div>
              </div>
       
           
        ))}

      </div>
       </div>

    );

}
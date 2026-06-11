import Footer from "./Footer";
import Shop from "./Shop";

export default function Home(){
    return (
        <>
   <div className="bg-dark text-white text-center d-flex align-items-center justify-content-center"
     style={{ height: "300px" }}>
          {/* <img src="https://images-eu.ssl-images-amazon.com/images/G/31/events/MegaDealsEvents/PCHomepageHERO/KV_PC._CB781365480_.jpg"/> */}

  <div>
 
    <h1>Welcome to Our Shop</h1>
    <p>Best Products at Best Price</p>
    <button className="btn btn-prim  ary">Shop Now</button>
  </div>

</div>

<div className="container mt-4">
  

  <div className="d-flex gap-3 flex-wrap">

    <div className="text-center">
      <Shop/>
    </div>
  </div>


</div>

<div className=" text-white text-center p-3">
  <Footer/>
</div>
    </>
    );
}
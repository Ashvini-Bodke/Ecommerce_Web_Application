import { useNavigate } from "react-router-dom";
import ProductList from "../components/products/ProductList";

export default function ManageProducts(){
              
   const  navigate  = useNavigate();
    return(

      <div className="container mt-4">
    <h5 className="text-center mb-4">Manage Products</h5>
          
           <button className="btn btn-primary" onClick={()=>navigate("/add-products")}>Add Products</button>
           <ProductList/>
        </div>
    );
}
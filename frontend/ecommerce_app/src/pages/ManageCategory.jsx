


import { useNavigate } from "react-router-dom";
import CategoryList from "../components/category/CategoryList";

export default function ManageCategory(){
  const navigate  = useNavigate();

    return (      
        <div>
<div className="container mt-4">
    <h5 className="text-center">Manage Categories</h5>
    <button className="btn btn-primary" onClick={()=>navigate("/add-category")}>Add Category</button>
</div>
<div>
    <CategoryList/>
</div>
</div> 


    );
}
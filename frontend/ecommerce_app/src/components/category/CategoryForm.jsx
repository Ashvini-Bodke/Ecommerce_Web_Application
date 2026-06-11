import { useState } from "react";
import axios from "axios"


import "./CategoryForm.css";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";



// update 
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function CategoryForm(){
   
    const[catName,setCatName] = useState("");
    const navigate = useNavigate();


    // update sathi
    const { id } = useParams();
   




    useEffect(()=>{

      if(id){
        
        loadCategoryById();
      }
    },[id]);


    const loadCategoryById = async () =>{
    
      const res = await axios.get(`http://localhost:8080/categories/${id}`);
       setCatName(res.data.name);
    }
  

    const handleSubmit = async (e) =>{
        e.preventDefault();

       

          if(id){

             try{
            //update
            await axios.put(`http://localhost:8080/admin/categories/${id}`,{name:catName});
            toast.success("category updated");
            setCatName("");
            navigate("/manageCategory")
             }catch(err){
              toast.error("error in update category ");
             }

          }else{

            try{
               //add
               const response = await axios.post("http://localhost:8080/admin/categories",{name:catName});
             setCatName("");
             toast.success("Category added successfully");
             navigate("/manageCategory")
             console.log(response);
            

            }catch(err){
          console.log(err);
            toast.warning("category already exists or erro");
        }
         }
        
    }


    

    const cancelCategory = () =>{
       setCatName("");

    };

// update
    
   
   return (
   
  <div className="container mt-5">
  <div className="row">
    
    <div className="col-md-6">  
        <h3>{id ? "Update Category" : "Add Category"}</h3>

      <div className="form-box">

  <form className="card p-3 shadow form-inline" onSubmit={handleSubmit}>
  
  <div className="form-row">
    
    <input
      type="text"
      className="form-control"
      placeholder="Enter category Name"
      value={catName}
      onChange={(e) => setCatName(e.target.value)}
      required
    />

  
    <button type="submit" className="btn btn-primary">
      {id ? "Update" : "Add"}
    </button>
     <button type="cancel" className="btn btn-danger" onClick={cancelCategory}>
      Cancel
    </button>

  </div>

</form>
    </div>
    </div>

  </div>
</div>
   );
}
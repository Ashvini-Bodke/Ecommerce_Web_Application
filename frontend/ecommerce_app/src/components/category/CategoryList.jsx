import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CategoryList(){

    const [categories,setCategories] = useState([]);
     const navigate = useNavigate();

    useEffect(()=>{
        loadCategories();
    },[]);

    const  loadCategories = async() =>{
        const res = await axios.get("http://localhost:8080/categories");
        setCategories(res.data);

    }

    const deletecategory = async (id) =>{
        await axios.delete(`http://localhost:8080/admin/categories/${id}`)
        .then(()=>{
            toast.success("Category deleted");
             loadCategories();
        })
        .catch(()=>{
            toast.error("Delete failed");
        });
      
    }

  
    return(
        <div className="container mt-4">
           <table className="table table-striped mt-3 ms-3 me-5  text-center shadow"   style={{ borderRadius: "20px"}}
>
         <thead>
        <tr>
            <th>Id</th>
            <th>name</th>
            <th>Actions</th>
        </tr>
        </thead>


       <tbody>
        {categories.map((cat)=>(
            <tr key={cat.catId}>
                <td>{cat.catId}</td>
                <td>{cat.name}</td>
                <td>
                    <button className="update-btn btn btn-success" onClick={() => navigate(`/add-category/${cat.catId}`)}>Update</button>
                </td>

                <td><button className="delete-btn btn btn-danger" onClick={()=>deletecategory(cat.catId)}>Delete</button></td>
            </tr>
        ))}
       </tbody>
        </table> 
        </div>
    )
    
}
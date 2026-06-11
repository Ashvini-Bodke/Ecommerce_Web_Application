import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductForm() {

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imgUrl: "",
    catId: ""
  });

  const navigate = useNavigate();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // load categories
  useEffect(() => {
    axios.get("http://localhost:8080/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load categories");
      });
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.price || !formData.imgUrl || !formData.catId) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    await axios.post("http://localhost:8080/admin/products", {
      name: formData.name,
      price: formData.price,
      imgUrl: formData.imgUrl,
       category:{
        catId : Number(formData.catId)
       } 
   
       
    });

    toast.success("Product added successfully");
    navigate("/manageProducts");

  } catch (err) {
    console.log(err);
    toast.error("Error adding product");
  }
};
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">

      <div className="card p-4 shadow" style={{ width: "500px" }}>
        
        <h4 className="text-center mb-4">Add Product</h4>

        <form onSubmit={handleSubmit}>


          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
          />

     
          <input
            type="number"
            name="price"
            className="form-control mb-3"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
          />

      
          <input
            type="text"
            name="imgUrl"
            className="form-control mb-3"
            placeholder="Enter image URL"
            value={formData.imgUrl}
            onChange={handleChange}
          />

         
          <select
            name="catId"
            className="form-control mb-3"
            value={formData.catId}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

      {categories.map((cat, index) => (
  <option key={cat.catId ?? index} value={cat.catId}>
    {cat.name}
  </option>
))}
            
          </select>

          <button className="btn btn-primary w-100">
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}
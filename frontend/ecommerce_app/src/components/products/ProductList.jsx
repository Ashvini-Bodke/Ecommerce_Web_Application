import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductList(){
    const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // fetch products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
  };

  // delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/products/${id}`);
      toast.success("Product deleted");
      loadProducts(); // refresh list
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (

  
    <div className="container mt-4">
      <table className="table table-striped mt-3 ms-3 me-5  text-center shadow">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.proId}>

              <td>{p.proId}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>

              <td>
                <img
                  src={p.imgUrl}
                  alt={p.name}
                  width="60"
                  height="60"
                />
              </td>

              <td>
                {p.category ? p.category.name : ""}
              </td>

              <td>

               
                <button
                  className="btn btn-success btn-sm me-2"
                
                >
                  Update
                </button>
                  </td>
                  <td>
              
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p.proId)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
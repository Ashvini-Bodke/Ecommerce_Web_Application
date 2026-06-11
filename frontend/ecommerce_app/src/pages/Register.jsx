import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/register", user);
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Register Failed");
    }
  };

 return (
  <div className="container-fluid d-flex align-items-center justify-content-center mt-5">
    
    <div className="card p-4 shadow" style={{ width: "350px" }}>
      
      <h3 className="text-center mb-3">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary w-100">Register</button>

        <p className="text-center mt-2 ">
          If already have an account <a href="/login" className="text-muted text-decoration-none hover-underline">login</a>
        </p>
      </form>

    </div>
  </div>
);
}
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8080/login", user);

    toast.success("Login successful");

    localStorage.setItem("isLoggedIn", "true");

    // user data store
    localStorage.setItem("user", JSON.stringify(res.data));

    navigate("/home");

  } catch (err) {
    console.log(err);
    toast.error("Invalid email or password");
  }
};

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ width: "350px" }}>

        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>

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

          <button className="btn btn-success w-100">Login</button>
           <p className="text-center mt-2 ">
          create an account <a href="/register" className="text-muted text-decoration-none hover-underline">register</a>
        </p>

        </form>

      </div>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {

 const [search, setSearch] = useState("");




  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };


  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  if (userId) {
    axios.get(`http://localhost:8080/cart/${userId}`)
      .then(res => {
        // const totalQty = res.data.reduce((sum, item) => {
        //   return sum + item.quantity;
        // }, 0);

        const totalItems = res.data.length;

        setCartCount(totalItems);
      })
      .catch(err => console.log(err));
  }
}, []);



const handleSearch = () => {
  console.log("Search clicked:", search); // debug

  if (search.trim() !== "") {
    navigate(`/shop?keyword=${search}`);
  }
};


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 sticky-top">
      <div className="container-fluid">

        <a className="navbar-brand fw-bold">eshop</a>

        <div className="collapse navbar-collapse">

          {/* LEFT MENU */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>

            {/* ADMIN ONLY */}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/manageCategory">
                    Manage Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/manageProducts">
                    Manage Products
                  </Link>
                </li>
              </>
            )}

          </ul>

          {/* SEARCH */}
          <form className="d-flex mx-auto w-50" style={{ maxWidth: "400px" }}  onSubmit={(e) => e.preventDefault()}>
            <input className="form-control me-2" placeholder="Search..."  
            value={search}
  onChange={(e) => setSearch(e.target.value)}

            />
            <button className="btn btn-warning"
            onClick={handleSearch}
            >Search</button>
          </form>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center gap-2 ms-auto">

            {/* USER INFO */}
            {/* {isLoggedIn && (
              <span className="me-2 fw-bold">
                {user?.email}
              </span>
            )} */}

            {/* LOGIN / LOGOUT */}
            {!isLoggedIn ? (
              <button
                className="btn btn-outline-danger"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

            {/* CART */}
            <button
              className="btn btn-outline-warning position-relative"
              onClick={() => {
                const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  
              }}
            >
              Cart 🛒
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                  {cartCount}
              </span>
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
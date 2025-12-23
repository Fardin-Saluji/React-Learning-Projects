import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      {!user && <Link to="/register">Register</Link>} |{" "}
      {!user && <Link to="/login">Login</Link>}
      {user && <button onClick={logout}>Logout</button>}

    </nav>
  );
}

export default Navbar;

import { useState } from "react";
import "./Registration.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../Context/Auth";
import img from "../../Components/assets/image.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, {
          position: "bottom-center",
          duration: 12000,
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  return (
    <Layout>
      <form className="main" onSubmit={handleSubmit}>
        <div className="left-side gradient-custom-2">
          <img src={img} className="img-fluid" alt="Sample image" />
        </div>
        <div className="cn">
          <h1>LOGIN YOUR ACCOUNT</h1>

          <div className="box">
            <input
              className="name"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="fname"
              name="fname"
              required
            />
          </div>
          <div className="box">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
          <br />
          <br />
          <div className="box">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="notice">
            If you have not an account{" "}
            <span>
              <Link to="/register" onClick={handleClick}>
                Register here
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;

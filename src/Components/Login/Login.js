import { useEffect, useState } from 'react';
import './Login.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import Toast from "../AlertAndLoader/Toast"
import Loader from '../AlertAndLoader/Loader';
import Alert from '../AlertAndLoader/Alert';
import { FaArrowTrendUp } from 'react-icons/fa6';

const Login = () => {
  const initialFormData = {
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(FaArrowTrendUp);

  const [messege, setMessege] = useState("");



  const handleToastClose = () => {
    setMessege("");
    setShowToast(false);
  };

  const handleAlertClose = () => {
    setMessege("");
    setShowAlert(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      const response = await axios.post("https://aurora-nokc.onrender.com/loginUser", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log(response.data);
      setMessege("Logged in successfully");
      setShowToast(true);
    } catch (e) {
      setMessege("Invalid Credentials");
      setShowAlert(true);
      console.log(e);

    }
    setFormData(initialFormData)
  }

  const handleForgetPassword = async () => {
    try {
      const res = await axios.post(
        "https://aurora-nokc.onrender.com/forgetPass", { "email": formData.email, "type": "user" }, {
        "headers": {
          "Content-Type": "application/json"
        }
      }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }

    setFormData(initialFormData);
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    <div className="login">
      {showToast && (
        <Toast message={messege} duration={3000} onClose={handleToastClose} />
      )}
      {showAlert && (
        <Alert message={messege} duration={3000} onClose={handleAlertClose} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="login_big-box">
          <h1 class="login_welcome">Welcome Back</h1>
          <div className="login_box">
            <form action="submit">
              <h2 className="login_h2">
                L
                <span>
                  <img src={require("./images/o.png")} alt="" />
                </span>
                gin
              </h2>
              <div className="login_user-box">
                <input
                  type="text"
                  autoComplete="off"
                  className="login_input"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
                <label className="login_input-txt" htmlFor="email">
                  Email
                </label>
              </div>
              <div className="login_user-box">
                <input
                  type="password"
                  className="login_input"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  required
                />
                <label className="login_input-txt" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="login_button">
                <a className="login_a" onClick={handleSubmit}>
                  <button className="login_btn">Click to log in</button>
                </a>
              </div>
              <div className="login_link">
                <a
                  href=""
                  className="forget_link"
                  onClick={handleForgetPassword}
                >
                  Forgot Password?
                </a>
                <hr />
                <p>Not Registered yet?</p>
                <a className="login_a" href={"/signup"}>
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

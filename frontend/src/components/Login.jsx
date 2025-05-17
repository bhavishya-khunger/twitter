import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username || !password || (!isLogin && (!fullname || !email))) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const res = await axios.post(`https://twitter-r47g.vercel.app/api/v1/user/login`, { username, password }, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true,
        });
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate('/');
          toast.success(res.data.message, { duration: 1500 });
        }

        setUsername("");
        setPassword("");
      } else {
        // Sign up
        // Sign up
        const res = await axios.post(`${USER_API_ENDPOINT}/register`, {
          fullname, username, email, password
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log("Register response:", res.data);

        if (!res.data.success) {
          throw new Error(res.data.message || "Registration failed");
        }

        const loginRes = await axios.post(`${USER_API_ENDPOINT}/login`, {
          username, password
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        console.log("Login Response : ", loginRes.data)

        dispatch(getUser(loginRes.data?.user));
        // dispatch(setToken(loginRes.data?.token));
        navigate('/');
        toast.success(res.data.message, { duration: 1500 });

        setUsername("");
        setFullname("");
        setEmail("");
        setPassword("");
      }
    }
    catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Something went wrong. Try again later.");
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  let inputCss = "h-10 rounded-full px-4 w-full bg-black border border-gray-600";
  let loginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-[40vh] md:h-full flex items-center justify-center">
        <img
          className="w-40 md:w-[80%]"
          src="https://freepnglogo.com/images/all_img/1707222563twitter-logo-png.png"
          alt="Twitter"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 px-6 md:px-12 py-4">
        <h1 className="font-bold text-4xl md:text-7xl text-center">Happening Now</h1>
        <h3 className="font-bold text-xl md:text-3xl mt-2 md:mt-6 text-center">
          {isLogin ? "Join in!" : "Join today."}
        </h3>

        <form onSubmit={onSubmit} className="flex flex-col items-center gap-3 mt-4 w-full max-w-sm">
          {!isLogin && (
            <>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                name="fullname"
                type="text"
                placeholder="Name"
                className={inputCss}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="Email"
                className={inputCss}
              />
            </>
          )}

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
            className={inputCss}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            className={inputCss}
          />

          <button className="bg-[#1D9BF0] font-semibold py-2 px-6 mt-4 text-lg rounded-full hover:opacity-80">
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

        <h2 className="font-semibold text-md md:text-lg text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={loginHandler}
            className="cursor-pointer font-bold text-[#1D9BF0]"
          >
            {isLogin ? "Sign Up Now!" : "Login"}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Login;

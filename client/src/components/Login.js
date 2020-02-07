import React, { useState, useEffect } from "react";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { Alerts } from "./UI";

const Login = props => {
  const [alerts, setAlerts] = useState([]);
  const [auth, setAuth] = useState({ user: null, isAuthenticated: false, loading: true });

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      setAuth({ ...auth, user: loadUser() });
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get("/users/auth");
      console.log(res.data);
      return res.data;
    } catch (err) {
      //   const error = err.response.data;
      //   if (error) {
      console.log(err);
      setAlerts([...alerts, { msg: "loadUser : server error", alertType: "danger" }]);
      //   }
    }
  };

  const login = async (username, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = { username, password };

    try {
      const res = await axios.post("/auth", body, config);
      localStorage.setItem("token", res.data.token);
      const user = await loadUser();
      return {
        ...auth,
        user,
        isAuthenticated: true,
        loading: false
      };
    } catch (err) {
      console.log(err.response);
      const error = err.response.data;
      if (error) {
        setAlerts([...alerts, { msg: error.msg, alertType: "danger" }]);
      }
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    const { username, password } = formData;
    const loginResponse = await login(username, password);
    if (loginResponse) setAuth(loginResponse);
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [auth.isAuthenticated]);
  return (
    <div>
      <div className="loginpage" />
      <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 bg-white rounded border p-4 my-4">
        <form onSubmit={e => onSubmit(e)} className="px-md-3">
          <h1 className="py-3 px-0">Log in</h1>
          <Alerts alerts={alerts} />
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Username</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">Password</div>
            </div>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input className="btn btn-primary d-block ml-auto mb-2" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;

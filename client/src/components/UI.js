import React from "react";
import { Link } from "react-router-dom";
import Logo from "../mathbox.png";

export const Navbar = () => {
  const handleCollapseToggle = e => {
    const content = document.querySelector(e.currentTarget.getAttribute("data-target"));
    content.classList.toggle("show");
  };
  const handleCollapseHide = e => {
    const content = document.querySelector(e.currentTarget.getAttribute("data-target"));
    content.classList.remove("show");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">
        <img src={Logo} alt="Mathbox logo" height="48" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        onClick={e => handleCollapseToggle(e)}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        </ul> */}
        <form className="form-inline my-2 my-lg-0 mr-auto">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <UserBar/>
      </div>
    </nav>
  );
};

export const UserBar = props => {
  const { user } = props;
  return (
    <div className="px-2">
      {user == null ? (
        <Link to="/login">Log in</Link>
      ) : (
        <div>
          <Link to="/profile">{user.name}</Link>
        </div>
      )}
    </div>
  );
};

export const ToolRow = props => {
  const { tool } = props;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={`/tools/${tool.tool_id}`} className="h5" >{tool.tool_name}</Link>
        <p className="card-text mb-1">{tool.tool_name}</p>
        <p className="card-text">
          <small className="text-muted">ID : {tool.tool_id}</small>
        </p>
      </div>
    </div>
  );
};


export const Alerts = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`mb-1 alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
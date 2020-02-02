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

export const AlgorithmRow = props => {
  const { algorithm } = props;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{algorithm.name}</h5>
        <p className="card-text">{algorithm.description}</p>
        <p className="card-text">
          <small className="text-muted">{algorithm.id}</small>
        </p>
      </div>
    </div>
  );
};

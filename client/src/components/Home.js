import React from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import * as API from "../API";
import Logo from "../mathbox.png";
import { UserBar } from "./UI";

const Home = async () => {
  useEffect(() => {
    const fields = await API.getAllFields();
    console.log(fields)
  }, [])
  const popularAlgorithms = API.getFeaturedTools();
  return (
    <div>
      <div className="col-12 px-4 pt-4 text-right">
        <UserBar />
      </div>
      <div className="container position-relative">
        {/* <div className="row px-2 px-sm-0"></div> */}
        <div className="p-4 pb-0 text-center ">
          <div className="p-2" id="logo">
            <img className="w-50" src={Logo} alt="Mathbox logo" />
          </div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search for an algorithm, tool, subject..." />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" id="button-addon">
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="text-center mb-3">
            <Link className="btn btn-primary btn-lg" to="/create">
              Create a new tool
            </Link>
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="h4 py-2">fields</div>
              {fields.map((value, i) => (
                <div className="card mb-2" key={i}>
                  <div className="card-body">
                    <b>
                      <Link to={value.id}>{value.name}</Link>
                    </b>
                  </div>
                </div>
              ))}
              <div className="card bg-primary mb-2">
                <Link className="text-white" to="/fields">
                  <div className="card-body">
                    Browse all fields <MdArrowForward />
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="h4 py-2">Featured algorithms</div>
              {popularAlgorithms.map((value, i) => (
                <div className="card mb-2" key={i}>
                  <div className="card-body">
                    <b>
                      <Link to={value.id}>{value.name}</Link>
                    </b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center" style={{ height: 60 }}>
          <div className="py-4 text-muted position-absolute" style={{ bottom: 0, right: 0, left: 0 }}>
            &copy; 2020 Mathbox
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

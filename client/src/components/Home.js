import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import * as API from "../API";
import Logo from "../mathbox.png";
import { UserBar } from "./UI";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

const Home = () => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    loading: true
  });
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      setAuth({ ...auth, user: loadUser() });
    }
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get("/users/auth");
      // console.log(res.data);
      return res.data;
    } catch (err) {
      //   const error = err.response.data;
      //   if (error) {
      // console.log(err);
      //   }
    }
  };

  const [state, setState] = useState({
    fields: [],
    tools: [],
    searchedTools: [],
    isSearch: false
  });

  useEffect(() => {
    const api = async () => {
      const fields = await API.getAllFields();
      const { data } = await axios.get("/tools");
      setState({
        ...state,
        fields,
        tools: data
      });
    };
    api();
  }, []);
  // const fields = API.getAllFields();
  //const popularTools = API.getFeaturedTools();

  const handleSearch = e => {
    console.log(state);
      if(e.target.value === ""){
        setState({
          ...state,
          searchedTools: [],
          isSearch: false
        })
      }else{
        console.log(e.target.value)
        setState({
          ...state,
          isSearch: true,
          searchedTools: state.tools.filter(({tool})=>{
              return tool.tool_name.toLowerCase().includes(e.target.value.toLowerCase())
          })
        }) 
      }
      // let newSatate = state.tools.filter((tool)=>{
      //   return tool.too_name === e.target.value
      // })
       
    }
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
            <input
              onChange={handleSearch}
              type="text"
              className="form-control"
              placeholder="Search for an algorithm, tool, subject..."
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon"
              >
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="text-center mb-3">
            {auth.user == null ? (
              <div />
            ) : (
              <Link className="btn btn-primary btn-lg" to="/create">
                Create a new tool
              </Link>
            )}
          </div>
          {console.log(state.isSearch)}
          {state.isSearch?(
            <div className="col-md-12 col-12">
                <div className="h4 py-2">Featured tools</div>
                {state.searchedTools.map(({tool}, i) =>
                   (
                    <div className="card mb-2" key={i}>
                      <div className="card-body">
                        <b>
                         
                          <Link to={`/tools/${tool.tool_id}`}>
                            {tool.tool_name}
                          </Link>
                        </b>
                      </div>
                    </div>
                  ) 
                )}
              </div>
          )
          : (
            <div className="row">
              <div className="col-md-6 col-12">
                <div className="h4 py-2">Fields</div>
                {state.fields.length > 0 &&
                  state.fields.map((value, i) => (
                    <div className="card mb-2" key={i}>
                      <div className="card-body">
                        <b>
                          
                          <Link to={"/fields/" + value.field_id}>
                            {value.field_name}
                          </Link>
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
                <div className="h4 py-2">Featured tools</div>
                {state.tools.map((tool, i) =>
                  i <= 4 ? (
                    <div className="card mb-2" key={i}>
                      <div className="card-body">
                        <b>
                       
                          <Link to={`/tools/${tool.tool.tool_id}`}>
                            {tool.tool.tool_name}
                          </Link>
                        </b>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="text-center" style={{ height: 60 }}>
          <div
            className="py-4 text-muted position-absolute"
            style={{ bottom: 0, right: 0, left: 0 }}
          >
            &copy; 2020 Mathbox
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, ToolRow } from "./UI";
import * as API from "../API";
import Axios from "axios";

const Fields = ({
  match: {
    params: { selectedFieldID }
  }
}) => {
  const [state, setState] = useState({
    fields: [],
    tools: [],
    fieldsLoading: true,
    toolsLoading: true
  });

  useEffect(() => {
    console.log("toolsloading" + state.toolsLoading);
  }, []);

  useEffect(() => {
    const api = async () => {
      const {
        data: { tools }
      } = await Axios.get("/tools/field/" + selectedFieldID);
      //console.log(tools);
      setState({
        ...state,
        tools,
        toolsLoading: false
      });
    };
    if (selectedFieldID && state.toolsLoading === true) {
      console.log("yeees");
      console.log(state);
      api();
      setTimeout(() => {
        setState(state => ({
          ...state,
          toolsLoading: true
        }));
      }, 800);
    }
  }, [selectedFieldID]);

  useEffect(() => {
    const getFields = async () => {
      const fields = await API.getAllFields();
      //console.log(selectedFieldID);
      setState({
        ...state,
        fields,
        fieldsLoading: false
      });
    };
    if (state.fieldsLoading === true) {
      getFields();
    }
  }, [selectedFieldID, state.fieldsLoading]);
  //const tools = API.getToolsinField(selectedFieldID);
  return (
    <div>
      <Navbar />
      <div className="px-3">
        <div className="row">
          <div className="col-12 col-md-3 h-100vh px-0" style={{ paddingTop: 74 }}>
            <div className="p-3 overflow-auto h-100">
              <div className="h4 py-2">Fields</div>

              {state.fields.map((value, i) => (
                <div className="card mb-2" key={i}>
                  <div className="card-body">
                    <b>
                      {console.log(value)}
                      <Link to={"/fields/" + value.field_id}>{value.field_name}</Link>
                    </b>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-9 h-100vh px-0" style={{ paddingTop: 74 }}>
            <div className="p-3 overflow-auto h-100">
              {state.tools.length > 0 ? (
                state.tools.map((value, i) => <ToolRow tool={value} key={i} />)
              ) : (
                <div className="text-muted h3 p-3">Select a field...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;

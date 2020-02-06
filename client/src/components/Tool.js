import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Alerts } from "./UI";
import * as API from "../API";
import Axios from "axios";

const Tool = ({
  match: {
    params: { toolID }
  }
}) => {
  // const tool = API.getTool(toolID);
  const [alerts, setAlerts] = useState([]);
  const [state, setState] = useState({
    loaded: false,
    inputs: [],
    output: "",
    tool: {}
  });

  useEffect(() => {}, []);

  let tool = {};

  useEffect(() => {
    const getTool = async () => {
      const response = await Axios.get("/tools/" + toolID);
      tool = response.data;
      if (state.loaded === false && tool.inputs !== undefined) setState(s => ({ ...s, inputs: tool.inputs, loaded: true, tool }));
    };
    getTool();
  }, [tool.inputs, state.loaded]);

  const onInputChange = (e, i) => {
    const { inputs } = state;
    inputs[i] = { ...inputs[i], [e.target.name]: e.target.value };
    setState({ ...state, inputs });
  };

  // useEffect(() => {
  //   console.log(state.inputs);
  // }, [state]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjR9LCJpYXQiOjE1ODA2ODQzMDMsImV4cCI6MTU4MTA0NDMwM30.85BWzRV5YYa5nZn55BrAh-e2KQhUbN02BG61L_JvU24"
        }
      };
      let s = "";
      for (let input of state.inputs) {
        s += input.value + " ";
      }
      s = s.trim();
      const body = { input: s };
      console.log(body);
      const res = await Axios.post("/tools/use/" + toolID, body, config);
      // const res = {};
      // const res = await API.executeTool();
      console.log("resonse is :")
      console.log(res)
      setState({
        ...state,
        output: res.data+"",
      });
      // setAlerts([...alerts, { msg: res.data.msg, alertType: "success" }])
    } catch (err) {
      console.log(err.response);
      if (err.response) setAlerts([...alerts, { msg: err.response.data.err || "Server error.", alertType: "danger" }]);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container px-3" style={{ paddingTop: 74 }}>
        <Alerts alerts={alerts} />
        {console.log(tool)}
        <div className="h2 py-3">{state.tool.tool_name}</div>
        <div className="mb-2">{state.tool.description}</div>
        <div className="mb-4">Field:<b> {state.tool.field ? state.tool.field.field_name : ""}</b></div>
        <div className="mb-4">Creation date: {state.tool.creation_date}</div>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="text-muted h5">Input</div>
          {state.inputs.map((input, id) => (
            <div className="input-group mb-2" key={id}>
              <div className="input-group-prepend">
                <div className="input-group-text bg-white">
                  <b className="mr-1">#{id + 1}</b> ({input.input_type})
                </div>
              </div>
              <input className="form-control" value={input.value} onChange={e => onInputChange(e, id)} id="value" name="value" />
            </div>
          ))}
          <div className="py-4">
            <input className="btn btn-primary" type="submit" value="Execute" />
          </div>
        </form>
        <div className="text-muted h5">Output</div>
        <pre className="p-2 bg-light border rounded border-secondary" readOnly >
          {state.output || "No outputs"}
        </pre>
      </div>
    </div>
  );
};

export default Tool;

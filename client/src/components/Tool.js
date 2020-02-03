import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Alerts } from "./UI";
import * as API from "../API";

const Tool = ({
  match: {
    params: { toolID }
  }
}) => {
  const tool = API.getTool(toolID);

  const [state, setState] = useState({
    loaded: false,
    inputs: [],
    alerts: [],
    output: ""
  });
  useEffect(() => {
    if (state.loaded === false && tool.inputs !== undefined) setState(s => ({ ...s, inputs: tool.inputs, loaded: true }));
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
      const res = {};
      // const res = await API.executeTool();
      setState({
        ...state,
        output: res.data.output,
        alerts: [...state.alerts, { text: res.data.msg, type: "success" }]
      });
    } catch (err) {
      if (err.response) setState({ ...state, alerts: [...state.alerts, { text: err.response.data.msg || "Server error.", type: "danger" }] });
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container px-3" style={{ paddingTop: 74 }}>
        <Alerts alerts={state.alerts} />
        <div className="h2 py-3">{tool.name}</div>
        <div className="mb-4">{tool.description}</div>
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
        <pre className="form-control" readOnly>
          No output.
        </pre>
      </div>
    </div>
  );
};

export default Tool;

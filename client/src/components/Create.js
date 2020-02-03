import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Alerts } from "./UI";
import * as API from "../API";
import { MdDelete, MdAdd } from "react-icons/md";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-clike.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";
import axios from "axios";

const Create = () => {
  const fields = API.getAllFields();
  const initialState = {
    tool: {
      name: "",
      field: "",
      description: "",
      code: "",
      inputs: [{ input_order: 1, input_type: "integer" }]
    },
    alerts: [],
    fields: [],
    
  }

  const [state, setState] = useState(initialState);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  useEffect(() => {
    console.log(state.alerts);
  }, [state.alerts]);

  useEffect(() => {
    const api = async () => {
      const fields = await API.getAllFields();
      setState({
        ...state,
        fields
      });
    };
    api();
  }, []);

  const handleChange = e => {
    console.log(state);
    setState({
      ...state,
      tool: { ...state.tool, [e.target.name]: e.target.value }
    });
  };

  const onInputChange = (e, i) => {
    const { inputs } = state.tool;
    inputs[i] = { ...inputs[i], [e.target.name]: e.target.value };
    setState({
      ...state,
      tool: { ...state.tool, inputs }
    });
  };

  const handleAddInput = e => {
    e.preventDefault();
    setState({
      ...state,
      tool: {
        ...state.tool,
        inputs: [
          ...state.tool.inputs,
          { input_order: state.tool.inputs.length + 1, input_type: "integer" }
        ]
      }
    });
  };

  const handleRemoveInput = (e, id) => {
    e.preventDefault();
    setState({
      ...state,
      tool: {
        ...state.tool,
        inputs: state.tool.inputs.filter((s, sid) => id !== sid)
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      //token just for test
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjR9LCJpYXQiOjE1ODA2ODQzMDMsImV4cCI6MTU4MTA0NDMwM30.85BWzRV5YYa5nZn55BrAh-e2KQhUbN02BG61L_JvU24"
        }
      };
      const body = {
        tool_name: state.tool.name,
        field_id: state.tool.field,
        code: state.tool.code,
        input: state.tool.inputs
      };
      const res = await axios.post("/tools", body, config);
      setState(initialState)
      // setState({
      //   ...state,
      //   alerts: [...state.alerts, { text: res.data.msg, type: "success" }]
      // });
    } catch (err) {
      if (err.response)
        setState({
          ...state,
          alerts: [
            ...state.alerts,
            {
              text: err.response.data.msg || "Server error.",
              log: err.response.data.log,
              type: "danger"
            }
          ]
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container px-3" style={{ paddingTop: 74 }}>
        <Alerts alerts={state.alerts} />
        <div className="h2 py-3">Create a new tool</div>
        <form onSubmit={e => handleSubmit(e)} className="form-group mb-3">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text text-body">Name</div>
            </div>
            <input
              required
              className="form-control text-body"
              type="text"
              value={state.tool.name}
              name="name"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text text-body">Field</div>
            </div>
            <select
              className="custom-select"
              value={state.tool.field}
              onChange={e => handleChange(e)}
              name="field"
            >
              <option disabled value="">
                Choose a field
              </option>
              {state.fields.map((field, i) => (
                <option value={field.field_id}>{field.field_name}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Description of the tool..."
            required
            className="form-control text-body mb-2"
            value={state.tool.description}
            name="description"
            onChange={e => handleChange(e)}
          />
          <div className="form-control text-body code-editor mb-2 overflow-auto">
            <Editor
              placeholder="Put your C++ code here..."
              value={state.tool.code}
              onValueChange={code =>
                setState({ ...state, tool: { ...state.tool, code } })
              }
              highlight={code => highlight(code, languages.cpp)}
              padding={4}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 13,
                minHeight: 480 - 8
              }}
            />
          </div>
          <div className="p-2 mb-2 card">
            {state.tool.inputs.map((input, id) => (
              <div className="input-group mb-2" key={id}>
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white">
                    <b>Input #{id + 1}</b>
                  </div>
                  <div className="input-group-text">Type</div>
                </div>
                <select
                  className="custom-select"
                  value={input.input_type}
                  onChange={e => onInputChange(e, id)}
                  id="input_type"
                  name="input_type">
                  <option value="integer">Integer</option>
                  <option value="decimal">Decimal</option>
                </select>
                <div className="input-group-append">
                  {id > 0 && (
                    <button
                      className="float-right btn btn-primary py-1 px-2"
                      onClick={e => handleRemoveInput(e, id)}
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div>
              <div
                className="btn btn-sm btn-primary"
                style={{ cursor: "pointer" }}
                onClick={e => handleAddInput(e)}
              >
                <MdAdd className="mr-1 mb-1" />
                <span className="m-0">Add an input</span>
              </div>
            </div>
          </div>
          <div className="d-inline-block w-100 text-right">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

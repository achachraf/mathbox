import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./UI";
import * as API from "../API";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-coy.css";
import "prismjs/components/prism-clike.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";

const Create = () => {
  const fields = API.getAllFields();

  const [state, setState] = useState({
    tool: {
      name: "",
      field: "",
      code: ""
    },
    alerts: []
  });

  const handleChange = e => {
    setState({ ...state, tool: { ...state.tool, [e.target.name]: e.target.value } });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = {};
      // const res = await API.submitTool();
      setState({ ...state, alerts: [...state.alerts, { text: res.data.msg, type: "success" }] });
    } catch (err) {
      if (err.response) setState({ ...state, alerts: [...state.alerts, { text: err.response.data.msg || "Server error.", type: "danger" }] });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container px-3" style={{ paddingTop: 74 }}>
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
            {/* <input className="form-control text-body" type="text" value={state.tool.field} name="subject" onChange={e => handleChange(e)} /> */}
            <select className="custom-select" value={state.tool.field} onChange={e => handleChange(e)} name="field" id="fields-dropdown">
              <option selected disabled value="">
                Choose a field
              </option>
              {fields.map((field, i) => (
                <option value={field.id}>{field.name}</option>
              ))}
            </select>
          </div>
          <Editor
            placeholder="Type your code here..."
            className="form-control text-body mb-2 code-editor"
            value={state.tool.code}
            onValueChange={code => setState({ ...state, tool: { ...state.tool, code } })}
            highlight={code => highlight(code, languages.cpp)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 13
            }}
          />
          <div className="d-inline-block w-100 text-right">
            <input className="btn btn-primary float-right" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, AlgorithmRow } from "./UI";
import * as API from "../API";

const Fields = () => {
  const selectedFieldID = "number-theory"; // to get from navigation parameters in the URL
  const algorithms = API.getToolsinField(selectedFieldID);
  const fields = API.getAllFields(20);
  return (
    <div>
      <Navbar />
      <div className="px-3">
        <div className="row">
          <div className="col-12 col-md-3 h-100vh px-0" style={{ paddingTop: 74 }}>
            <div className="p-3 overflow-auto h-100">
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
            </div>
          </div>
          <div className="col-12 col-md-9 h-100vh px-0" style={{ paddingTop: 74 }}>
            <div className="p-3 overflow-auto h-100">
            {algorithms.map((value, i) => (
              <AlgorithmRow algorithm={value} key={i} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;

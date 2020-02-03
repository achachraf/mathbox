import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Navbar, ToolRow } from "./UI";
import * as API from "../API";

const Fields = () => {
  const [state, setState] = useState({
    fields : []
  })

  useEffect(() => {
    const getFileds = async ()=>{
      const fields = await API.getAllFields();
      setState({
        fields
      })
    }
    getFileds();
  }, [])
  const selectedFieldID = "number-theory"; // to get from navigation parameters in the URL
  const tools = API.getToolsinField(selectedFieldID);
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
                      <Link to={value.field_id}>{value.field_name}</Link>
                    </b>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-9 h-100vh px-0" style={{ paddingTop: 74 }}>
            <div className="p-3 overflow-auto h-100">
            {tools.map((value, i) => (
              <ToolRow tool={value} key={i} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fields;

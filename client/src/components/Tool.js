import React from 'react'
import { Link } from "react-router-dom";
import { Navbar, ToolRow } from "./UI";
import * as API from "../API";


const Tool = () => {
    const ToolID = 1; // to get from navigation parameters in the URL
    const tool = API.getTool(ToolID);
    return (
        <div>
            
        </div>
    )
}

export default Tool

import React, {useEffect} from "react";
import { log } from "../funcs/helpers";
import {type DashboardProps} from "../types/pages";

const Dashboard = (props: DashboardProps):JSX.Element => {

    useEffect(() => {
      log('Dashboard useEffect rendered');
    
      return () => {
        log('Dashboard useEffect clean up');
      }
    }, [])
    

    return <h1>Dashboard</h1>;
}

export default Dashboard;

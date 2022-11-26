import React, {useEffect, useRef, useState} from "react";
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { log } from "../funcs/helpers";
import {type DashboardProps} from "../types/pages";
import CircularProgress from "@mui/material/CircularProgress";
import AudioPlayer from "../components/utilities/AudioPlayer";
import { LocalFireDepartment } from "@mui/icons-material";

const Dashboard = (props: DashboardProps):JSX.Element => {

    useEffect(() => {
      log('Dashboard useEffect rendered');
    
      return () => {
        log('Dashboard useEffect clean up');
      }
    }, [])
    const canplay = () => {
      console.log('called function');
    }
    log('Dashboard rendered');

    return (
      <>
        <h1>Dashboard</h1>
      </>
    );
}

export default Dashboard;

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const TopProgressbar = () => {
  return (
    <LinearProgress color="secondary" variant="determinate" value={0} id="topProgressBar" />
  )
}

export default TopProgressbar
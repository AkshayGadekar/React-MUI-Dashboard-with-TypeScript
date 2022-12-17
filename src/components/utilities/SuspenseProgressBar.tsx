import React from 'react';
import { useEffect } from "react";
import nProgress from "nprogress";
// import "nprogress/nprogress.css";
// import "../nprogress.css";

const SuspenseProgressBar = () => {
  useEffect(() => {
    nProgress.configure({ showSpinner: false });
    nProgress.start();

    return () => {
      nProgress.done();
    };
  });

  return <></>;
}

export default SuspenseProgressBar;
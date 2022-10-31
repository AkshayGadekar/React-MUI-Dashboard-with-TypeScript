import React from "react";
import axios from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    showProgressBar?: boolean;
    progressBarNode?: HTMLElement
  }
}
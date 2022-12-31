import axios, {type AxiosRequestConfig} from 'axios';
import {log} from "./funcs/helpers";
import nProgress from "nprogress";
import {useNavigate} from "react-router-dom";

//const navigate = useNavigate();

export const requestController = new AbortController();

export const guestAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
    headers: {'Accept': 'application/json'}
});

//localStorage does not exist at SSR as it is not a browser, so typeof window is undefined there
/*let authAxios = true;
if(typeof window !== "undefined"){
    authAxios = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("access_token")}`}
    });
}*/

const authAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_CALLQX,
    headers: {'Accept': 'application/json'}
});

authAxios.interceptors.request.use(async(req) => {

    //remember me - logout once time is up (remember me may not be necessary as refresh token has its expiry time too)
        //call logout API

    //if user idle for 60 mins (not needed as u have stopped Propagation at idleTimeout)
        //call logout API or simply return false if it handled by body listner function as it will itself will call logout API

    const now = new Date();
    const expires_in_time = new Date(localStorage.getItem("expires_in_time")!);
    
    //refresh token - better to check before 1 min of expiring
    /*if((now - expires_in_time)/1000 >= -60){
        await axios.post(process.env.REACT_APP_BASE_URL+"/oauth/access-token", {
            refresh_token: localStorage.getItem("refresh_token")
        }).then((res)=>{
            
            const successResponse = res.data;
            localStorage.setItem("access_token", successResponse.data.access_token);
            localStorage.setItem("expires_in", successResponse.data.expires_in);
            localStorage.setItem("refresh_token", successResponse.data.refresh_token);

            const expires_in_time = new Date();
            expires_in_time.setSeconds(expires_in_time.getSeconds() + successResponse.data.expires_in);
            localStorage.setItem("expires_in_time", expires_in_time);
             
        }).catch((err)=>{
            log("login again");
            clearAuth();
            //throw at homepage

            return false;
        });
    }*/
    
    log(req);
    //progressBar
    if (req.showProgressBar == null) {
        req.showProgressBar = booleanString(process.env.REACT_APP_SHOW_PROGRESSBAR!);
    }
    req.onUploadProgress = (progressEvent) => {
        if (req.showProgressBar) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            if (percentCompleted < Number(process.env.REACT_APP_STOP_PROGRESSBAR_AT)) {
                loadProgressBar(req, percentCompleted, "block");
            }
        }
    }

    //if not formData
    if (!(req.data instanceof FormData) && req.showProgressBar) {
        nProgress.start();
    }
    
    req.headers!.authorization = `Bearer ${localStorage.getItem("access_token")}`;
    return req;
})

const booleanString = (str:string) => {
    return str == 'true' ? true : false;
}

let progressBarShouldLoad:number;
let progressTransitionEnd:EventListener;
const loadProgressBar = (req: AxiosRequestConfig, percentCompleted: number, display: "block"|"none") => {
    
    let progressBarNode = document.getElementById("topProgressBar")!;
    let progressNode = progressBarNode.childNodes[0] as HTMLElement;
    if (req.progressBarNode) {
        progressBarNode = req.progressBarNode;
        progressNode = progressBarNode.childNodes[0] as HTMLElement;
    }
    
    progressBarShouldLoad = percentCompleted-100;
    if (display == "block") {
        progressBarNode.style.visibility = "visible";
    }
    
    if (display == "none") {
        progressTransitionEnd = completeProgressBarLoading.bind(this, progressBarNode).bind(this, progressNode);
        progressNode.addEventListener('transitionend', progressTransitionEnd);
    }
    
    progressNode.style.transform = `translateX(${progressBarShouldLoad}%)`;
}

const completeProgressBarLoading = (progressBarNode: HTMLElement, progressNode: HTMLElement) => {
    const isProgressCompleted = /translateX\(0%\)/.test(progressNode.style.transform);
    if (!progressBarShouldLoad || isProgressCompleted) {
        progressBarNode.style.visibility = "hidden";
        progressNode.style.transform = `translateX(-100%)`;
        //remove event listner if needed
        progressNode.removeEventListener('transitionend', progressTransitionEnd);
    }   
}

authAxios.interceptors.response.use(response => {
    
    //progressBar
    if (response.config.showProgressBar) {
        const percentCompleted = 100;
        loadProgressBar(response.config, percentCompleted, "none");
        nProgress.done();
    }

    return response;
}, async(error) => {
    
    //progressBar
    if (error.config.showProgressBar) {
        const percentCompleted = 100;
        loadProgressBar(error.config, percentCompleted, "none");
        nProgress.done();
    }
    
    //if 401 error
    if(error.response.status == 401 || error.response.status == 403){
        log("login again");
        clearAuth();
        //throw at homepage
        //navigate('/login', {replace: true});
    }   

    return Promise.reject(error);
});

export const clearAuth = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in_time');
    sessionStorage.removeItem("event_time");
}


export default authAxios;
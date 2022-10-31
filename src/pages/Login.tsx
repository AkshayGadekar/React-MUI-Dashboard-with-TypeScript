import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import Button from '@mui/material/Button';
import {useTheme} from '@mui/material/styles';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import withAxios from "../HOC/withAxios";
import authAxios, {guestAxios, requestController} from "../axios";
import apiEndPoints from "../apiEndPoints";
import {log} from "../funcs/helpers";
import {useNavigate} from "react-router-dom";
import type {LoginProps} from "../types/pages"; 
import logo from "../media/images/logo.svg";

const Login = (props: LoginProps) => {

  const theme = useTheme();
  const navigate = useNavigate();
  console.log("Login-rendered");

  interface InitialValues {
    email: string, password: string
  }

  const formik = useFormik<InitialValues>({
    initialValues: {email: "", password: ""}, 
    validateOnBlur: false, 
    onSubmit: (values, formikBag) => {
        
        guestAxios({...apiEndPoints.auth.login, data: values}).then((res) => {
            log(res);
            const successResponse = res.data;
            localStorage.setItem("access_token", successResponse.access_token);
            localStorage.setItem("expires_in", successResponse.expires_in);
            //localStorage.setItem("refresh_token", successResponse.refresh_token);

            const expires_in_time = new Date();
            expires_in_time.setSeconds(expires_in_time.getSeconds() + successResponse.expires_in);
            localStorage.setItem("expires_in_time", expires_in_time.toString());

            //redirect to class page
            navigate('/home', {replace: true});
            
        }).catch((error) => {
            props.processAxiosError<InitialValues>(error, props, formik);
        }).finally(() => {
            formikBag.setSubmitting(false);
        });

    },
    validationSchema: Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(5).max(40)
        //.matches(/^(?=.*[1-9\W])(?=.*[a-zA-Z]).+$/, "password must contain letters with at least one number or symbol.")
    })
  });

  const EmailTouchedError = (formik.touched.email && formik.errors.email)?true:false;
  const PasswordTouchedError = (formik.touched.password && formik.errors.password)?true:false;
  
  return (
    <Container maxWidth={false} sx={{backgroundColor: "#efefef", 
    width: "100vw", height: "100vh", overflow: "auto"}}>
        <Box sx={{backgroundColor: "#fff", width: "35%", margin: "auto", textAlign: "center", 
        position: "relative", padding: 3, top: "100px", boxShadow: theme => theme.shadows[2],
        [theme.breakpoints.down("md")]: {width: "75%"},[theme.breakpoints.down("sm")]: {width: "100%"}}}>
            <Box component="img" src={"https://callqx-portal.ecosmob.net/static/img/logo.svg"} 
            sx={{width: "50%", mb: 4}} ></Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                id="email"
                label="Username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                sx={{mb: 3}}
                fullWidth
                {...formik.getFieldProps('email')} 
                error={EmailTouchedError} 
                helperText={EmailTouchedError && formik.errors.email}
              />
              <TextField
                id="password"
                label="Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HttpsIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                sx={{mb: 3}}
                fullWidth
                type="password"
                {...formik.getFieldProps('password')} 
                error={PasswordTouchedError} 
                helperText={PasswordTouchedError && formik.errors.password}
              />
              <Button type="submit" variant="contained" fullWidth sx={{color: "#fff"}}
              disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                {!formik.isSubmitting ? "LOGIN" : <CircularProgress color="inherit" size={26} />}
              </Button>
            </form>
        </Box>
    </Container>
  );
}

export default withAxios<LoginProps>(Login);

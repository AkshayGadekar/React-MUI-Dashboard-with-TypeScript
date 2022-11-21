import React, {useState, memo} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { EditPasswordProps } from "../../../../types/pageComponents";
import { log, callAfterTimeout } from '../../../../funcs/helpers';
import CloseModal from "../../../../components/utilities/CloseModal";
import withAxios from "../../../../HOC/withAxios";
import {type WithAxiosProps} from "../../../../types/funcs";

const EditPassword = (props: EditPasswordProps) => {

    interface InitialValues {
        password: string, password_confirm: string
    }
    
    const formik = useFormik<InitialValues>({
        initialValues: {password: "", password_confirm: ""}, 
        validateOnBlur: false, 
        onSubmit: (values, formikBag) => {
            
            props.authAxios({...props.apiEndPoints.users.editPassword, data: values}).then((res) => {
                
                const successResponse = res.data;
                log('successResponse', successResponse);

                props.setSnackbarInfo({message: 'Password updated successfully.', severity: 'success', key: Math.random()});
                props.setShowSnackBar(true);
                callAfterTimeout(props.close, 2);
                
            }).catch((error) => {
                props.processAxiosError<InitialValues>(error, props, formik);
            }).finally(() => {
                formikBag.setSubmitting(false);
            });

        },
        validationSchema: Yup.object({
            password: Yup.string().required().min(8).max(40),
            password_confirm: Yup.string().required().min(8).max(40).oneOf([Yup.ref('password')], 'Your passwords do not match.')
        })
    });

    const PasswordTouchedError = (formik.touched.password && formik.errors.password)?true:false;
    const PasswordConfirmTouchedError = (formik.touched.password_confirm && formik.errors.password_confirm)?true:false;
    log('EditPassword rendered');
    return (
        <Box>
            <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='sm'>
                <CloseModal close={props.close} />
                    <Typography variant="h6" p={3}>Change Password</Typography>
                <Divider />
                <DialogContent>
                    <form id="EditPasswordForm" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    {...formik.getFieldProps('password')} 
                                    error={PasswordTouchedError} 
                                    helperText={PasswordTouchedError && formik.errors.password}
                                    autoComplete="on"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    id="password_confirm"
                                    label="Confirm Password"
                                    type="password"
                                    variant="outlined"
                                    {...formik.getFieldProps('password_confirm')} 
                                    error={PasswordConfirmTouchedError} 
                                    helperText={PasswordConfirmTouchedError && formik.errors.password_confirm}
                                    autoComplete="on"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <Divider />
                <DialogActions sx={{pr: 3}}>
                    <Button type="submit" form="EditPasswordForm" variant="contained" sx={{color: '#fff'}}
                    disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                        {!formik.isSubmitting ? "Change Password" : <CircularProgress color="inherit" size={26} />}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const areEqual = (prevProps: Omit<EditPasswordProps, keyof WithAxiosProps>, nextProps: Omit<EditPasswordProps, keyof WithAxiosProps>) => {
    return prevProps.open === nextProps.open;
}

export default memo(withAxios<EditPasswordProps>(EditPassword), areEqual);
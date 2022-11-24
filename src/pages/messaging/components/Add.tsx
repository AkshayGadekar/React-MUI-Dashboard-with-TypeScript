import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DropFile from "../../../components/utilities/DropFile";
import type {MessagingAddNewProps} from '../../../types/pageComponents';
import withAxios from '../../../HOC/withAxios';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { log } from '../../../funcs/helpers';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppSelector } from '../../../store/hooks';
import CloseModal from "../../../components/utilities/CloseModal";

const Add = (props: MessagingAddNewProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const userInfo = useAppSelector(state => state.user);

    interface InitialValues {
        first_name: string, last_name: string, email: string, role_id: number|"" ,
        account_uuid: string, prevent_email: boolean, system_refer: string
    }
    
    const formik = useFormik<InitialValues>({
        initialValues: {first_name: "", last_name: "", email: "", role_id: "",
        account_uuid: userInfo.user.account.uuid, prevent_email: false, system_refer: userInfo.user.system_refer}, 
        validateOnBlur: false, 
        onSubmit: (values, formikBag) => {
            
            props.authAxios({...props.apiEndPoints.users.addUser, data: values}).then((res) => {
                
                const successResponse = res.data;
                log('successResponse', successResponse);

                props.setParentState.setSnackbarInfo({message: 'User created successfully', severity: 'success'});
                props.setParentState.setShowSnackBar(true);
                props.setParentState.setMessagesCreatedCount(count => count + 1);
                
            }).catch((error) => {
                props.processAxiosError<InitialValues>(error, props, formik);
            }).finally(() => {
                formikBag.setSubmitting(false);
            });

        },
        validationSchema: Yup.object({
            first_name: Yup.string().required().min(1).max(50),
            last_name: Yup.string().required().min(1).max(50),
            email: Yup.string().required().email(),
            role_id: Yup.number().typeError('role_id is a required field').required()
        })
    });

    const FirstNameTouchedError = (formik.touched.first_name && formik.errors.first_name)?true:false;
    const LastNameTouchedError = (formik.touched.last_name && formik.errors.last_name)?true:false;
    const EmailTouchedError = (formik.touched.email && formik.errors.email)?true:false;
    const RoleTouchedError = (formik.touched.role_id && formik.errors.role_id)?true:false;

    log('Messaging AddNew rendered');

    return (
        <Box>
            <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='lg'>
                <CloseModal close={props.close} />
                <Typography variant="h6" p={3}>Custom Messaging</Typography>
                <Divider />
                <DialogContent>
                    <form id="CreateMessagingForm" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <DropFile />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <Divider />
                <DialogActions sx={{pr: 3}}>
                    <Button type="submit" form="CreateUserForm" variant="contained" sx={{color: '#fff'}}
                    disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                        {!formik.isSubmitting ? "Save" : <CircularProgress color="inherit" size={26} />}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default withAxios<MessagingAddNewProps>(Add);
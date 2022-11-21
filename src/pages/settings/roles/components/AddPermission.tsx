import React, {useState, useEffect, memo} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import withAxios from '../../../../HOC/withAxios';
import { log } from '../../../../funcs/helpers';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppSelector } from '../../../../store/hooks';
import CloseModal from "../../../../components/utilities/CloseModal";
import type {AddPermissionProps} from "../../../../types/pageComponents";
import type {WithAxiosProps} from "../../../../types/funcs";

const AddPermission = (props: AddPermissionProps) => {
    const [slug, setSlug] = useState("")
    
    interface InitialValues {
        name: string, slug: string, resource: string, description: string
    }
    
    const formik = useFormik<InitialValues>({
        initialValues: {name: "", slug: "", resource: "", description: ""}, 
        validateOnBlur: false, 
        onSubmit: (values, formikBag) => {
            values.slug = slug;
            
            props.authAxios({...props.apiEndPoints.roles.createPermission, data: values}).then((res) => {
                
                const successResponse = res.data;
                log('successResponse', successResponse);

                props.setParentState.setSnackbarInfo({message: 'Permission created successfully', severity: 'success'});
                props.setParentState.setShowSnackBar(true);
                props.setParentState.setPermissionsCreatedCount(count => count + 1);
                
            }).catch((error) => {
                props.processAxiosError<InitialValues>(error, props, formik);
            }).finally(() => {
                formikBag.setSubmitting(false);
            });

        },
        validationSchema: Yup.object({
            name: Yup.string().required().min(1).max(50),
            resource: Yup.string().required().min(1).max(50),
            description: Yup.string().required().min(1).max(250)
        })
    });

    const nameTouchedError = (formik.touched.name && formik.errors.name)?true:false;
    const resourceTouchedError = (formik.touched.resource && formik.errors.resource)?true:false;
    const descriptionTouchedError = (formik.touched.description && formik.errors.description)?true:false;
    
    const nameChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        formik.setFieldValue('name', value);
        setSlug(value.replace(/\s/g, '-'));
    }

    log('AddPermissions Dialog rendered');

    return (
        <Box>
            <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='lg'>
                <CloseModal close={props.close} />
                <Typography variant="h6" p={3}>Create Permission</Typography>
                <Divider />
                <DialogContent>
                    <form id="CreatePermissionForm" onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    {...formik.getFieldProps('name')} 
                                    error={nameTouchedError} 
                                    helperText={nameTouchedError && formik.errors.name}
                                    onChange={nameChangeHandler}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="slug"
                                    label="Slug"
                                    type="text"
                                    variant="filled" 
                                    //InputProps={{readOnly: true}}
                                    InputLabelProps={{ shrink: !!slug }}
                                    value={slug}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="resource"
                                    label="Resource"
                                    type="text"
                                    variant="outlined"
                                    {...formik.getFieldProps('resource')} 
                                    error={resourceTouchedError} 
                                    helperText={resourceTouchedError && formik.errors.resource}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    type="text"
                                    variant="outlined"
                                    {...formik.getFieldProps('description')} 
                                    error={descriptionTouchedError} 
                                    helperText={descriptionTouchedError && formik.errors.description}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <Divider />
                <DialogActions sx={{pr: 3}}>
                    <Button type="submit" form="CreatePermissionForm" variant="contained" sx={{color: '#fff'}}
                    disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                        {!formik.isSubmitting ? "Create" : <CircularProgress color="inherit" size={26} />}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const areEqual = (prevProps: Omit<AddPermissionProps, keyof WithAxiosProps>, nextProps: Omit<AddPermissionProps, keyof WithAxiosProps>) => {
    return prevProps.open === nextProps.open;
}

export default memo(withAxios<AddPermissionProps>(AddPermission), areEqual);
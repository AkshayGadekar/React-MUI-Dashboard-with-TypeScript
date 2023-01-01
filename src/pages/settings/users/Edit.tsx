import React, {useState, useEffect, useMemo} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditPassword from "./components/EditPassword";
import Heading from '../../../components/utilities/Heading';
import withAxios from '../../../HOC/withAxios';
import { log } from '../../../funcs/helpers';
import {UsersEditProps} from '../../../types/pages';
import EditSkeleton from './components/EditSkeleton';
import Breadcrumb from '../../../components/utilities/Breadcrumb';
import {useAppSelector} from '../../../store/hooks';
import ShowPermissions from "./components/ShowPermissions";
import menu from "../../../objects/menu";
import {replaceDynamicParamInHref} from '../../../funcs/helpers';

const editRoleActionHref = menu[3].children![1].otherHrefs!.edit.href;

const Edit = (props: UsersEditProps) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [roles, setRoles] = useState<Record<string, any>[]>([]);
  const [userPermissions, setUserPermissions] = useState<Record<string, any>[]>([]);
  const [permissions, setPermissions] = useState<Record<string, any>[]>([]);

  const param = useParams();
  const theme = useTheme();

  const userInfo = useAppSelector(state => state.user);
  const loggedInUserEmail: string = userInfo.user.email;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const breadCrumb = menu[3].children![0].otherHrefs!.edit.breadCrumb;

  interface InitialValues {
    first_name: string, last_name: string, email: string, role_id: number
  }

  const formik = useFormik<InitialValues>({
      initialValues: {first_name: "", last_name: "", email: "", role_id: 0}, 
      validateOnBlur: false, 
      onSubmit: (values, formikBag) => {
          
          props.authAxios({...props._(props.apiEndPoints.users.editUser, {id: param.id}), data: values}).then((res) => {
              
            const successResponse = res.data;
            log('successResponse', successResponse);

            props.setSnackbarInfo({message: 'User information updated successfully.', severity: 'success'});
            props.setShowSnackBar(true);
              
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
          role_id: Yup.number().required()
      })
  });

  const FirstNameTouchedError = (formik.touched.first_name && formik.errors.first_name)?true:false;
  const LastNameTouchedError = (formik.touched.last_name && formik.errors.last_name)?true:false;
  const EmailTouchedError = (formik.touched.email && formik.errors.email)?true:false;
  const RoleTouchedError = (formik.touched.role_id && formik.errors.role_id)?true:false;
  
  const userInfoUpdateBtn = {
    value: 'Update',
    type: 'submit',
    form: 'EditUserForm',
    disabled: !(formik.dirty && formik.isValid) || formik.isSubmitting
  }

  const editRoleBtn = {
    value: 'Edit Role',
    component: Link,
    to: replaceDynamicParamInHref(editRoleActionHref, [Object.keys(userData).length ? userData.role.uuid : ''])
  }

  useEffect(() => {
    const requestController = new AbortController();

    props.authAxios({...props._(props.apiEndPoints.users.getUser, {id: param.id}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setUserData(successResponse);
        setUserPermissions(successResponse.role.permissions);
        formik.setFieldValue('first_name', successResponse.first_name, false);
        formik.setFieldValue('last_name', successResponse.last_name, false);
        formik.setFieldValue('email', successResponse.email, false);
        formik.setFieldValue('role_id', successResponse.role.id, false);

        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    props.authAxios({...props.apiEndPoints.users.getRoles, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setRoles(successResponse.records);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    props.authAxios({...props.apiEndPoints.roles.getPermissions, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);

        setPermissions(successResponse);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
        requestController.abort('Request aborted to clean up useEffect.');
    }
  
  }, [])

  log('User Edit rendered.');

  const userPermissionsIds: number[] = useMemo(() => {
    return userPermissions.map((userPermission: Record<string, any>) => userPermission.id);
  }, [userPermissions.length]);

  return (
    <Box>
        {
            !(Object.keys(userData).length && roles.length)
            ?
            <EditSkeleton />
            :
            <>
                <Breadcrumb path={breadCrumb} />
                <Grid container>
                  <Grid item xs={12} md={6} sx={{marginBottom: '1.5rem', [theme.breakpoints.up('md')]: {paddingRight: '1rem'}}}>
                    <Heading title="User Information" button={userInfoUpdateBtn} />
                    <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                      <form id="EditUserForm" onSubmit={formik.handleSubmit}>
                          <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                  <TextField
                                      autoFocus
                                      fullWidth
                                      id="first_name"
                                      label="First Name"
                                      type="text"
                                      variant="outlined"
                                      {...formik.getFieldProps('first_name')} 
                                      error={FirstNameTouchedError} 
                                      helperText={FirstNameTouchedError && formik.errors.first_name}
                                  />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                  <TextField
                                      fullWidth
                                      id="last_name"
                                      label="Last Name"
                                      type="text"
                                      variant="outlined"
                                      {...formik.getFieldProps('last_name')} 
                                      error={LastNameTouchedError} 
                                      helperText={LastNameTouchedError && formik.errors.last_name}
                                  />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                  <TextField
                                      fullWidth
                                      id="email"
                                      label="Email"
                                      type="email"
                                      variant="outlined"
                                      {...formik.getFieldProps('email')} 
                                      error={EmailTouchedError} 
                                      helperText={EmailTouchedError && formik.errors.email}
                                  />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                  <FormControl fullWidth error={RoleTouchedError}>
                                      <InputLabel id="role">Role</InputLabel>
                                      <Select
                                      labelId="role"
                                      label="Role"
                                      id="role_id"
                                      disabled={loggedInUserEmail == userData.email}
                                      {...formik.getFieldProps('role_id')}
                                      >
                                          {
                                              roles.map(
                                                  (role, index) => <MenuItem key={index} value={role.id}>{role.role_name}</MenuItem>
                                              )
                                          }
                                      </Select>
                                      <FormHelperText error>{RoleTouchedError && formik.errors.role_id}</FormHelperText>
                                  </FormControl>
                              </Grid>
                              <Grid item xs={12} textAlign="right">
                                  <Button variant="contained" sx={{color: '#fff'}} onClick={handleOpenDialog}>
                                      Change Password
                                  </Button>
                                  <EditPassword open={openDialog} close={handleCloseDialog} />
                              </Grid>
                          </Grid>
                      </form>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{marginBottom: '1.5rem', [theme.breakpoints.up('md')]: {paddingLeft: '1rem'}}}>
                    <Heading title="Permissions" button={editRoleBtn} />
                    <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                      <Grid container direction="column" spacing={1}>
                        <ShowPermissions permissions={permissions} selectedPermissionsIds={userPermissionsIds} disabledChecks />
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
            </> 
        }
    </Box>
  )
}

export default withAxios<UsersEditProps>(Edit);
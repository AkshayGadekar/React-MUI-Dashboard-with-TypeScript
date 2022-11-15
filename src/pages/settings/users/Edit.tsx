import React, {useState, useEffect} from 'react';
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
import { useParams } from 'react-router-dom';
import Heading from '../../../components/utilities/Heading';
import withAxios from '../../../HOC/withAxios';
import { log } from '../../../funcs/helpers';
import {UsersEditProps} from '../../../types/pages';

const Edit = (props: UsersEditProps) => {

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [roles, setRoles] = useState<Record<string, any>[]>([]);

  const param = useParams();

  interface InitialValues {
    first_name: string, last_name: string, email: string, role_id: number
  }

  const formik = useFormik<InitialValues>({
      initialValues: {first_name: "", last_name: "", email: "", role_id: 0}, 
      validateOnBlur: false, 
      onSubmit: (values, formikBag) => {
          
          props.authAxios({...props.apiEndPoints.users.addUser, data: values}).then((res) => {
              
              const successResponse = res.data;
              log('successResponse', successResponse);

              props.setParentState.setSnackbarInfo({message: 'User created successfully', severity: 'success'});
              props.setParentState.setShowSnackBar(true);
              props.setParentState.setToggleListing(value => !value);
              
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
  
  const buttonInfo = {
    value: 'Update',
    type: 'submit',
    form: 'nodesViewForm',
    onClick: function (ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (!nameError) {
            setIsLoading(true);
            
            const data = {name};
            props.authAxios({...props._(props.apiEndPoints.nodes.update, {id: param.id}), data})
            .then((res) => {

                const successResponse = res.data;
                log('successResponse', successResponse);
                
                props.setSnackbarInfo({message: successResponse, severity: 'success'});
                props.setShowSnackBar(true);
                
            })
            .catch((error) => {
                props.processAxiosError(error, props);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }
  }

  useEffect(() => {
    const requestController = new AbortController();

    props.authAxios({...props._(props.apiEndPoints.users.getUser, {id: param.id}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setUserData(successResponse);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    props.authAxios({...props.apiEndPoints.users.getRoles, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setRoles(successResponse);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
        requestController.abort('Request aborted to clean up useEffect.');
    }
  
  }, [])
  

  log('User Edit rendered.');

  return (
    <Box>
      <Heading title="User Information" button={{...buttonInfo, disabled: isLoading}} />
      <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
        <form id="CreateUserForm" onSubmit={formik.handleSubmit}>
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
                      {...formik.getFieldProps('role_id')}
                      >
                          {
                              isLoading
                              ?
                              <CircularProgress />
                              :
                              roles.map(
                                  (role, index) => <MenuItem key={index} value={role.id}>{role.role_name}</MenuItem>
                              )
                          }
                      </Select>
                      <FormHelperText error>{RoleTouchedError && formik.errors.role_id}</FormHelperText>
                  </FormControl>
              </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default withAxios(Edit);
import React, {useState, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import type {RolesCreateProps} from "../../../types/pages";
import Breadcrumb from '../../../components/utilities/Breadcrumb';
import Heading from '../../../components/utilities/Heading';
import withAxios from '../../../HOC/withAxios';
import Box from '@mui/material/Box';
import { log, callAfterTimeout } from '../../../funcs/helpers';
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import ShowPermissions from '../users/components/ShowPermissions';
import { useAppSelector } from '../../../store/hooks';
import AddPermission from "./components/AddPermission";
import menu from "../../../objects/menu";

const Create = (props: RolesCreateProps) => {
    const [isLoadingPermissions, setIsLoadingPermissions] = useState(true);
    const [permissions, setPermissions] = useState<Record<string, any>[]>([]);
    
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [isProcessingRequest, setIsProcessingRequest] = useState(false);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [permissionsCreatedCount, setPermissionsCreatedCount] = useState<number>(0);
    
    const navigate = useNavigate();
    
    const breadCrumb = menu[7].children![1].otherHrefs!.create.breadCrumb;
    
    const handleName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const name = ev.target.value;
        
        let error = false;
        if (!name) {
            setNameError('Name is required');
            error = true;
        }
        if (name.length > 50) {
            setNameError('Name cannot exceed 50 characters.');
            error = true;
        }
        
        setName(name);
        !error ? setNameError('') : '';
    }
    const userInfo = useAppSelector(state => state.user);
    const createRoleButtonInfo = {
        value: 'Create',
        type: 'submit',
        form: 'createRoleForm',
        onClick: function (ev: React.FormEvent<HTMLFormElement>) {
            ev.preventDefault();

            if (!nameError && name != '') {
                setIsProcessingRequest(true);

                const accountUUID = userInfo.user.account.uuid;
                const data = {role_name: name, slug: "", permissions: checkedPermissionsRef.current, account_id: accountUUID};
                props.authAxios({...props.apiEndPoints.roles.create, data})
                .then((res) => {

                    const successResponse = res.data;
                    log('successResponse', successResponse);
                    
                    props.setSnackbarInfo({message: successResponse, severity: 'success'});
                    props.setShowSnackBar(true);
                    
                    callAfterTimeout(() => navigate('/settings/roles/list'), 2);
                })
                .catch((error) => {
                    props.processAxiosError(error, props);
                })
                .finally(() => {
                    setIsProcessingRequest(false);
                });
            }
        }
    }

    const createPermissionButtonInfo = {
        value: 'Add New',
        onClick: () => setOpenDialog(true)
    }
    const checkedPermissionsRef = useRef<number[]>([]);
    let checkedPermissions: number[] = [];
    const togglePermissionCheck = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = ev.target.checked;
        const value = Number(ev.target.value);
        if (isChecked) {
            checkedPermissions.push(value);
        } else {
            checkedPermissions.splice(checkedPermissions.indexOf(value), 1);
        }
        checkedPermissionsRef.current = checkedPermissions;
    }
    const setParentState = { setSnackbarInfo: props.setSnackbarInfo, setShowSnackBar: props.setShowSnackBar, setPermissionsCreatedCount };

    useEffect(() => {

        const requestController = new AbortController();
        
        setIsLoadingPermissions(true);
        
        props.authAxios({...props.apiEndPoints.roles.getPermissions, signal: requestController.signal
        }).then((res) => {

            props.setShowSnackBar(false);
            
            const successResponse = res.data;
            log('successResponse', successResponse);
            
            setPermissions(successResponse);

            setOpenDialog(false);
            
        }).catch((error) => {
            props.processAxiosError(error, props);
        }).finally(() => {
            setIsLoadingPermissions(false);
        })

        return () => {
            requestController.abort('Request aborted to clean up useEffect.');
        }
    }, [permissionsCreatedCount]);
    
    log('Create role rendered');
  
    return (
        <Box>
            <Breadcrumb path={breadCrumb} />
            <Grid container direction="column">
                <Grid item mb={3}>
                    <Heading title='Create Role' button={{...createRoleButtonInfo, disabled: isProcessingRequest}} />
                    <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                        <form id="createRoleForm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField id="name" name="name" label="Name"
                                    error={!!nameError} helperText={nameError} onChange={handleName}
                                    inputProps={{maxLength: 51}} variant="outlined" fullWidth value={name} required />   
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField variant="filled" id="slug" name="slug" label="Slug" disabled fullWidth />   
                                </Grid>
                            </Grid>
                        </form>
                    </Box> 
                </Grid>
                <Grid item>
                    {
                        isLoadingPermissions
                        ? <TableSkeleton notShowTextSkeleton />
                        :
                        <>
                            <Heading title="Permissions" button={createPermissionButtonInfo} />
                            <AddPermission open={openDialog} close={() => setOpenDialog(false)} setParentState={setParentState} />
                            <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                                <Grid container direction="column" spacing={1}>
                                    <ShowPermissions permissions={permissions} selectedPermissionsIds={[]} togglePermissionCheck={togglePermissionCheck} />
                                </Grid>
                            </Box> 
                        </>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default withAxios<RolesCreateProps>(Create);
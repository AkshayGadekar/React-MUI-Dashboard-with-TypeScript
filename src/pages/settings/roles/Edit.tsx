import React, {useState, useRef, useEffect, useMemo} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import type {AxiosError, AxiosResponse} from "axios";
import Box from '@mui/material/Box';
import EditSkeleton from "./components/EditSkeleton";
import type {successResponse, errorResponse} from "../../../types/funcs";
import type {RolesEditProps} from "../../../types/pages";
import Breadcrumb from '../../../components/utilities/Breadcrumb';
import Heading from '../../../components/utilities/Heading';
import withAxios from '../../../HOC/withAxios';
import { log, callAfterTimeout } from '../../../funcs/helpers';
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import ShowPermissions from '../users/components/ShowPermissions';
import { useAppSelector } from '../../../store/hooks';
import AddPermission from "./components/AddPermission";
import menu from "../../../objects/menu";

const Edit = (props: RolesEditProps) => {
    const [loadingRequests, setLoadingRequests] = useState<boolean>(true);
    const [role, setRole] = useState<Record<string, any>>({});
    const [permissions, setPermissions] = useState<Record<string, any>[]>([]);
    const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
    
    const [rolePermissions, setRolePermissions] = useState<Record<string, any>[]>([]);
    
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [isProcessingRequest, setIsProcessingRequest] = useState(false);
    
    const [openDialog, setOpenDialog] = useState(false);
    const [permissionsCreatedCount, setPermissionsCreatedCount] = useState<number>(0);
    
    const navigate = useNavigate();
    const param = useParams();
    
    const breadCrumb = menu[3].children![1].otherHrefs!.edit.breadCrumb;
    
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
        value: 'Update',
        type: 'submit',
        form: 'updateRoleForm',
        onClick: function (ev: React.FormEvent<HTMLFormElement>) {
            ev.preventDefault();

            if (!nameError) {
                setIsProcessingRequest(true);
                
                const accountUUID = userInfo.user.account.uuid;
                const data = {role_name: name, permissions: checkedPermissionsRef.current};
                props.authAxios({...props._(props.apiEndPoints.roles.update, {id: param.id}), data})
                .then((res) => {

                    const successResponse = res.data;
                    log('successResponse', successResponse);
                    
                    props.setSnackbarInfo({message: "Role updated successfully", severity: 'success'});
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
    const rolePermissionsIds: number[] = useMemo(() => {
        return rolePermissions.map((rolePermission: Record<string, any>) => rolePermission.id);
    }, [rolePermissions.length]);
    checkedPermissions = rolePermissionsIds;
    const setParentState = { setSnackbarInfo: props.setSnackbarInfo, setShowSnackBar: props.setShowSnackBar, setPermissionsCreatedCount };

    const fetchWithPromiseAll = async(requestController: AbortController) => {
        try {
            setLoadingRequests(true);
            
            const fetchRole = props.authAxios({...props._(props.apiEndPoints.roles.edit, {id: param.id}), signal: requestController.signal});
            const fetchPermissions = props.authAxios({...props.apiEndPoints.roles.getPermissions, signal: requestController.signal});

            const [roleResponse, permissionsResponse] = await Promise.all([fetchRole, fetchPermissions]);

            setRole(roleResponse.data);
            setRolePermissions(roleResponse.data.permissions);
            setPermissions(permissionsResponse.data);

            setName(roleResponse.data.role_name);
            setLoadingRequests(false);

        } catch (error) {
            props.processAxiosError(error as AxiosError<errorResponse>, props);    
        }
    }
    useEffect(() => {

        const requestController = new AbortController();

        if (!permissionsCreatedCount) {
            fetchWithPromiseAll(requestController); 
        } else {
            setIsLoadingPermissions(true);

            const fetchPermissions = props.authAxios({...props.apiEndPoints.roles.getPermissions, signal: requestController.signal}).then((res) => {

                props.setShowSnackBar(false);
                
                const successResponse = res.data;
                log('successResponse', successResponse);
                
                setPermissions(successResponse);
    
                setOpenDialog(false);
                
            }).catch((error) => {
                props.processAxiosError(error, props);
            }).finally(() => {
                setIsLoadingPermissions(false);
            });
        }

        return () => {
            requestController.abort('Request aborted to clean up useEffect.');
        }
    }, [permissionsCreatedCount]);
    
    log('Edit role rendered');
    
    return (
        <Box>
            {
                loadingRequests
                ?
                <EditSkeleton />
                :
                <>
                    <Breadcrumb path={breadCrumb} />
                    <Grid container direction="column">
                        <Grid item mb={3}>
                            <Heading title='Create Role' button={{...createRoleButtonInfo, disabled: isProcessingRequest}} />
                            <Box sx={{width: '100%', p:2, backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                                <form id="updateRoleForm">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField id="name" name="name" label="Name"
                                            error={!!nameError} helperText={nameError} onChange={handleName}
                                            inputProps={{maxLength: 51}} variant="outlined" fullWidth value={name} required />   
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField variant="filled" id="slug" name="slug" label="Slug" value={role.slug} disabled fullWidth />   
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
                                            <ShowPermissions permissions={permissions} selectedPermissionsIds={rolePermissionsIds} togglePermissionCheck={togglePermissionCheck} />
                                        </Grid>
                                    </Box> 
                                </>
                            }
                        </Grid>
                    </Grid>
                </>
            }
        </Box>
    )
}

export default withAxios<RolesEditProps>(Edit);
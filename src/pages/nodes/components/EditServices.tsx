import React, {useState, useMemo} from 'react';
import withAxios from '../../../HOC/withAxios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import type {NodesEditServicesProps} from '../../../types/pageComponents';
import {log} from '../../../funcs/helpers';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';

// const disables = {sortable: false, flex: 1};

// const columns: GridColDef[] = [
//     { field: 'name', headerName: 'Name', sortable: false, flex: 1 },
//     { field: 'tag', headerName: 'Tag', sortable: false,flex: 1 },
//     { field: 'state', headerName: 'state', sortable: false,flex: 1 },
//     { field: 'status', headerName: 'Status', sortable: false,flex: 1, renderCell: params => {
//         const UTCdate = params.row.startedAt;
//         const timeOptions = {dateStyle: 'short', timeStyle: 'short', hour12: false};
//         const toLocalDate = new Date(UTCdate).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short', hour12: false});
//         return `Up Since ${toLocalDate}`;
//     } },
//     { field: 'actions', headerName: 'Actions', sortable: false,flex: 1, renderCell: params =>  {
//             const restartBtn = <Button size="small" color="error" sx={{color: "#fff", mr: 1}} variant="contained" onClick={handleRestart.bind(this, params.row.name)}>Restart</Button>;
//             const updateBtn = <Button size="small" color="info" sx={{color: "#fff"}} variant="contained">Update</Button>;
//             return (
//                 <>
//                     {restartBtn}
//                     {updateBtn}
//                 </>
//             )
//         }
//     }
// ];

const EditServices = (props: NodesEditServicesProps) => {
    log('Node service table rendered');
    const [isLoading, setIsLoading] = useState(false)

    const param = useParams();

    const handleRestart = (name: string) => {
        const id = param.id;
        
        setIsLoading(true);
        props.authAxios({...props._(props.apiEndPoints.nodes.restartNodeService, {id, name})
        }).then((res) => {
            
            const successResponse = res.data;
            log('successResponse', successResponse);
            
            props.setSnackbarInfo({message: successResponse, severity: 'success'});
            props.setShowSnackBar(true);
            
        }).catch((error) => {
            props.processAxiosError(error, props);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const handleUpdate = (name: string) => {
        const id = param.id;

        setIsLoading(true);
        props.authAxios({...props._(props.apiEndPoints.nodes.updateNodeService, {id, name})
        }).then((res) => {
            
            const successResponse = res.data;
            log('successResponse', successResponse);
            
            props.setSnackbarInfo({message: successResponse, severity: 'success'});
            props.setShowSnackBar(true);
            
        }).catch((error) => {
            props.processAxiosError(error, props);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const rows = [
        ...props.data
    ];

    const columns = useMemo(() => {
        const disables = {sortable: false, flex: 1};
        const columns: GridColDef[] = [
            { field: 'name', headerName: 'Name', sortable: false, flex: 1 },
            { field: 'tag', headerName: 'Tag', sortable: false,flex: 1 },
            { field: 'state', headerName: 'state', sortable: false,flex: 1 },
            { field: 'status', headerName: 'Status', sortable: false,flex: 1, renderCell: params => {
                const UTCdate = params.row.startedAt;
                const timeOptions = {dateStyle: 'short', timeStyle: 'short', hour12: false};
                const toLocalDate = new Date(UTCdate).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short', hour12: false});
                return `Up Since ${toLocalDate}`;
            } },
            { field: 'actions', headerName: 'Actions', sortable: false,flex: 1, renderCell: params =>  {
                    const restartBtn = <Button size="small" color="error" sx={{color: "#fff", mr: 1}} variant="contained" onClick={handleRestart.bind(this, params.row.name)}>Restart</Button>;
                    const updateBtn = <Button size="small" color="info" sx={{color: "#fff"}} variant="contained" onClick={handleUpdate.bind(this, params.row.name)}>Update</Button>;
                    return (
                        <>
                            {restartBtn}
                            {updateBtn}
                        </>
                    )
                }
            }
        ];
        return columns;
    }, []);

    return (
    <Box sx={{backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
        <DataGrid
        autoHeight
        getRowId={(row) => row._id}
        sx={{
            borderRadius: 0,
            "& [data-field=state]": {
                textTransform: 'capitalize'
            }
        }}
        columns={columns}
        rows={rows}
        hideFooterPagination
        disableSelectionOnClick
        disableColumnMenu
        loading={isLoading}
        components={{
            LoadingOverlay: LinearProgress
        }}      
        />
    </Box>
    );
}

export default withAxios(EditServices);
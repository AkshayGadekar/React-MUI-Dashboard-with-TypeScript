import React, {useState, useMemo} from 'react';
import withAxios from '../../../HOC/withAxios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import type {NodesEditServicesProps} from '../../../types/pageComponents';
import {log} from '../../../funcs/helpers';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';

const EditServices = (props: NodesEditServicesProps) => {
    log('Node service table rendered');
    const [isLoading, setIsLoading] = useState(false)

    const param = useParams();

    const handleNodeService = (name: string, eventName: string, ev: React.BaseSyntheticEvent) => {
        const id = param.id;
        
        ev.target.disabled = true;
        ev.target.classList.add("Mui-disabled");
        setIsLoading(true);

        let apiEndPoint : Record<string, any>;
        if (eventName == 'Restart') {
            apiEndPoint = props._(props.apiEndPoints.nodes.restartNodeService, {id, name});
        } else if (eventName == 'Update') {
            apiEndPoint = props._(props.apiEndPoints.nodes.updateNodeService, {id, name});
        }

        props.authAxios({...apiEndPoint!}).then((res) => {
            
            const successResponse = res.data;
            log('successResponse', successResponse);
            
            props.setSnackbarInfo({message: successResponse, severity: 'success'});
            props.setShowSnackBar(true);
            
        }).catch((error) => {
            props.processAxiosError(error, props);
        }).finally(() => {
            ev.target.disabled = false;
            ev.target.classList.remove("Mui-disabled");
            setIsLoading(false);
        })
    }

    const rows = [
        ...props.data
    ];

    const columns = useMemo(() => {
        const columns: GridColDef[] = [
            { field: 'name', headerName: 'Name', sortable: false, minWidth: 100 },
            { field: 'tag', headerName: 'Tag', sortable: false, minWidth: 70 },
            { field: 'state', headerName: 'state', sortable: false, minWidth: 100 },
            { field: 'status', headerName: 'Status', sortable: false, minWidth: 200, renderCell: params => {
                const UTCdate = params.row.startedAt;
                const toLocalDate = new Date(UTCdate).toLocaleString('en-US', {dateStyle: 'short', timeStyle: 'short', hour12: false});
                return `Up Since ${toLocalDate}`;
            } },
            { field: 'actions', headerName: 'Actions', sortable: false, minWidth: 200, renderCell: params =>  {
                    const restartBtn = <Button size="small" color="error" sx={{color: "#fff", mr: 1}} variant="contained" onClick={handleNodeService.bind(this, params.row.name).bind(this, 'Restart')}>Restart</Button>;
                    const updateBtn = <Button size="small" color="info" sx={{color: "#fff"}} variant="contained" onClick={handleNodeService.bind(this, params.row.name).bind(this, 'Update')}>Update</Button>;
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

    const datagrid = (
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
    );

    return (
        <Box sx={{backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
            {datagrid}
        </Box>
    );
}

export default withAxios<NodesEditServicesProps>(EditServices);
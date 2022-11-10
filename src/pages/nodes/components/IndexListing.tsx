import React, {useMemo} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {log} from "../../../funcs/helpers";
import {Link} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type {NodesIndexListingProps} from '../../../types/pageComponents';
import menus from '../../../objects/menus';
import {replaceDynamicParamInHref} from '../../../funcs/helpers';

const editActionHref = menus[4].otherHrefs!.edit;

const IndexListing = ({data}: NodesIndexListingProps) => {
  log('Node table rendered');
  const [page, setPage] = React.useState(0);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  }

  const rows = [
    ...data
  ];

  const columns = useMemo(() => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Id', sortable: false, minWidth: 250, renderCell: params => params.row._id },
      { field: 'name', headerName: 'Name', sortable: false, minWidth: 250 },
      { field: 'type', headerName: 'Type', sortable: false, minWidth: 100 },
      { field: 'primary', headerName: 'Primary', sortable: false, minWidth: 100, 
      renderCell: params => params.value ? <CheckIcon /> : <CloseIcon />},
      {
        field: 'online',
        headerName: 'Online',
        sortable: false,
        minWidth: 150,
        //description: 'This column has a value getter and is not sortable.',
        //valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        renderCell: params =>  <Button size="small"  color={params.value ? 'primary' : 'error'} sx={{color: params.value ? '#fff' : undefined}} variant="contained">
          {params.value ? 'Online' : 'Offline'}</Button>
      },
      { field: 'actions', headerName: 'Actions', sortable: false, minWidth: 150,
      renderCell: params =>  <Button size="small" color="primary" sx={{color: "#fff"}} component={Link} to={replaceDynamicParamInHref(editActionHref, [params.row.uuid])} variant="contained">View</Button> }
    ];
    return columns;
  }, []);

  const datagrid = (
    <DataGrid
        autoHeight
        getRowId={(row) => row._id}
        sx={{borderRadius: 0}}
        columns={columns}
        rows={rows}
        rowCount={rows.length}
        rowsPerPageOptions={[10]}
        pageSize={10}
        //onPageSizeChange={(newPageSize) => log('newPageSize', newPageSize)}
        page={page}
        onPageChange={(newPage) => handlePageChange(newPage)}
        disableSelectionOnClick
        disableColumnMenu
      />
  );

  return (
    <Box sx={{backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
        {datagrid}
    </Box>
);
}

export default IndexListing;
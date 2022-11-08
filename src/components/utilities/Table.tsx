import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {log} from "../../funcs/helpers";
import {Link} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type {TableProps} from '../../types/utilityComponents';
import menus from '../../objects/menus';
import {replaceDynamicParamInHref} from '../../funcs/helpers';

const editActionHref = menus[4].otherHrefs!.edit;

const disables = {disableColumnMenu: true, sortable: false, flex: 1};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', minWidth: 250, ...disables, renderCell: param => param.row._id },
  { field: 'name', headerName: 'Name', minWidth: 250, ...disables },
  { field: 'type', headerName: 'Type', ...disables },
  { field: 'primary', headerName: 'Primary', ...disables, 
  renderCell: params => params.value ? <CheckIcon /> : <CloseIcon />},
  {
    field: 'online',
    headerName: 'Online',
    //description: 'This column has a value getter and is not sortable.',
    //valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    ...disables,
    renderCell: params =>  <Button size="small"  color={params.value ? 'primary' : 'error'} sx={{color: params.value ? '#fff' : undefined}} variant="contained">
      {params.value ? 'Online' : 'Offline'}</Button>
  },
  { field: 'actions', headerName: 'Actions', ...disables,
  renderCell: params =>  <Button size="small" color="primary" sx={{color: "#fff"}} component={Link} to={replaceDynamicParamInHref(editActionHref, [params.row.uuid])} variant="contained">View</Button> }
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 10, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 11, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 12, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 13, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 14, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 15, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 16, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 17, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable({data}: TableProps) {
  log('Node table rendered');
  const [page, setPage] = React.useState(0);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  }

  const rows = [
    // { id: '6244853c6f3720001a2067ec', name: '6244853b8e948b001a12dddd', type: 'SIP', 
    // primary: false, online: false,
    // actions: '6244853c6f3720001a2067ec' },
    ...data
  ];

  return (
    <Box sx={{backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
      <DataGrid
        autoHeight
        getRowId={(row) => row._id}
        sx={{borderRadius: 0}}
        columns={columns}
        rows={rows}
        rowCount={4}
        rowsPerPageOptions={[10]}
        pageSize={4}
        //onPageSizeChange={(newPageSize) => console.log('newPageSize', newPageSize)}
        page={page}
        onPageChange={(newPage) => handlePageChange(newPage)}
        //checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}

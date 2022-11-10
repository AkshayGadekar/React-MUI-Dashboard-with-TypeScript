import React, {useMemo} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {log} from "../../../../funcs/helpers";
import {Link} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type {UsersIndexListingProps} from '../../../../types/pageComponents';
import menus from '../../../../objects/menus';
import {replaceDynamicParamInHref} from '../../../../funcs/helpers';

const editActionHref = menus[7].children![0].otherHrefs!.edit;

const IndexListing = ({data}: UsersIndexListingProps) => {
  log('Users table rendered', data);
  const [page, setPage] = React.useState(0);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  }

  const rows = [
    ...data
  ];

  const columns = useMemo(() => {
    const columns: GridColDef[] = [
      { field: 'first_name', headerName: 'First Name', sortable: false, minWidth: 150 },
      { field: 'last_name', headerName: 'Last Name', sortable: false, minWidth: 150 },
      { field: 'email', headerName: 'Email', sortable: false, minWidth: 250 },
      { field: 'role_name', headerName: 'Role', sortable: false, minWidth: 250, 
      valueGetter: params => params.row.role.role_name },
      { field: 'actions', headerName: 'Actions', sortable: false, minWidth: 100,
      renderCell: params =>  <Button size="small" color="primary" sx={{color: "#fff"}} component={Link} to={replaceDynamicParamInHref(editActionHref, [params.row.uuid])} variant="contained">Edit</Button> }
    ];
    return columns;
  }, []);

  const datagrid = (
    <DataGrid
        autoHeight
        getRowId={(row) => row.id}
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
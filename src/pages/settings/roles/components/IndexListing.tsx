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
import type {RolesIndexListingProps} from '../../../../types/pageComponents';
import menu from '../../../../objects/menu';
import {replaceDynamicParamInHref} from '../../../../funcs/helpers';

const editActionHref = menu[7].children![1].otherHrefs!.edit.href;

const IndexListing = ({data}: RolesIndexListingProps) => {
  log('Roles table rendered', data);
  const [page, setPage] = React.useState(0);

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  }

  const rows = [
    ...data
  ];

  const columns = useMemo(() => {
    const columns: GridColDef[] = [
      { field: 'role_name', headerName: 'Name', sortable: false, minWidth: 400 },
      { field: 'slug', headerName: 'Slug', sortable: false, minWidth: 400 },
      { field: 'actions', headerName: 'Actions', sortable: false, minWidth: 100, flex: 1,
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
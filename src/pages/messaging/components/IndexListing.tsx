import React, {useState, useMemo} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import {log} from "../../../funcs/helpers";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type {MessagingIndexListingProps} from '../../../types/pageComponents';
import AudioPlayer from "../../../components/utilities/AudioPlayer";
import Add from './Add';

const IndexListing = ({data}: MessagingIndexListingProps) => {
  log('Messaging rendered');
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({});

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  }

  const rows = [
    ...data
  ];

  const columns = useMemo(() => {
    const columns: GridColDef[] = [
      { field: '_id', headerName: 'Id', sortable: false, minWidth: 250 },
      { field: 'filename', headerName: 'Message', sortable: false, minWidth: 300, 
        renderCell: params =>  {
          const url = `${process.env.REACT_APP_BASE_URL_CALLQX}/audio${params.row.url}`;
          return <AudioPlayer fileName={params.row.name} url={url} duration={params.row.duration} />;
        }
      },
      { field: 'filesize', headerName: 'Filesize', sortable: false, minWidth: 100, valueFormatter: (params) => `${params.value/1000} KB`, },
      { field: 'duration', headerName: 'Duration', sortable: false, minWidth: 100, },
      { field: 'actions', headerName: 'Actions', sortable: false, minWidth: 250, flex: 1,
        renderCell: params =>  {
          const editBtn = <Button size="small" color="primary" sx={{color: "#fff", mr: 1}} variant="contained" onClick={() => log('Edit btn')}>Edit</Button>;
          const deleteBtn = <Button size="small" color="error" sx={{color: "#fff"}} variant="contained" onClick={() => log('Delete btn')}>Delete</Button>;
          return (
              <>
                  {editBtn}
                  {deleteBtn}
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
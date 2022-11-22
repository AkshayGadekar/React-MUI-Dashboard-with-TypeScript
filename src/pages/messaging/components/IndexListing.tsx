import React, {useMemo} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import {log} from "../../../funcs/helpers";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import type {NodesIndexListingProps} from '../../../types/pageComponents';

const IndexListing = ({data}: NodesIndexListingProps) => {
  log('Messaging rendered');
  const [page, setPage] = React.useState(0);

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
          const audioPlayer = (
            <>
              <Box display="flex" alignItems={"center"} width={'90%'}>
                <Box bgcolor={'primary.main'} width="11%" 
                  sx={{borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRight: '1px solid rgba(0,0,0,.2)', 
                  cursor: 'pointer', '&:hover': {opacity:'.9'}}}>
                  <PlayArrowIcon sx={{verticalAlign: 'middle'}} />
                </Box>
                <Box bgcolor={'primary.main'} width="11%" 
                  sx={{cursor: 'pointer', '&:hover': {opacity:'.9'}}}>
                  <SkipPreviousIcon sx={{verticalAlign: 'middle'}} />
                </Box>
                <Box bgcolor={'grey.300'} alignSelf={"normal"} position="relative"
                  sx={{borderTopRightRadius: 6, borderBottomRightRadius: 6, flexGrow: 1}}>
                  <Box position="absolute" width="20%" height="100%" bgcolor={'rgba(0,0,0,.1)'} top={0}></Box>
                  <Box component="span" display="inline-block" width='calc(100% - 100px)' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "left", 
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>pacman_death00</Box>
                  <Box component="span" display="inline-block" width='100px' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "right"}}>00:00 / 00:21</Box>
                </Box>
              </Box>
              <audio id="player-637c68eae8bdc8001ab9547d">
                <source src="https://callqx-portal.ecosmob.net/audio/customers/1/messages/wav/637c68eae8bdc8001ab9547d.wav" type="audio/wav" />
              </audio>
            </>  
          )
          return audioPlayer;
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
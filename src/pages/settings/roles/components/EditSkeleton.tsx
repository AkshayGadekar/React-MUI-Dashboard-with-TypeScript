import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import TableSkeleton from '../../../../components/skeletons/TableSkeleton';

const EditSkeleton = () => {
  return (
    <Box>
        <Skeleton variant="text" animation="wave" width={'150px'} sx={{ fontSize: '1.5xrem' }} />
        <Grid container direction="column">
            <Grid item mb={3}>
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={60} sx={{mb:.25}} />
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={100} sx={{}} /> 
            </Grid>
            <Grid item>
                <TableSkeleton notShowTextSkeleton />
            </Grid>
        </Grid>
    </Box>
  )
}

export default EditSkeleton;
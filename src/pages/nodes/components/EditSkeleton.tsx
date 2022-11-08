import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const EditSkeleton = () => {
  return (
    <Box>
        <Skeleton variant="text" animation="wave" width={'150px'} sx={{ fontSize: '1.5xrem' }} />
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={60} sx={{mb:.25}} />
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={250} sx={{}} />
                    </Grid>
                    <Grid item>
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={60} sx={{mb:.25}} />
                        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={100} sx={{}} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={60} sx={{mb:.25}} />
                <Skeleton variant="rectangular" animation="wave" width={'100%'} height={435} sx={{}} />
            </Grid>
        </Grid>
    </Box>
  )
}

export default EditSkeleton
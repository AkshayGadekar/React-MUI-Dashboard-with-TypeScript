import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const TableSkeleton = () => {
  return (
    <>
        <Skeleton variant="text" animation="wave" sx={{ fontSize: '1.5xrem' }} />
        <Skeleton variant="rounded" animation="wave" width={'100%'} height={60} sx={{mb:.25, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}} />
        <Skeleton variant="rounded" animation="wave" width={'100%'} height={360} sx={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} />
    </>
  )
}

export default TableSkeleton
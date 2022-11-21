import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {TableSkeletonProps} from '../../types/components';

const TableSkeleton = (props: TableSkeletonProps) => {
  
  return (
    <>
        {
          (props.notShowTextSkeleton == undefined) && 
          <Skeleton variant="text" animation="wave" width={'150px'} sx={{ fontSize: '1.5xrem' }} />
        }
        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={60} sx={{mb:.25}} />
        <Skeleton variant="rectangular" animation="wave" width={'100%'} height={360} sx={{}} />
    </>
  )
}

export default TableSkeleton
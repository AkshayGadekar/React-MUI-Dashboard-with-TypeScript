import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import type { TableTitleProps } from '../../types/utilityComponents';

const TableTitle = ({title}:TableTitleProps) => {
  return (
    <Box p={2} sx={{border: '1px solid rgba(224, 224, 224, 1)', 
      borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottom: 0,
      backgroundColor: 'primary.main', color: '#fff'}}>
        <Typography variant='h6'>
          {title}
        </Typography>
    </Box>
  );
}

export default TableTitle
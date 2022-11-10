import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import type { HeadingProps } from '../../types/components';

const Heading = (props:HeadingProps) => {
  
  return (
    <Box p={2} sx={{backgroundColor: 'primary.main', color: '#fff', display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h6'>
          {props.title}
        </Typography>
        {
          props.button 
          ? 
          <Button variant="outlined" size="small" sx={{border: '1px solid rgba(255, 255, 255, .75)', 
          color: '#fff', '&:hover': {border: '1px solid #fff'}}} {...props.button}>{props.button.value}</Button>
          :
          undefined
        }
    </Box>
  );
}

export default Heading;
import React, {memo} from 'react';
import Box from '@mui/material/Box';
import type {BreadcrumbProps} from '../../types/components';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';

const Breadcrumb = (props: BreadcrumbProps) => {

  const totalPath = props.path;

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }  console.log('breadcrumb rendered');

  return (
    <Box role="presentation" onClick={handleClick} mb={1}>
        <Breadcrumbs aria-label="breadcrumb" sx={{fontSize: '12px', "& .MuiBreadcrumbs-li > *":{fontSize: '12px'}}}>
            {totalPath.map((path, index) => {
                if (path.link) {
                    return (
                        <Link key={index} component={RouterLink} underline="hover" color="inherit" to={path.link}>
                            {path.label}
                        </Link>
                    )
                }
                return (
                    <Typography key={index} color="text.primary">{path.label}</Typography>        
                );    
            })}
        </Breadcrumbs>
    </Box>
  )
}

const areEqual = (prevProps: BreadcrumbProps, nextProps: BreadcrumbProps) => {
    const length = prevProps.path.length;
    return prevProps.path[length-1].label === nextProps.path[length-1].label;
}

export default memo(Breadcrumb, areEqual);
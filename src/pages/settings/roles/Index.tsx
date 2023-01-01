import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom";
import withAxios from '../../../HOC/withAxios';
import type {RolesIndexProps} from "../../../types/pages";
import { useAppSelector } from '../../../store/hooks';
import { log } from '../../../funcs/helpers';
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import Breadcrumb from '../../../components/utilities/Breadcrumb';
import Heading from '../../../components/utilities/Heading';
import IndexListing from './components/IndexListing';
import menu from '../../../objects/menu';

const createActionHref = menu[3].children![1].otherHrefs!.create.href;

const Index = (props: RolesIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const breadCrumb = menu[3].children![1].breadCrumb;

  const buttonInfo = {
    value: 'Add New',
    component: Link,
    to: createActionHref 
  }

  useEffect(() => {

    const requestController = new AbortController();
    
    setIsLoading(true);
    
    props.authAxios({...props.apiEndPoints.roles.list, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse.records);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
      requestController.abort('Request aborted to clean up useEffect.');
    }
  }, []);
  
  log('Roles listing rendered');

  return (
    <Box>
      {
        isLoading
        ?
        <TableSkeleton />
        :
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Roles" button={buttonInfo} />
          <IndexListing data={data} />
        </>
      }
    </Box>
  )
}

export default withAxios<RolesIndexProps>(Index);
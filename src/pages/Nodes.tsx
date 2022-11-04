import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TableTitle from '../components/utilities/TableTitle';
import Table from "../components/utilities/Table";
import Breadcrumb from "../components/utilities/Breadcrumb";
import {log} from "../funcs/helpers";
import TableSkeleton from '../components/skeletons/TableSkeleton';
import withAxios from '../HOC/withAxios';
import type {NodeProps} from "../types/pages";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {getQueryString, encodedQueryString} from "../funcs/helpers";

const Nodes = (props: NodeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listingData, setListingData] = useState([]);

  const userInfo = useAppSelector(state => state.user);

  const path = [
    {
      label: 'Nodes',
      link: '/nodes/list'
    },
    {
      label: 'List'
    }
  ];

  useEffect(() => {

    const data = {
      limit: 20,
      page: 1,
      customer: userInfo.user.account.uuid
    };
    const requestController = new AbortController();
    
    props.authAxios({...props.apiEndPoints.nodes.list, params: data, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setListingData(successResponse);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
      requestController.abort('Request aborted to clean up useEffect.');
    }
  }, []);
  
  log('Node rendered');

  return (
    <Box>
      {
        isLoading
        ?
        <TableSkeleton />
        :
        <>
          <Breadcrumb path={path} />
          <TableTitle title="Nodes" />
          <Table data={listingData} />
        </>
      }
    </Box>
  )
}

export default withAxios<NodeProps>(Nodes);
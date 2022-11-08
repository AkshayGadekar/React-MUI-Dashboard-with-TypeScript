import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Heading from '../../components/utilities/Heading';
import Table from "../../components/utilities/Table";
import Breadcrumb from "../../components/utilities/Breadcrumb";
import {log} from "../../funcs/helpers";
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import withAxios from '../../HOC/withAxios';
import type {NodesListingProps} from "../../types/pages";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getQueryString, encodedQueryString} from "../../funcs/helpers";

const Index = (props: NodesListingProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

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
        
        setData(successResponse);
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
          <Heading title="Nodes" />
          <Table data={data} />
        </>
      }
    </Box>
  )
}

export default withAxios<NodesListingProps>(Index);
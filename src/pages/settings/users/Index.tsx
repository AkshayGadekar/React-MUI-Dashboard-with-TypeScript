import React, {useState, useEffect} from 'react';
import withAxios from '../../../HOC/withAxios';
import Box from '@mui/material/Box';
import type {UsersIndexProps} from "../../../types/pages";
import { useAppSelector } from '../../../store/hooks';
import { log } from '../../../funcs/helpers';
import TableSkeleton from '../../../components/skeletons/TableSkeleton';
import Breadcrumb from '../../../components/utilities/Breadcrumb';
import Heading from '../../../components/utilities/Heading';
import IndexListing from './components/IndexListing';

const Index = (props: UsersIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const userInfo = useAppSelector(state => state.user);

  const path = [
    {
      label: 'Settings',
      link: '/settings/users/list'
    },
    {
      label: 'Users',
      link: '/settings/users/list'
    },
    {
      label: 'List'
    }
  ];

  useEffect(() => {

    const requestController = new AbortController();
    
    props.authAxios({...props._(props.apiEndPoints.users.list, {id: userInfo.user.account.uuid}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse.users);
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
          <Heading title="Users" />
          <IndexListing data={data} />
        </>
      }
    </Box>
  )
}

export default withAxios<UsersIndexProps>(Index);
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumb from "../../components/utilities/Breadcrumb";
import Heading from "../../components/utilities/Heading";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {log} from "../../funcs/helpers";
import { useTheme } from '@mui/material/styles';
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import withAxios from '../../HOC/withAxios';
import type {NodesEditProps} from "../../types/pages"; 
import EditSkeleton from './components/EditSkeleton';
import {isLinkSame} from "../../funcs/helpers";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { useParams } from 'react-router-dom';
import EditInfo from './components/EditInfo';
import EditServices from './components/EditServices';
import { Typography } from '@mui/material';

const Edit = (props: NodesEditProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>>();

  const path = [
    {
      label: 'Nodes',
      link: '/nodes/list'
    },
    {
      label: 'View'
    }
  ];

  const param = useParams();
  const theme = useTheme();

  useEffect(() => {

    const requestController = new AbortController();
    
    props.authAxios({...props._(props.apiEndPoints.nodes.edit, {id: param.id}), signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log('successResponse', successResponse);
        
        setData(successResponse);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
      requestController.abort('Request aborted to clean up useEffect.');
    }
  }, []);
  
  return (
    <Box>
    {
      isLoading 
      ?
      <EditSkeleton />
      :
      <>
        <Breadcrumb path={path} />
        <Grid container>
          <Grid item xs={12} md={6} sx={{[theme.breakpoints.up('md')]: {paddingRight: '1rem'}}}>
            <Grid container direction="column">
              <Grid item sx={{marginBottom: '1.5rem'}}>
                <EditInfo data={data!} />
              </Grid>
              <Grid item sx={{marginBottom: '1.5rem'}}>
                <Heading title="Customers" />
                <Box sx={{width: '100%', p:2, 
                backgroundColor: '#fff', boxShadow: theme => theme.shadows[1]}}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item>
                      {
                        data!.customers.map((customer: Record<string, any>, index: number) => 
                        <TextField key={index} variant="outlined" InputProps={{readOnly: true}} value={customer.company_name} fullWidth  />)
                      }
                    </Grid>
                  </Grid>
                </Box>
              </Grid>  
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={{[theme.breakpoints.up('md')]: {paddingLeft: '1rem'}}}>
            <Grid container direction="column">
              <Grid item sx={{marginBottom: '1.5rem'}}>
                <EditServices data={data!.services} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </> 
    }
    </Box>
  )
}

export default withAxios(Edit);
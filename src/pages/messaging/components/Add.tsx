import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DropFile from "../../../components/utilities/DropFile";
import type {MessagingAddNewProps} from '../../../types/pageComponents';
import withAxios from '../../../HOC/withAxios';
import AudioPlayer from "../../../components/utilities/AudioPlayer";
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import { log } from '../../../funcs/helpers';
import {useFormik}  from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@mui/material/FormHelperText';
import { useAppSelector } from '../../../store/hooks';
import CloseModal from "../../../components/utilities/CloseModal";

const Add = (props: MessagingAddNewProps) => {
    const [id, setId] = useState('');
    const [duration, setDuration] = useState(0.0);
    const [url, setUrl] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const processMessagingData = (data: Record<string, any>) => {
        setId(data._id);
        setName(data.name);
        setDuration(data.duration);

        const url = `${process.env.REACT_APP_BASE_URL_CALLQX}/audio${data.url}`;
        setUrl(url);
    }

    const handleName = (ev: React.ChangeEvent<HTMLInputElement>) => {

        const name = ev.target.value;

        let error = false;
        if (name == '') {
            setNameError('Name is required');
            error = true;
        }
        if (name.length > 50) {
            setNameError('Name cannot exceed 50 characters.');
            error = true;
        }

        setName(name);
        !error ? setNameError('') : '';
    }

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (!nameError && name != '' && id != '') {
            setIsLoading(true);
            
            const data = {name};
            props.authAxios({...props._(props.apiEndPoints.messages.createMessage, {id: id}), data})
            .then((res) => {

                const successResponse = res.data;
                log('successResponse', successResponse);
                
                props.setParentState.setSnackbarInfo({message: 'Message created successfully', severity: 'success'});
                props.setParentState.setShowSnackBar(true);
                props.setParentState.setMessagesCreatedCount(count => count + 1);
                
            })
            .catch((error) => {
                props.processAxiosError(error, props);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }

    log('Messaging AddNew rendered');

    return (
        <Box>
            <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='sm'>
                <CloseModal close={props.close} />
                <Typography variant="h6" p={3}>Custom Messaging</Typography>
                <Divider />
                <DialogContent>
                    <form id="CreateMessagingForm" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {
                                    !id 
                                    ? <DropFile processMessagingData={processMessagingData} />
                                    : <AudioPlayer fileName={name} url={url} duration={duration} />
                                }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="id"
                                    label="Id"
                                    type="text"
                                    variant="filled"
                                    value={id}
                                    disabled
                                    name="id"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    type="text"
                                    variant="outlined"
                                    value={name}
                                    name="name"
                                    onChange={handleName}
                                    error={!!nameError}
                                    helperText={nameError}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="duration"
                                    label="Duration"
                                    type="text"
                                    variant="filled"
                                    value={duration}
                                    disabled
                                    name="duration"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <Divider />
                <DialogActions sx={{pr: 3}}>
                    <Button type="submit" form="CreateMessagingForm" variant="contained" sx={{color: '#fff'}} disabled={isLoading}>
                        {!isLoading ? "Save" : <CircularProgress color="inherit" size={26} />}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default withAxios<MessagingAddNewProps>(Add);
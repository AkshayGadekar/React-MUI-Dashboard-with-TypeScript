import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { log, getSizeInBytes, getSizeInMB, validateFile } from '../../funcs/helpers';
import withAxios from '../../HOC/withAxios';
import type {ValidationRules} from "../../types/funcs";
import type {DropFileProps} from "../../types/components";
import LinearProgress from '@mui/material/LinearProgress';
import {noWrap} from "../../objects/objects";

const DropFile = (props: DropFileProps) => {

  const [error, setError] = useState('');
  const [dropped, setDropped] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  const uploadBoxRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);

  const uploadFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    
    processFiles(files);
  }

  const dragEnter = (ev: React.DragEvent) => {
    uploadBoxRef.current!.style.backgroundColor = '#f5f5f5';
  }

  const dragLeave = (ev: React.DragEvent) => {
    uploadBoxRef.current!.style.backgroundColor = '#fff';
  }

  const allowDrop = (ev: React.DragEvent) => {
    ev.preventDefault()
  };

  const drop = (ev: React.DragEvent) => {
    ev.preventDefault();
    const dataTransfer = ev.dataTransfer;
    const files = dataTransfer.files;
    
    processFiles(files);
  }

  const processFiles = (files: FileList|null) => {
    setError('');

    try {

      if (files == null || files.length != 1) {
        throw new Error('please upload only one audio file.');
      }

      setDropped(true);

      const audio = files[0];

      const audioMaxSizeInMB = Number(process.env.REACT_APP_MAX_AUDIO_SIZE);
      const audioSupportedFormats = ["audio/wav"];
      const validationRules: ValidationRules = {
          maxSize: [getSizeInBytes(audioMaxSizeInMB), `Audio size must not be greater than ${audioMaxSizeInMB}MB.`], 
          mimes: [audioSupportedFormats, "Audio of type wav is allowed."]
      }
      validateFile(audio, validationRules);

      const fileSize = getSizeInMB(audio.size);
      setFileName(audio.name);
      setFileSize(fileSize);

      const data = new FormData();
      data.append('message', audio);

      const progressBarNode = progressBarRef.current;

      props.authAxios({...props.apiEndPoints.messages.uploadAudio, data, progressBarNode: progressBarNode!})
      .then((res) => {
                
        const successResponse = res.data;
        log(successResponse);
        
        props.setSnackbarInfo({message: 'Audio file has uploaded successfully.', severity: 'success'});
        props.setShowSnackBar(true);
        
      }).catch((error) => {
          props.processAxiosError(error, props);
      })
      
    } catch (error) {
      
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message= String(error)
      }

      setError(message);
    }
  }

  return (
    <>
        <Box mb={2} sx={{fontSize: '14px', fontStyle: 'italic'}}>Files uploaded should be in .wav format. They will be converted to the appropiate codecs</Box>
        <Box onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={allowDrop} onDrop={drop} ref={uploadBoxRef} component="label" border={2} display="flex" flexDirection={'column'} justifyContent={'center'} borderColor={error == '' ? 'grey.300' : 'red'} width={'100%'} height={200}
          sx={{cursor: 'pointer', "&:hover": {backgroundColor: theme => `${theme.palette.grey['100']}!important`}}} >
            <Box display={dropped ? 'none' : 'block'}>
              <Box color={'grey.600'} textAlign='center'>Drop files here to upload</Box>
              <input type="file" style={{display: 'none'}} onChange={uploadFile} />
            </Box>
            <Box display={dropped ? 'flex' : 'none'} justifyItems={"space-between"} alignItems={"center"}>
              <Box pl={2} sx={{width: '100px'}} textAlign="left">{`${fileSize} MB`}</Box>
              <LinearProgress color="secondary" variant="determinate" value={0} sx={{flexGrow: 1, mx: 1, height: 20, borderRadius: 2}} ref={progressBarRef} />
              <Box pr={2} sx={{width: '150px'}} textAlign="right">{`${fileName}`}</Box>
            </Box>
        </Box>
        <FormHelperText error>{error}</FormHelperText>
    </>
  )
}

export default withAxios(DropFile);
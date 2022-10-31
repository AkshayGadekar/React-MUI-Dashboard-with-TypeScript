import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {type SnackbarProps} from "../../types/utilityComponents";

const ShowSnackbar = (props: SnackbarProps) => {
    
    return (
        <Snackbar open={props.open} autoHideDuration={props.snackbarInfo.duration} onClose={props.closeSnackbar} key={props.snackbarInfo.key} 
            anchorOrigin={{ vertical: props.snackbarInfo.vertical, horizontal: props.snackbarInfo.horizontal }} 
        >
            <Alert onClose={props.closeSnackbar} severity={props.snackbarInfo.severity} variant={props.snackbarInfo.variant} elevation={props.snackbarInfo.elevation} 
            sx={{ width: props.snackbarInfo.width }}>
                {props.snackbarInfo.message}
            </Alert>
        </Snackbar>
    );

}

export default ShowSnackbar;

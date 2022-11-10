import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {getBasicSnackBarInfo} from "../../funcs/helpers";
import {type SnackbarProps} from "../../types/components";

const ShowSnackbar = (props: SnackbarProps) => {
    
    const defaultSnackBarOptions = getBasicSnackBarInfo();
    const options = {...defaultSnackBarOptions, ...props.snackbarInfo};
    
    return (
        <Snackbar open={props.open} autoHideDuration={options.duration} onClose={props.closeSnackbar} key={options.key} 
            anchorOrigin={{ vertical: options.vertical!, horizontal: options.horizontal! }} 
        >
            <Alert onClose={props.closeSnackbar} severity={options.severity} variant={options.variant} elevation={options.elevation} 
            sx={{ width: options.width }}>
                {options.message}
            </Alert>
        </Snackbar>
    );

}

export default ShowSnackbar;

import React from 'react'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseModal from "../../../components/utilities/CloseModal";
import type {DeleteDialogProps} from '../../../types/pageComponents';

const DeleteDialog = (props: DeleteDialogProps) => {
  return (
    <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='sm'>
        <CloseModal close={props.close} />
        <DialogContent>
            <Typography variant="h6" p={3}>Are you sure you want to delete?</Typography>
        </DialogContent>
        <Divider />
        <DialogActions sx={{pr: 3}}>
            <Button type="button" variant="contained" onClick={props.close} sx={{color: '#fff', backgroundColor: "rgba(0,0,0,.5)"}}>
                Discard
            </Button>
            <Button type="button" variant="contained" onClick={() => props.deleteMessage(props.deleteID)} sx={{color: '#fff'}}>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
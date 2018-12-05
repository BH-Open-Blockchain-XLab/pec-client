import {
  Dialog, 
  Button,
  DialogTitle,
  DialogActions
} from '@material-ui/core';

import React from 'react';
import PropTypes from 'prop-types';

function ConfirmDialog(props){
  return (
    <Dialog
      open={props.open}
      onClose={props.no}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogActions>
        <Button onClick={()=>{props.no()}} color="primary">
          No
        </Button>
        <Button onClick={()=>{props.yes()}} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  yes: PropTypes.func.isRequired,
  no: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

export default ConfirmDialog;

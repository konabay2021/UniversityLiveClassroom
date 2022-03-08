

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import React, { useState } from 'react';

let SnackBar = (props) =>{

    return(
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        key={`top,$left`}
        open={props.Open}
        onClose={props.handleClose}>
        <SnackbarContent style={{
          backgroundColor: props.success ? '#84DE02' : '#FFBF00'  ,
        }}
          message={<span id="client-snackbar">{props.AlertMessage}!</span>}
        />
      </Snackbar>
    )
}
export default SnackBar
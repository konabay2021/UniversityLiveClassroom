import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from "../Component/Wrappers/Wrappers";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    AddButton: {
        marginLeft: 'auto',
        marginRight: -12,
    },
}));

export default function CommentModal(props) {
    const classes = useStyles();

    let [Open, setOpen] = React.useState(false);
    let [Topic, setTopic] = useState(false)
    let [Context, setContext] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let checkForumTopic = () => {
        if (Topic && Context) {
            handleClose()
            props.handleAddTopic(Topic, Context)
        }
        else
            alert("must fill in !")

    }
    return (
        <React.Fragment>


            <Tooltip title="Write a Thread" placement="bottom">
                <IconButton className={classes.AddButton} onClick={handleClickOpen}>
                    <CreateIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={Open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}
                maxWidth={'md'}>
                <DialogTitle id="form-dialog-title">Write a Thread</DialogTitle>

                <DialogContent>
                    <TextField onChange={(event) => setTopic(event.target.value)} autoFocus margin="dense" variant="outlined" id="title" label="Thread Title" type="text" fullWidth multiline required />
                    <TextField onChange={(event) => setContext(event.target.value)} margin="dense" rows='15' variant="outlined" id="contents" label="Thread Contents" type="text" fullWidth multiline required />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button type="button" onClick={checkForumTopic} color="primary" >Submit</Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    )

}



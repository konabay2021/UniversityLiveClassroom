import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from "../Component/Wrappers/Wrappers";

export default function CommentModal(props) {
    let [AddComment, setAddComment] = useState(null)
    return (
        <Dialog
            open={props.Opent} onClose={props.handleCloseComment} aria-labelledby="form-dialog-title" fullWidth={true}
            maxWidth={'md'}>
            <DialogTitle id="form-dialog-title">Write a Comment</DialogTitle>
            <DialogContent>
                <TextField autoFocus onChange={e => setAddComment(e.target.value)} margin="dense" id="comments" variant="outlined" label="Comments" type="text" rows="15" fullWidth multiline required />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleCloseComment} color="primary">Cancel</Button>
                <Button type="button" onClick={() => {
                    props.handleAddComment(AddComment)
                }} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    )

}



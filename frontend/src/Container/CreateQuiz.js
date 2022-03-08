import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
const useStyles = makeStyles(theme => ({
    app: {

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
    },
    main: {
        flex: 1,
    },
}));


let Quiz = (props) => {
    const classes = useStyles();

    let renderQuiz = () => {
        return (
            <React.Fragment>
                <div className={classes.app}>
                    <div className={classes.main}>

                        <br />
                        <form noValidate autoComplete="off">
                            <h2>Create New Quiz</h2>
                            
                            Enter question here: 
                            <TextField required id="standard-required" /><br />
                            <Input defaultValue="Option A" inputProps={{ 'aria-label': 'description' }} />
                            <Input defaultValue="Option B" inputProps={{ 'aria-label': 'description' }} /><br />
                            <Input defaultValue="Option C" inputProps={{ 'aria-label': 'description' }} />
                            <Input defaultValue="Option D" inputProps={{ 'aria-label': 'description' }} /><br />
                            Correct Answer:
                            <Select open={open} onClose={handleClose} onOpen={handleOpen} value={option} onChange={handleChange} >
                            <MenuItem value={1}>A</MenuItem>
                            <MenuItem value={2}>B</MenuItem>
                            <MenuItem value={3}>C</MenuItem>
                            <MenuItem value={4}>D</MenuItem>
                            </Select>
                        </form>
                        <br />
                        <br /><br />
                        <Button variant="outlined" size="large" onClick={() => { window.location.href = "/ProfessorQuiz" }}>Create Quiz</Button>
                        <Button variant="outlined" size="large" onClick={() => { window.location.href = "/Quiz" }}>Back</Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    let RedirectToLogin = () => {
        alert("You have not yet login!");
        const { history } = props;
        history.push('/login');
    }
    const [option, setOption] = React.useState('');
    const [option2, setOption2] = React.useState('');
    const [option3, setOption3] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            {localStorage.getItem('token') ? renderQuiz() : RedirectToLogin()}
        </React.Fragment>
    )
}

export default Quiz


import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { UserType,UserCourseList } from "../test"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        [theme.breakpoints.up('md')]: {
            width: '80%',
          },
    },
    courseListPaper: {
        [theme.breakpoints.up('md')]: {
            float: 'right',
          },
        minHeight: '60vh'
    },
    profgenCodePaper: {
        [theme.breakpoints.up('md')]: {
            float: 'right',
          },
        minHeight: '45vh'
    },
    tableHead: {
        fontSize: 22,
        textAlign: 'center'
    },
    tableRow: {
        '&:hover': {
            background: '#F1F1F1 !important',
            cursor: 'pointer'
        }
    },
    tablecell: {
        fontSize: 16,
        textAlign: 'center',
    },
    container:{
        marginBottom: '35px'
    }
}));
let CourseTable = (props) => {
    const { userType, userTypeDispatch } = useContext(UserType);
    const { courselist, courselistDispatch } = useContext(UserCourseList);


    const classes = useStyles();
    return (
            <Paper className={ userType === 'student' ?
                `${classes.courseListPaper} ${classes.paper}` : `${classes.profgenCodePaper} ${classes.paper}`}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead}>
                                    <Typography variant="h6" noWrap>Select Your Courses</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* User's Course List */}
                        <TableBody>
                            {courselist && courselist.map(item => {
                                return (
                                    <TableRow className={classes.tableRow}
                                        onClick={() => {
                                           props.type === 'Attendance'  && props.setChartOpen(false) 
                                            props.setCourse(item.code)
                                        }}>
                                        <TableCell className={classes.tablecell}>{item.code} {item.name}</TableCell>
                                    </TableRow>

                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {props.children}
            </Paper>
    )
}
export default CourseTable
import React from 'react';
import '../assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Alert from "@material-ui/lab/Alert/Alert";
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

function Alert(props){
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root:{
    width:'100%',
    '& > * + *':{
      marginTop:theme.spacing(2),
    },
  },
}));

export default function AlertMessages(props){
  const classes = useStyles();

  let open = false;
  let onCloseFunction;
  let message = "";
  let severity = "";

  if(props.openError){
    open = true;
    onCloseFunction = ()=>{location.reload(); open = false;};
    onCloseFunction = function(){location.reload(); open = false;};
    message = "This track should not have been listened to. Try again!";
    severity = "error";
  }
  if(props.openInfo){
    open = true;
    onCloseFunction = ()=>{open = false;};
    onCloseFunction = function(){open = false;};
    message = "This track should not have been listened to. Continue listening other track!";
    severity = "info";

  }
  if(props.openSuccess){
    open = true;
    onCloseFunction = ()=>{open = false;};
    message = "You've listened all the tracks. Congratulations!";
    severity = "success";

  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={10000} onClose={onCloseFunction}>
        <Alert onClose={onCloseFunction} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );

}
import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

export default function dialog(prop) {
  let name = prop.name;
  let message = prop.message;


  const Style = makeStyles({
    messageFromOther: {
      paddingLeft: '25px',
      textAlign: 'left',
  },
    messageFromMe: {
      paddingRight: '25px',
      textAlign: 'right',
  },
    messageFromOtherspan: {
      display:'inline-block',
      borderTopLeftRadius: '21px',
        borderTopRightRadius: '21px',
        borderBottomLeftRadius: '21px',
        borderBottomRightRadius: '21px',
        borderWidth: '1px',
        paddingTop: '0px',
        paddingRight: '15px',
        color: 'black',
        backgroundColor: 'white',
    },
    messageFromMespan: {
        display:'inline-block',
        borderTopLeftRadius: '21px',
        borderTopRightRadius: '21px',
        borderBottomLeftRadius: '21px',
        borderBottomRightRadius: '21px',
        borderWidth: '1px',
        paddingTop: '0px',
        paddingRight: '15px',
        color: 'white',
        backgroundColor: 'blue',
    },
});

const classes = Style()

  return (<>
    
    <div className={name==="Alice"? classes.messageFromMe : classes.messageFromOther}>
        <span className={name==="Alice"? classes.messageFromMespan : classes.messageFromOtherspan}>
          {message}
        </span>
    </div>
        </>    

 
  );
}

import React from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@mui/styles";

//const useStyles = makeStyles((theme) => ({
// root: {
//   top: theme.spacing(9),
//},
//}));

function Notification(props) {
  const { notify, setNotify } = props;
  //const classes = useStyles();

  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };
  return (
    <Snackbar
      // className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;

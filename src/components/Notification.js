
import { Snackbar,Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        margin: "50 0 0 50px !important",
        padding:"50px",
        height:55,
        minWidth: 1385,
    }
})

export default function Notification(props) {
    const {notify,setNotify}=props
    const classes = useStyles()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
        localStorage.setItem("isOpen",false)
    }
    return (
        <Snackbar 
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
        <Alert severity={notify.type}
        onClose={handleClose}
        >
        {notify.message}
        </Alert>
        </Snackbar>
  );
  }
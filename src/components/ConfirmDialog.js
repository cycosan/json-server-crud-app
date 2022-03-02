import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography,Button } from '@mui/material'
// import Controls from "./controls/Controls";
// import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';


// const useStyles = makeStyles(theme => ({
//     dialog: {
//         padding: theme.spacing(2),
//         position: 'absolute',
//         top: theme.spacing(5)
//     },
//     dialogTitle: {
//         textAlign: 'center'
//     },
//     dialogContent: {
//         textAlign: 'center'
//     },
//     dialogAction: {
//         justifyContent: 'center'
//     },
//     titleIcon: {
//         backgroundColor: theme.palette.secondary.light,
//         color: theme.palette.secondary.main,
//         '&:hover': {
//             backgroundColor: theme.palette.secondary.light,
//             cursor: 'default'
//         },
//         '& .MuiSvgIcon-root': {
//             fontSize: '8rem',
//         }
//     }
// }))

export default function ConfirmDialog(props) {

    const { confirmDialog, setConfirmDialog } = props;
    // const classes = useStyles()

    return (
        <Dialog open={confirmDialog.isOpen} >
            <DialogTitle>
                {/* <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton> */}
            </DialogTitle>
            <DialogContent >
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions>

<Button variant="contained" color="primary" style={{marginRight:10}} onClick={confirmDialog.onConfirm} >Yes</Button>
                        <Button variant="contained" color="error"  onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} >No</Button>
            </DialogActions>
        </Dialog>
    )
}

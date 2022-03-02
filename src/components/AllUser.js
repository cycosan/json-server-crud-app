
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { getUsers,deleteUsers } from "../Service/Api";
import { Link} from 'react-router-dom';
import Notification from "./Notification";
import ConfirmDialog from "./ConfirmDialog";
// import {notify,setNotify} from "./AddUser"
const useStyles=makeStyles({
    table:{
        width:'90% !important',
        margin:"50px 0 0 50px !important"
    },
    thead: {
        '& > *': {
            fontSize: "20px !important",
            background: '#000000',
            color: '#FFFFFF !important'
        }
    },
    row: {
        '& > *': {
            fontSize: "15px !important"
        }
    }
})
export default function AllUsers() {
    const classes=useStyles()
    const [users,setUsers]=useState([])
    const [notify, setNotify] = useState({ isOpen: localStorage.getItem("isOpen")==="true", message:localStorage.getItem("message"), 
    type: localStorage.getItem("type") })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    console.log(notify)
    // const {id} = useParams()
    // const history= useNavigate()
    useEffect(()=>{
        getAllUsers();
    },[]);
    const getAllUsers= async()=>{
        const response= await getUsers();
        // console.log(response.data)
        setUsers(response.data)
    }
    const DeleteUsers= async(id)=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        await deleteUsers(id);
        setNotify({
            'isOpen': true,
            'message':'Deleted Successfully',
            'type':'error'
        })

        getAllUsers();

    }
    return (
        <>
     <Table className={classes.table}>
         <TableHead>
             <TableRow className={classes.thead}>
                 <TableCell>Id</TableCell>
                 <TableCell>Name</TableCell>
                 <TableCell>Username</TableCell>
                 <TableCell>Email</TableCell>
                 
                 <TableCell>Phone</TableCell>
                 <TableCell>Actions</TableCell>
             </TableRow>
         </TableHead>
         <TableBody>
             {
                 users.map(user=>(
                    <TableRow className={classes.row} key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary" style={{marginRight:10}} component={Link} to={`/edit/${user.id}`} >Update</Button>
                        <Button variant="contained" onClick={() => {setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { DeleteUsers(user.id) }
                                                    
                                                })
                                            }} color="error" >Delete</Button>
                    </TableCell>
                    </TableRow>
                  
                 ))
                 }
             
         </TableBody>
         
     </Table>
     <Notification
                notify={notify}
                setNotify={setNotify}
            />
        <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
     </>
  );
  }
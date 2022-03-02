import { Button, FormControl, FormGroup, Input, InputLabel, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { addUsers } from "../Service/Api";
import { useForm,Controller } from "react-hook-form";

import Notification from "./Notification";
import { useNavigate } from 'react-router-dom';
const useStyles=makeStyles({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '& > *': {
        marginTop: "20px !important"
    }
}
})
const initialValues={
  name: '',
  username: '',
  email: '',
  phone: ''
}
export default function AddUser() {
const { register, handleSubmit, trigger,control, formState: { errors } } = useForm();
    console.log("errors",errors)
    const classes = useStyles()
    // const id =useParams()
    let history = useNavigate()
    const [user,setUsers]=useState(initialValues)
    const { name, username, email, phone } = user;
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const onValueChange=(e)=>{
        console.log(e.target.value);
        e.preventDefault()
        setUsers({...user,[e.target.name]:e.target.value})
        console.log(user)
        
    }
    const addUserDetails = async() => {
      await addUsers(user);
    //   setNotify({
    //     isOpen: true,
    //     message: 'Submitted Successfully',
    //     type: 'success'
    // })
    localStorage.setItem('isOpen', true);
    localStorage.setItem('message','Submitted Successfully')
    localStorage.setItem('type','success')

      history({pathname:'/all'});

  }
  const onChangeFirst = value => console.log('First:', value)

    return (<>

      <FormGroup className={classes.container}>
        <Typography varient="h4">Add User</Typography>
      <FormControl>
      <InputLabel>Name</InputLabel>
      <Input id='name'  name='name' value={name}  
            

            {...register("name", { required: "Name is Required", onChange:(e) => onValueChange(e) })}
            onKeyUp={() => {
              trigger("name");
            }}
      />
                 {errors.name && (
                <small style={{color:"red"}}>{errors.name.message}</small>
              )}

      </FormControl>
      <FormControl>
      <InputLabel>Username</InputLabel>
      <Input  name='username'  value={username} 
      
      {...register("username", { required: "Username is Required", onChange:(e) => onValueChange(e) })}
      onKeyUp={() => {
        trigger("username");
      }}
      />
        {errors.username && (
                <small style={{color:"red"}}>{errors.username.message}</small>
              )}
      </FormControl>
      <FormControl>
      <InputLabel>Email</InputLabel>
      <Input  name='email'  value={email}
          {...register("email", { required: "Email is Required", 
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
          onChange:(e) => onValueChange(e) })}
          onKeyUp={() => {
            trigger("email");
          }}
      />
      {errors.email && (
                <small style={{color:"red"}}>{errors.email.message}</small>
              )}
      </FormControl>      
      <FormControl>
      <InputLabel>Phone</InputLabel>
      <Input name='phone'  value={phone} 
           {...register("phone", { required: "Phone is Required", onChange:(e) => onValueChange(e) })}
           onKeyUp={() => {
             trigger("phone");
           }}
      />
    {errors.phone && (
                <small style={{color:"red"}}>{errors.phone.message}</small>
              )}
      </FormControl>
      <Button  variant="contained" color="primary"  onClick={handleSubmit(addUserDetails)}> Add User </Button>
      </FormGroup>
          {/* <Notification
          notify={notify}
          setNotify={setNotify}
      /> */}
   </>   
  );
  }
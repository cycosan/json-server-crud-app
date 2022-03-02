import { Button, CircularProgress, FormControl, FormGroup, Input, InputLabel, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { useState } from "react";
import { editUsers, getUsers } from "../Service/Api";
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
export default function EditUser() {
    const classes = useStyles()
    const [loading,setLoading]=useState(true)
const { register, handleSubmit, trigger, formState: { errors } } = useForm();
  // console.log(errors)
    const {id} =useParams()
    let history = useNavigate()
    const [user,setUsers]=useState(initialValues)
    const { name, username, email, phone } = user;
  // console.log(name)

    useEffect(()=>{
      setLoading(true);

        loadUserData();

    },[id]);
    const loadUserData=async()=>{
        const response=await getUsers(id);
        setUsers(response.data)
        setTimeout(()=> setLoading(false),1000)
        
       
    }
    const onValueChange=(e)=>{
        
        setUsers({...user,[e.target.name]:e.target.value})
       
    }
    const editUserDetails = async() => {
      await editUsers(user,id);
      localStorage.setItem('isOpen', true);
      localStorage.setItem('message','Updated Successfully')
      localStorage.setItem('type','success')
      history('/all');
  }
    return (
      <FormGroup className={classes.container}>
        <Typography varient="h4">Edit User</Typography>
       { loading ?<CircularProgress /> : <>
      <FormControl>
      <InputLabel>Name</InputLabel>
      <Input  name='name'  value={user?.name} 
      
      
      {...register("name", { required: "Name is Required", onChange:(e) => onValueChange(e),
    })}
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
      <Input onChange={(e) => onValueChange(e)} name='username'  value={username} 
      
      {...register("username", { required: "Username is Required", onChange:(e) => onValueChange(e) })}
      onKeyUp={() => {
        trigger("username");
      }}/>
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
      }} />
          {errors.email && (
                <small style={{color:"red"}}>{errors.email.message}</small>
              )}
      </FormControl>      
      <FormControl>
      <InputLabel>Phone</InputLabel>
      <Input  name='phone'  value={phone} 
      
      {...register("phone", { required: "Phone is Required", onChange:(e) => onValueChange(e) })}
      onKeyUp={() => {
        trigger("phone");
      }}/>
      </FormControl>
      {errors.phone && (
                <small style={{color:"red"}}>{errors.phone.message}</small>
              )}
      
      <Button onClick={handleSubmit(editUserDetails)} variant="contained" color="primary"> Edit User </Button>
      </>}
      </FormGroup>
  );
  }
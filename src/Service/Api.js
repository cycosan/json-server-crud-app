import axios  from "axios";
//  const url="https://react-crud-app-sanjay.herokuapp.com/users"
const url="http://127.0.0.1:3002/users"
 
 export const getUsers=async (id)=>{
     id = id || ''
     return await axios.get(`${url}/${id}`)
 }

 export const addUsers=async (user)=>{
    return await axios.post(url,user);
}
export const editUsers=async (user,id)=>{
    return await axios.put(`${url}/${id}`,user);
}

export const deleteUsers=async (id)=>{
    return await axios.delete(`${url}/${id}`);
}
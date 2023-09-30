import { myAxios } from "./helper";

export const signUp=(user)=>{
    return myAxios
    .post('/auth/addNewUser',user)
    .then((response) => response.data);
}

export const loginUser=(loginDetails)=>{
    return myAxios.post('/auth/generateToken' , loginDetails)
    .then((response) => response.data)

}

export const getUser=(userId)=>{
    return myAxios.get(`/users/${userId}`).then(res => res.data)
}
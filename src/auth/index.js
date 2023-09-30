//is logged in if token is in localstorage

export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data == null){
        return false;
    }else{
        return true;
    }
}

//do login => set to localstorage

export const doLogin=(data,next)=>{
    localStorage.setItem("data" , JSON.stringify(data));
    next()
}

//do logout => remove from localstorage

export const doLogOut=(next)=>{
    localStorage.removeItem("data");
    next()
}


//get current user

export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else return undefined;
}

export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token
    }else{
        return null;
    }
}
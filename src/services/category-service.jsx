import { myAxios, privateAxios } from "./helper"

export const loadAllCategories=()=>{
    return myAxios.get('/categories/').then(responce => {
        return responce.data;
    })
}

export const createCategory=(category)=>{
    return privateAxios.post('/categories/',category).then(responce => {
        return responce.data;
    })
}
import { myAxios, privateAxios } from "./helper"


//create post conroller
export const createPost=(postData)=>{
    // console.log(postData);
    return privateAxios
    .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
                          .then(response => response.data)
}

export const loadDonateMoneyAPI=()=>
{
    return myAxios.get(`/payment/alldonations`).then(response => response.data)

}

export const loadAllPosts=(pageNo , pageSize)=>
{
    return myAxios.get(`/posts?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data)
}

export const loadSearchedPosts=(titleSearch,pageNo , pageSize)=>
{
    return myAxios.get(`/posts/search/${titleSearch}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => response.data)
}

//load single post of given id
export const loadPost=(postId)=>{
    return myAxios.get("/posts/"+postId).then((response) => response.data
    )
}

//create comments
export const createComment=(comment,userId,postId)=>{
    return privateAxios.post(`/user/${userId}/post/${postId}/comments`,comment).then((response) => response.data)
}

//upload post banner image
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData()
    formData.append("image",image);

    return privateAxios.post(`/posts/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(responce => {
        return responce.data;
    })
}

// get categorywise  posts

export const loadPostCategoryWise=(categoryId)=>{
    return privateAxios.get(`/category/${categoryId}/posts`).then(res => res.data)
}

export const loadPostUserWise=(userId)=>{
  return  privateAxios.get(`/user/${userId}/posts`).then(res => res.data)
}

//delete post
export function deletePostService(postId){
  return privateAxios.delete(`/posts/${postId}`).then(res => res.data)
}

//update post 
export function updatePostService(post,postId){
    return privateAxios.put(`/posts/${postId}`,post).then(res=> res.data)
}
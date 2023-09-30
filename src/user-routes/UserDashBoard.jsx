import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { AddPost } from '../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetails } from '../auth'
import { deletePostService, loadPostUserWise } from '../services/post-service'
import { toast } from 'react-toastify'
import Post from '../components/Post'

export const UserDashBoard = () => {

  const [posts, setPosts] = useState([])

  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getCurrentUserDetails())

    loadPostUserWise(getCurrentUserDetails().id).then(data => {
      console.log(data);
      setPosts([...data])
    }).catch(error => {
      console.log(error);
      toast.error("error while loading user posts..")
    })
  }, [])

 
  ///function to delete post

  function deletePost(post) {
    //goiong to delete post
    deletePostService(post.postId).then(res => {
      console.log(res)
      
      const newPostContent = posts.filter(p => p.postId != post.postId)
      setPosts([...newPostContent])
      toast.success("post is deleted....")

    }).catch(error => {
      console.log(error)
      toast.error("error while deleting post!!")
    })
  }

  return (
    <Base>

      <Container >
        <AddPost />
        <h1 className='my-3'>Posts count : {posts.length}</h1>
        {
          posts && posts.map((post, index) => {
            return (
              <Post post={post} key={index} deletePost={deletePost} />
            )
          })
        }

      </Container>

    </Base>
  )
}

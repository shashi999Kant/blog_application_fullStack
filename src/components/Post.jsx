import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import {Link} from 'react-router-dom'
import { getCurrentUserDetails, isLoggedIn } from '../auth'
import UserContext from '../context/userContext'

export default function Post({post={postId:0,title:"This is default post title" 
          , content:"Default post content"},deletePost}) {

            const userContextData = useContext(UserContext)

    const [user,setUser] =useState(null)
    const [login,setLogin] =useState(null)
    
    useEffect(()=>{
        setUser(getCurrentUserDetails());
        setLogin(isLoggedIn())
    },[])


  return (
    <div>
        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h2>{post.title}</h2>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,20)+"...."}}>
                    
                </CardText>
                <div>
                    <Link to={'/posts/'+post.postId} className='btn btn-secondary'>
                        Read more
                    </Link>
                  
                    {
                        //isLoggedIn
                        userContextData.user.login && user && user.id === post.user.id && (
                            <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>
                              Delete
                            </Button>
                          )
                    }
                    {
                        //isLoggedIn
                        userContextData.user.login && user && user.id === post.user.id && (
                            <Button color='warning' tag={Link} to={`/user/update-blog/${post.postId}`} className='ms-2'>
                              Update
                            </Button>
                          )
                    }
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

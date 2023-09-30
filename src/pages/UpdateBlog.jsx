import React from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../context/userContext'
import { useEffect } from 'react'
import { loadPost, updatePostService } from '../services/post-service'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'
import { useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { useRef } from 'react'

export default function UpdateBlog() {

    const editer = useRef(null)

    const [categories, setCategories] = useState([])

   const {blogId}= useParams()
    const object =useContext(UserContext);
    const navigate =useNavigate()
    const [post,setPost] =useState(null)

    useEffect(()=>{

        loadAllCategories().then((data) => {
            setCategories(data)
        }).catch(error => {
            console.log(error);
        })

        //load blog from databases
        loadPost(blogId).then(data=>{
            setPost({...data,categoryId:data.category.categoryId})
        })
            .catch(error=>{
                console.log(error);
                toast.error("error while loading the blog...")
            })        
    },[])

    useEffect(()=>{
        if(post){
            if(post.user.id!=object.user.data.id){
                toast.error("This is not posted by u..")
                navigate("/")
            }
        }
    },[post])

    const handleChange=(event,fieldName)=>{
                setPost({
                    ...post,
                    [fieldName]:event.target.value
                })
    }

    const updatePost=(event)=>{
        event.preventDefault();
        console.log(post);

        updatePostService({...post,category:{categoryId : post.categoryId}},post.postId).then(res =>{
            console.log(res);
            toast.success("Updated successfull...")
        })
        .catch(error =>{
            console.log(error);
            toast.error("error while uploading post😶")
        })

    }

    const updateHtml=()=>{
        return (
            
        <div className='wrapper my-4 '>

        <Card className='shadow'>
            <CardBody>
                <Container className='text-center'>
                    <h3>Update</h3>
                </Container>
                <Form onSubmit={updatePost}>
                    <div className='my-3'>
                        <Label for='title'>Post Title</Label>
                        <Input type='text' id='title' placeholder='Enter here'
                        onChange={(event)=> handleChange(event,'title')}
                        name='title'
                        value={post.title}
                        />
                    </div>
                    <div className='my-3'>
                        <Label for='content'>Post Conant</Label>
                        {/* <Input  type='textarea'  id='contant' placeholder='Enter here' style={{height:'300px'}}/> */}
                        <JoditEditor ref={editer}
                            value={post.content}
                            onChange={newContent =>setPost({...post,content:newContent})}
                            />
                    </div>

                    {/* file field */}

                    <div className='my-3'>
                        <Label for='image'>Select Post banner</Label>
                        <Input type='file' id='image'
                        name='image'
                        />
                    </div>

                    <div className='my-3'>
                        <Label for='categoryId'>Post Category</Label>
                            <Input type='select' id='categoryId' 
                                name='categoryId' 
                                onChange={(e)=>handleChange(e,'categoryId')} 
                                value={post.categoryId} >

                            <option value={0} disabled>--select category--</option>
                            {
                                categories.map((category,index) => (
                                    <option key={index} value={category.categoryId}>
                                        {category.categorytitle}
                                    </option>
                                ))
                            }

                        </Input>
                    </div>
                    <Container className='text-center' type='submit'>
                        <Button color='primary'>
                            Update
                        </Button>
                        <Button color='danger' type='reset' className='mx-3'>
                           Reset
                        </Button>
                    </Container>
                   
                </Form>
            </CardBody>
        </Card>

    </div>
        )
    }

  return (
  <Base>

      <Container>
      {post && updateHtml()}  
        </Container>  

  
  </Base>
  )
}

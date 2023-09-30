import React, { useEffect, useState, useRef } from 'react'
import { Card, CardBody, Label, Input, Form, Container, Button } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import JoditEditor from 'jodit-react'
import { createPost as doCreatePost, uploadPostImage } from '../services/post-service'
import { getCurrentUserDetails } from '../auth'
import { toast } from 'react-toastify'

export const AddPost = () => {

    const editer = useRef(null)

    const [categories, setCategories] = useState([])
 //   const [content, setContent] = useState('')

    const [user,setUser]=useState(undefined)

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image,setImage]=useState(null)

   

    useEffect(
        () => {
            setUser(getCurrentUserDetails())
            loadAllCategories().then((data) => {
                setCategories(data)
            }).catch(error => {
                console.log(error);
            })

        }, [])

        // field change function
        const fieldChange=(event)=>{
           
            setPost({...post , [event.target.name]:event.target.value})
        }

        const contentFieldChange=(data)=>{
            setPost({...post ,'content':data})
        }

        const createPost=(event)=>{
            event.preventDefault();
            if(post.title.trim==''){
                toast.error("post title is required!")
                return;
            }
            if(post.content.trim == ''){
                toast.error("post content required !!")
                return;
            }
            // if(post.categoryId.trim==''){
            //     toast.error("select category first!")
            //     return;
            // }

            //submit  form on server
            post['userId']=user.id
            doCreatePost(post).then(data =>{
               console.log("Image uploaded");
                uploadPostImage(image,data.postId).then((data) =>{
                    
                    toast.success("Image uploaded")
                }).catch(error =>{
                    toast.error("Error in uploading image")
                    console.log(error);
                })

                toast.success("post created🫡")
                setPost({...post,
                    title: '',
                    content: '',
                    categoryId:''
                })
            }).catch((error) =>{
                toast.error(error)
            })
            
        }

        //handling file change
        const handleFileChange=(event)=>{
            setImage(event.target.files[0])
            
            console.log(event.target.files[0]);
        }


    return (
        <div className='wrapper my-4 '>

            <Card className='shadow'>
                <CardBody>
                    <Container className='text-center'>
                        <h3>Whats going on your mind</h3>
                    </Container>
                    {/* {
                        JSON.stringify(post)
                    } */}
                    <Form onSubmit={createPost}>
                        <div className='my-3'>
                            <Label for='title'>Post Title</Label>
                            <Input type='text' id='title' placeholder='Enter here'
                            onChange={fieldChange}
                            name='title'
                            value={post.title}
                            />
                        </div>
                        <div className='my-3'>
                            <Label for='content'>Post Conant</Label>
                            {/* <Input  type='textarea'  id='contant' placeholder='Enter here' style={{height:'300px'}}/> */}
                            <JoditEditor ref={editer}
                                value={post.content}
                                onChange={contentFieldChange}
                                />
                        </div>

                        {/* file field */}

                        <div className='my-3'>
                            <Label for='image'>Select Post banner</Label>
                            <Input type='file' id='image'
                            onChange={handleFileChange}
                            name='image'
                            />
                        </div>

                        <div className="my-3">
                            <Label for="category" >Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                placeholder="Enter here"
                                className="rounded-0 color-red"
                                name="categoryId"
                                onChange={fieldChange}
                                defaultValue={0}

                            >

                                <option disabled value={0} >--Select category--</option>

                                {

                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categorytitle}
                                        </option>
                                    ))

                                }



                            </Input>
                        </div>
                        <Container className='text-center' type='submit'>
                            <Button color='primary'>
                                Create Post
                            </Button>
                            <Button color='danger' type='reset' className='mx-3'>
                                Create Post
                            </Button>
                        </Container>
                       
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}

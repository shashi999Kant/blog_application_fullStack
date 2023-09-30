import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Base from '../components/Base'
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap'
import { useEffect } from 'react'
import { createComment, loadPost } from '../services/post-service'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from '../services/helper'
import { getCurrentUserDetails, isLoggedIn } from '../auth'

export const PostPage = () => {

    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState({
        content: ''
    })
    const [user,setUser]=useState(undefined)

    useEffect(() => {
        setUser(getCurrentUserDetails())
        //load the post from postId
        loadPost(postId).then(data => {
            setPost(data)
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading post")
        })
    }, [])

    const printDate = (number) => {
        return new Date(number).toLocaleString();
    }

    const submitPost=()=>{
            if(!isLoggedIn()){
                toast.error("Need to login first!..")
                return
            }

        if(comment.content.trim() ==='')return
        createComment(comment,user.id,post.postId)
           .then(data =>{
            console.log(data)
            toast.success("comments added succesfully🔥")
            setPost({
                ...post,
                comment:[...post.comment,data]
            })
            setComment({
                content:''
            })
           }).catch(error =>{
            console.log(error)
           })
    }



    return (
        <Base>

            <Container>
                <Link to="/">Home</Link> / {post && (<Link to={'/categories/'+post.category.categoryId}>{post.title}</Link>)}

                <Row>
                    <Col md={{
                        size: 12
                    }}>

                        <Card className='mt-3 ps-3 shadow-sm'>


                            {
                                post && (
                                    <CardBody>
                                        <CardText>
                                            Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b>
                                            <CardText className='text-center mt-4'>
                                                <h4 className='text-mutd'>Category ➡️<strong>{post.category.categorytitle}</strong></h4>
                                            </CardText>
                                            <div style={{
                                                width: '100%',
                                                height: '1px',
                                                background: '#e2e2e2'
                                            }}></div>

                                        </CardText>
                                        <CardText className='mt-3'>
                                          <h4>Title : <b>{post.title}</b></h4>
                                        </CardText >
                                        <div className="image-container container mt-3 text-center">
                                            <img className='img-fluid' style={{maxWidth:'250px' , maxHeight:'250px'}} src={BASE_URL+"/posts/image/"+post.imageName} alt="default" />
                                        </div>
                                     <CardText className='mt-5' dangerouslySetInnerHTML={{ __html: post.content }}></CardText>
                                    </CardBody>
                                )
                            }


                        </Card>

                    </Col>
                </Row>


                <Row className='my-4'>
                    <Col md={{
                        size: 8,
                        offset: 2
                    }}>

                        <h3>Comments ( {post ? post.comment.length : 0})</h3>

                        {
                            post && post.comment.map((c, index) => (
                                <Card className='mt-4 ' key={index}>
                                    <CardBody>
                                        <CardText>
                                          <Link  to={`/user/profile-info/${c.user.id}`}> <b>{c.user.name}</b></Link>  ➡️ {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))


                        }
                    </Col>
                    <Col md={{
                        size: 10,
                        offset: 1
                    }}>
                        <Card className='mt-4 '>
                            <CardBody>

                                <Input type='textarea'
                                onChange={(event) =>setComment({content:event.target.value})}
                                value={comment.content}
                                placeholder='Enter comments'></Input>

                                <Button onClick={submitPost} color='primary mt-3'>submit</Button>

                            </CardBody>
                        </Card>
                    </Col>



                </Row>
            </Container>

        </Base>
    )
}

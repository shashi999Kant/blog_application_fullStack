import React, { useEffect, useState, useRef } from 'react'
import { Card, CardBody, Label, Input, Form, Container, Button } from 'reactstrap'
import { createCategory } from '../services/category-service'
import { toast } from 'react-toastify'
import Base from './Base'
function CreateCategory() {



    const [post, setPost] = useState({
        categorytitle: '',
        categoryDesc: ''
    })





    const submitForm = (e) => {
        e.preventDefault();


        createCategory(post).then(data => {
            console.log(data);
            console.log("success log");
            toast.success("Category is registered successfully..with user id")
            setPost({
                categorytitle: '',
                categoryDesc: ''
            })
        })
            .catch(error => {
                console.log(error);
                toast.error("Error while loading categories..")
            })

    }



    // field change function
    const fieldChange = (event) => {

        setPost({ ...post, [event.target.name]: event.target.value })
    }

    return (

        <Base>
        <Container>
            <Card className='shadow'>
                <CardBody>
                    <Container className='text-center'>
                        <h3>Create new Category</h3>
                    </Container>

                    <Form onSubmit={submitForm}>
                        <div className='my-3'>
                            <Label for='categorytitle'>Post Title</Label>
                            <Input type='text' id='categorytitle' placeholder='Enter here'
                                onChange={fieldChange}
                                name='categorytitle'
                                value={post.categorytitle}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="categoryDesc" >Post Category</Label>
                            <Input
                                type="text"
                                id="categoryDesc"
                                placeholder="Enter here"
                                className="rounded-0 color-red"
                                name="categoryDesc"
                                onChange={fieldChange}
                                value={post.categoryDesc}
                                defaultValue={0}

                            >


                            </Input>
                        </div>
                        <Container className='text-center' type='submit'>
                            <Button color='primary'>
                                Create Category
                            </Button>
                        </Container>

                    </Form>
                </CardBody>
            </Card>
            </Container>
        </Base>
    )
}

export default CreateCategory
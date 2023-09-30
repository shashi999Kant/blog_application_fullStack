import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { Button, Row, Col } from 'reactstrap'
import { signUp } from '../services/user-service'
import { toast } from 'react-toastify'

export default function Signup() {


        const [data, setData] = useState({
            
            name:'',
            email:'',
            password:'',
            about:''

        })

        const [error, setError] = useState({
            errors:{},
            isErrors:false
        })

        useEffect(() => {
         
        }, [data,error])
        

        ///handle change
        function handleChange(e,property){
            setData({...data,[property]:e.target.value}) 
        }

        //reseting the form
        function resetdata(){
            setData({
                name:'',
                email:'',
                password:'',
                about:''
    
            })
        }

        //submitting the form
        const submitForm = (e) =>{
            e.preventDefault();

            // if(error.isErrors){
            //    toast.error("Form data invalid , correct all details first..");
            //    setError({...error,isErrors:false})
            //     return ;
            // }

            //validating data

            //server data sending call api
            signUp(data).then((resp) =>{
                console.log(resp);
                console.log("success log");
                toast.success("User is registered successfully..with user id")
                setError({
                    errors:{},
                    isErrors:false
                })
                setData({
                    name:'',
                    email:'',
                    password:'',
                    about:''
        
                })
            }).catch((error) =>{
                console.log(error);
                console.log("error log");

                //handle error
                setError({
                    errors:error,
                    isErrors:true
                })

            })

        }

    return (
        <Base>

            <Container>         

                <Row>
                    <Col sm={{ size: 8, offset: 2 }}>

                        <Card outline>

                            <CardHeader>
                              <Container className='text-center'>
                              <h1 className='uppercase'>this is signup button</h1>
                              </Container>
                                <CardBody>

                                    <Form onSubmit={submitForm}>
                                        {/* name field */}
                                        <FormGroup>

                                            <Label for="name">
                                                Enter name
                                            </Label>
                                            <Input 
                                            type="text" 
                                            placeholder="Enter your name" 
                                            id='name'
                                            onChange={(e) => handleChange(e,'name')}
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}
                                            ></Input>

                                            <FormFeedback>
                                                {error.errors?.response?.data?.name}
                                            </FormFeedback>
                                        </FormGroup>

                                        {/* email field */}
                                        <FormGroup>

                                            <Label for="email">
                                                Enter email
                                            </Label>
                                            <Input type="email" value={data.email}  onChange={(e) => handleChange(e,'email')}
                                             placeholder="Enter your name" id='email'
                                             invalid={error.errors?.response?.data?.email ? true : false}
                                             ></Input>
 
                                             <FormFeedback>
                                                 {error.errors?.response?.data?.email}
                                             </FormFeedback>
                                        </FormGroup>


                                        {/* password field */}
                                        <FormGroup>

                                            <Label for="password">
                                                Your password
                                            </Label>
                                            <Input type="password" value={data.password}  onChange={(e) => handleChange(e,'password')} placeholder="Enter your name" id='password'
                                             invalid={error.errors?.response?.data?.password ? true : false}
                                             ></Input>
 
                                             <FormFeedback>
                                                 {error.errors?.response?.data?.password}
                                             </FormFeedback>
                                        </FormGroup>


                                        {/* about field */}
                                        <FormGroup>

                                            <Label for="about">
                                                About yourself
                                            </Label>
                                            <Input type="textarea" value={data.about}  onChange={(e) => handleChange(e,'about')} placeholder="Enter about yourself" id='about'
                                                style={{ height: "250px" }}
                                                invalid={error.errors?.response?.data?.about ? true : false}
                                                ></Input>
    
                                                <FormFeedback>
                                                    {error.errors?.response?.data?.about}
                                                </FormFeedback>
                                        </FormGroup>

                                        <Container className='text-center'>
                                            <Button color='dark'>Register</Button>
                                            <Button
                                            onClick={resetdata}
                                            color='secondary' type='reset' className='ms-2'>Reset</Button>
                                        </Container>

                                    </Form>

                                </CardBody>

                            </CardHeader>

                        </Card>

                    </Col>
                </Row>

            </Container>

        </Base>
    )
}

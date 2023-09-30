/* eslint-disable eqeqeq */
import {React , useContext, useState} from 'react'
import Base from '../components/Base'
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { Button, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../services/user-service'
import { doLogin } from '../auth'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/userContext'


export const Login = () => {

    const userContextData=useContext(UserContext)

    const navigete= useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    })

    const handleChange=(event,field)=>{
           let actualValue= event.target.value
           setLoginDetail({
            ...loginDetail,
            [field]:actualValue
           })
    }

    const handelReset=()=>{
        setLoginDetail({
            username: '',
            password: ''
        })
    }

    const handleSubmitdata=(e)=>{
            e.preventDefault();
        //    console.log(loginDetail);

            //validation
            if(loginDetail.username.length=='' || loginDetail.password.length==''){
                toast.error("Username or password is requiered...")
            }

            //server submission for generate token

            loginUser(loginDetail).then((data) => {
                console.log("User logged in..");
                console.log(data);
                //save the data to localstorage
                doLogin(data , ()=>{
                    console.log("Login details saved to localstorage...");
                    //redirect user to dashboard
                    userContextData.setUser({
                        data:data.user,
                        login:true
                    })
                    navigete("/user/dashboard")

                })

                toast.success("Login successfull..")
            }).catch(error => {
                console.log(error)
                
                    toast.error("username or password wrong !! try again")

               
            })
             
    }

  return (
    <Base>
        <Container>

<Row>
    <Col sm={{ size: 6, offset: 3 }}>

        <Card outline>

            <CardHeader>
              <Container className='text-center'>
              <h1 className='uppercase'>Login Here</h1>
              </Container>
                <CardBody>

                    <Form onSubmit={handleSubmitdata}>
                      
                        {/* email field */}
                        <FormGroup>

                            <Label for="email">
                                Enter Email
                            </Label>
                            <Input type="email" placeholder="Enter your name" id='email'
                            value={loginDetail.username}
                            onChange={(e)=> handleChange(e,'username')}
                            ></Input>
                        </FormGroup>


                        {/* password field */}
                        <FormGroup>

                            <Label for="password">
                                Enter password
                            </Label>
                            <Input type="password" placeholder="Enter your name" id='password'
                             value={loginDetail.password}
                             onChange={(e)=> handleChange(e,'password')}
                            ></Input>
                        </FormGroup>

                        <Container className='text-center'>
                            <Button color='dark'>Submit</Button>
                            <Button color='secondary' type='reset' onClick={handelReset} className='ms-2'>Reset</Button>
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

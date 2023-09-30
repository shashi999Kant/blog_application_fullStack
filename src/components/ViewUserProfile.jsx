import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetails } from '../auth'

const ViewUserProfile = ({ user }) => {

    const [currentUser, setCurrentUser] = useState()
    const [login, setLogin] = useState(false)

    useEffect(() => {
        setCurrentUser(getCurrentUserDetails())
        setLogin(true)
    }, [])

    return (
        <div>
            <Card className='mt-2 border-0 rounded-0 shadow-sm'>
                <CardBody>
                    <h3 className='text-uppercase'>user information</h3>

                    <Container className='text-center'>
                        <img style={{ maxWidth: '250px', maxHeight: '250px' }} src={user.image ? user.image : 'https://th.bing.com/th/id/OIP.UOtN2FKlrxetB811rtNs7AHaF0?pid=ImgDet&rs=1'} alt="user profile pic" className='rounded-circle img-fluid' />
                    </Container>

                    <Table responsive striped hover className='mt-5 text-center' bordered={true}>
                        <tbody>
                            {/* Id fields */}
                            <tr>
                                <td>
                                    BLOG ID
                                </td>
                                <td>
                                    ➡️{user.id}
                                </td>
                            </tr>
                            {/* name field */}
                            <tr>
                                <td>
                                    USER NAME
                                </td>
                                <td>
                                    👨🏻‍💻{user.name}
                                </td>
                            </tr>
                            {/* email field */}
                            <tr>
                                <td>
                                    USER EMAIL
                                </td>
                                <td>
                                    📧{user.email}
                                </td>
                            </tr>
                            {/* about fields */}
                            <tr>
                                <td>
                                    ABOUT USER
                                </td>
                                <td>
                                    👩🏻‍🎓{user.about}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ROLE
                                </td>
                                <td>
                                    🤴🏻{user.role}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {
                        currentUser && (currentUser.id == user.id) && (
                            
                            <CardFooter className='text-center'>
                                <Button color='warning'>
                                    Update profile
                                </Button>
                            </CardFooter>
                    
                        )
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default ViewUserProfile
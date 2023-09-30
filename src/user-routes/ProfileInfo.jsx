import React from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getUser } from '../services/user-service'
import { useState } from 'react'
import { Col, Row } from 'reactstrap'
import ViewUserProfile from '../components/ViewUserProfile'

export const ProfileInfo = () => {

  const [user, setUser] = useState()

  const { userId } = useParams()

  useEffect(() => {
    getUser(userId).then(data => {
      console.log(data);
      setUser({ ...data })
    })
  }, [])

  const userView = () => {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <ViewUserProfile user={user} />
         
        </Col>
      </Row>
    )
  }


  return (
    <Base>
      {user ? userView(): 'Loading user data'}

    </Base>
  )
}

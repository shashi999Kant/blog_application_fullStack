import React from 'react'
import Base from '../components/Base'
import { NewFeed } from '../components/NewFeed'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'

export default function Home() {


  return (
    <Base>
      <Container className='mt-3'>
        <Row>
          <Col md={2}>
            <CategorySideMenu />
          </Col>
          <Col md={10}>
            <NewFeed />
          </Col>
        </Row>
      </Container>
    </Base>

  )
}

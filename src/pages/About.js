import React from 'react'
import Base from '../components/Base'
import UserContext from '../context/userContext'

export const About = () => {
  return (
    <UserContext.Consumer>
      {
        (object) => (
          <Base>
            <h1>This is about page</h1>
            <h1>we are building </h1>
           
          </Base>
        )
      }
    </UserContext.Consumer>
  )
}

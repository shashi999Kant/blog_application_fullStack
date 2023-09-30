import React from 'react'
import CustomNavbar from './CustomNavbar'

export default function Base({title="welcome to blog app" , children}) {
  return (
    <div className='container-fluid p-0 m-0'>
      <CustomNavbar />


      {children}
    </div>
  )
}

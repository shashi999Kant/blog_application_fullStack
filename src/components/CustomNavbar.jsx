
import React, { useState, useEffect, useContext } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { doLogOut, getCurrentUserDetails, isLoggedIn } from '../auth';
import UserContext from '../context/userContext';
import { loadDonateMoneyAPI } from '../services/post-service';


export default function CustomNavbar() {

  const userContextData = useContext(UserContext)

  let navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false)
  const [user, setUser] = useState(undefined)

  const [donateUser , setDonateUsers]=useState(0)

  useEffect(() => {

    setLogin(isLoggedIn())
    setUser(getCurrentUserDetails())
    loadDonateMoney()

  }, [login])

  const logout=()=>{
    doLogOut(()=>{
      //logout
      setLogin(false)
      userContextData.setUser({
        data:null,
        login:false
      })
      navigate("/")
    })
  }

  const loadDonateMoney=()=>{
      loadDonateMoneyAPI().then(data => {
        setDonateUsers(data)
      })
  }


  const toggle = () => setIsOpen(!isOpen);
  return (

    <div>
      <Navbar
        color='dark'
        dark
        expand="md"
        fixed=""
        className='px-5'>

        <NavbarBrand tag={ReactLink} to="/">My Blog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">Home</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/user/createCategory">Create category</NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={ReactLink} to="/user/dashboard" className='font-weigth:bold'>New ➕</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><h3>Contact us</h3></DropdownItem>
                <DropdownItem divider />
                <DropdownItem to="/">facebook</DropdownItem>
                <DropdownItem to="/">Instagram</DropdownItem>
                <DropdownItem to="/">LinkedIn</DropdownItem>
                <DropdownItem to="/">
                  Youtube
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>



          <Nav navbar>

            {
              login && (
                <>

                  <NavItem>
                    <NavLink tag={ReactLink} to="" onClick={logout}>
                      Logout
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink  tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                      {user.name}
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink  tag={ReactLink} to={`/user/donation`}>
                      Donation ({donateUser})
                    </NavLink>
                  </NavItem>
                </>
              )
            }

            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/login">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ReactLink} to="/signup">
                      Signup
                    </NavLink>
                  </NavItem>

                </>
              )
            }



          </Nav>


        </Collapse>

      </Navbar>
    </div>
  );
}

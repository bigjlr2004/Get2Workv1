import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';


export default function Header({ isLoggedIn, role, userObj }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  return (

    <Navbar expand="md"
      className='navbar-fixed-top' >

      <NavbarBrand tag={RRNavLink} to="/"><div className="front_image ">
        <img src="https://bbcreameries.wpenginepowered.com/wp-content/uploads/2021/04/bluebell-logo-d-sh@2x-300x274.png"
          style={{ width: 200, height: 175 }} alt="Blue Bell Inception Picture"></img></div></NavbarBrand >
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>

        </Nav>
        <Nav navbar>
          {role === "Employee" &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to={`/userdetails/${userObj?.firebaseUserId}`}>Schedule</NavLink>
              </NavItem>

            </>
          }
          {role === "Manager" &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/addjob">New Job</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to="/userlist">Employees</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/storelist">Stores</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/weeklyview">Week Schedule</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/alljobs">ActiveStatus</NavLink>
              </NavItem>

            </>
          }
          {isLoggedIn &&
            <>

              <NavItem>
                <a aria-current="page" className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout()
                    navigate("/login")

                  }} >Logout</a>
              </NavItem>
            </>
          }
          {!isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">New User? / Register Here</NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>

    </Navbar >


  );
}

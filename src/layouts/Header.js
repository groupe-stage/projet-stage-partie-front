import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import Logo from "./Logo";
import { ReactComponent as LogoWhite } from "../assets/images/logos/adminprowhite.svg";
import user1 from "../assets/images/users/user4.jpg";
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;



const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null); // Store user info
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        console.log("User data:", res.data); // Log response to check structure
        setCurrentUser(res.data); // Adjust if necessary based on actual response structure
      })
      .catch(function (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setCurrentUser(null);
      });
  }, []);
  


  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(null);
      navigate('/login'); // Redirect to the login page
    }).catch(error => {
      console.error("Logout error:", error);
    });
  }

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Logo />
        </div>
        <NavbarBrand href="/">
          <LogoWhite className="d-lg-none" />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{currentUser ? `Salut, ${currentUser.user.username}` : 'Guest'}</DropdownItem>
            <DropdownItem>Mon Compte</DropdownItem>
            <DropdownItem>Modifier Profile</DropdownItem>
            <DropdownItem divider />
            <form onSubmit={submitLogout}>
              <Button type="submit" variant="light">Se déconnecter</Button>
            </form>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;

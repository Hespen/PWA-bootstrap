import React from 'react';
import PropTypes from 'prop-types';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export class LandingPage extends React.Component {
  handleSelect = (eventKey) => {
    console.log(eventKey);
  };

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight onSelect={this.handleSelect}>
            <NavItem eventKey={4} href="#">Link Right</NavItem>
            <NavItem eventKey={5} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LandingPage;

// import { Button } from 'bootstrap';
import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, ButtonGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavbarComponent = (props) => {

    const navigate = useNavigate();

    const [openCollapse, setOpenCollapse] = React.useState(false)
    const [openLoginForm, setOpenLoginForm] = React.useState(false)
    const [dropdownUsername, setDropdownUsername] = React.useState(false)

    const { users } = useSelector((state) => {
        return {
            users: state.usersReducer
        }
    })

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <span className='fw-bold'>
                        Commerce
                    </span>
                </NavbarBrand>
                <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
                <Collapse navbar isOpen={openCollapse}>
                    <Nav
                        navbar
                        className='me-auto'
                    >
                        <NavItem>
                            <Link to="/products" className='nav-link'>
                                <span>
                                    Products
                                </span>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <span className='nav-link'>
                                Promo
                            </span>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        {
                            users.username == "" ?
                                <ButtonGroup>
                                    <Button color='primary' type='button' onClick={() => setOpenLoginForm(!openLoginForm)}>Login</Button>
                                    <Button color='secondary' type='button' outline onClick={() => navigate("/register")}>Register</Button>
                                </ButtonGroup>
                                :
                                <Dropdown isOpen={dropdownUsername} toggle={() => setDropdownUsername(!dropdownUsername)}>
                                    <DropdownToggle>{users.username}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Profile</DropdownItem>
                                        <DropdownItem>Cart</DropdownItem>
                                        <DropdownItem>Transaction</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                        }
                    </NavbarText>
                </Collapse>
            </Navbar>

            <LoginForm
                openLoginForm={openLoginForm}
                setOpenLoginForm={setOpenLoginForm}
                toggleOpen={() => setOpenLoginForm(!openLoginForm)}
            />
        </div>

    )
}

export default NavbarComponent
import React from "react";
import { FormGroup, Input, Label, Button, Dropdown } from "reactstrap";
import Axios from "axios";
import { API_URL } from '../helper'
import { loginAction } from '../redux/actions/usersAction';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

const RegisterPage = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");

    const handleRegister = async () => {
        try {
            if (username == "" || email == "" || password == "" || confPassword == "") {
                alert(`Fill all the form!`)
            } else {
                if (password != confPassword) {
                    alert(`Password doesn't match`)
                } else if (email.includes("@")) {

                    let res = await Axios.post(`${API_URL}/users`, {
                        username,
                        email,
                        password,
                        role: "user",
                        cart: [],
                        status: "LoggedIn"

                    })


                    dispatch(loginAction(res.data))
                    navigate("/")

                } else {
                    alert(`Email is incorrect`)
                }

            }


        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-12 col-md-6 py-5">
                    <h4>Register Account</h4>
                    <div>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type='text' onChange={(e) => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input type='email' onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type='password' onChange={(e) => setPassword(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirmation Password</Label>
                            <Input type='password' onChange={(e) => setConfPassword(e.target.value)} />
                        </FormGroup>
                    </div>
                    <Button className="w-100" type="button" onClick={handleRegister}>Regis Now</Button>
                </div>
                <div className="col-12 d-none d-md-block col-md-6">
                    <img alt="portal" width={"100%"} src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZnVybml0dXJlfGVufDB8fDB8fA%3D%3D&w=1000&q=80
" />
                </div>
            </div>

        </div>
    )
}

export default RegisterPage
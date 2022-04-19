import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';
import Axios from "axios";
import { API_URL } from "../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginAction } from '../redux/actions/usersAction';
import { useDispatch } from 'react-redux'

const LoginForm = (props) => {

    // const [emailName, setEmailName] = React.useState([])
    // const [password, setPassword] = React.useState([])
    const [inForm, setInForm] = React.useState({
        email: "",
        password: ""
    })
    const [passwordShown, setPasswordShown] = React.useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // JAWABAN KAK ABDI
    // const [visibleForm, setVisibleForm] = React.useState({
    //     type: "password",
    //     text: "Show"
    // })
    // const handleVisible = () => {
    //     if (visibleForm.type === "password") {
    //         setVisibleForm({
    //             type: "text",
    //             text: "Hide"
    //         }) else {
    //             setVisibleForm({
    //                 type: "password",
    //                 text: "Show"
    //         }
    //     }
    // }

    const handleInput = (value, property) => {
        setInForm({ ...inForm, [property]: value })
    }

    const handleLogin = async () => {
        try {
            let filterQuery = `?email=${inForm.email}`
            let response = await Axios.get(`${API_URL}/users${filterQuery}`);


            if (response.data[0].password != inForm.password) {
                alert(`email and password is not a match`)
                console.log(response.data)
            } else if (response.data[0].password == inForm.password) {
                alert(`Login success!`)
                props.setOpenLoginForm(!props.openLoginForm)

                dispatch(loginAction(response.data[0]))

            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <Modal
                isOpen={props.openLoginForm}
                toggle={props.toggleOpen}
            >
                <ModalHeader
                // close={<button className="close" onClick={() => props.setOpenLoginForm(!props.openLoginForm)}>×</button>}
                >
                    Login with your account
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input

                                placeholder="Email"
                                type="email"
                                value={inForm.email}
                                onChange={(event) => handleInput(event.target.value, "email")}
                            // onChange={(event) => setEmailName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">
                                Password
                            </Label>
                            <InputGroup>
                                <Input
                                    placeholder="Password"
                                    type={passwordShown ? "text" : "password"}
                                    value={inForm.password}
                                    onChange={(event) => handleInput(event.target.value, "password")}
                                // onChange={(event) => setPassword(event.target.value)}
                                />
                                <InputGroupText
                                    className="btn btn-secondary"
                                    onClick={() => setPasswordShown(!passwordShown)}
                                >
                                    {passwordShown ? "Hide" : "Show"}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <a className="btn px-0 text-muted">Forgot password?</a>
                    <Button
                        color='primary'
                        className="w-100 mt-4 mb-3"
                        onClick={handleLogin}
                    // onClick={handleInput}
                    >Login</Button>
                </ModalBody>
            </Modal>
        </div >
    )
}

export default LoginForm
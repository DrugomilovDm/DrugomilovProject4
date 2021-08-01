import React, { useState, useEffect, useContext } from 'react'
import { Button, Form, Card, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Alert } from '../components/Alert';

export const AuthPage = () => {
    const { alert, setAlert, login, } = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const [form, setFrom] = useState({
        email: '', password: ''
    })
    const changeHandler = event => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            setAlert(data.message)
        } catch (e) {
            setAlert(e.message)
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            login(data.token, data.userID)
        } catch (e) { }
    }

    return (
        <>
            <Alert message={alert} />
            <div className="w-50 " >
                <Container className=" ">
                    <Form>
                        <Card className="cardStyle">
                            <Card.Header>
                            </Card.Header>
                            <Card.Body>
                                <Form.Label className="textStyle2">Email Address</Form.Label>
                                <Form.Control onChange={changeHandler} type="email" id="email" name="email" className="placeholderStyle textStyle1" placeholder="Example@email.com" />
                                <Form.Label className="textStyle2">Password</Form.Label>
                                <Form.Control onChange={changeHandler} type="password" id="password" name="password" className="placeholderStyle textStyle1" placeholder="Password" />
                                <Button disabled={loading} onClick={loginHandler} className="my-3 buttonStyle textStyle2" >войти</Button>
                                <Button onClick={registerHandler} disabled={loading} className="mx-2 buttonStyle textStyle2">регистрация</Button>
                            </Card.Body>
                        </Card>
                    </Form>
                </Container>
            </div>
        </>
    )
}
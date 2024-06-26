import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login, fetchPicture } from '../acitons/userActions'
import GoogleButton from 'react-google-button'
import {auth, provider} from '../firebase.config'
import { signInWithPopup } from 'firebase/auth'

function LoginScreen({location = {search:''}, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/home'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchPicture(userInfo.id))
            if(userInfo.isAdmin) {
                navigate('/ad-home')
            } else {
                navigate(redirect)
            }
            
        }
    }, [navigate, userInfo, redirect,dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        
    }

    const handleGoogleAuth = () => {
        signInWithPopup(auth, provider).then((data) => {
            const {email} = data.user
            setEmail(email)
            dispatch(login(email, '12345'))
        })
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
            
            <Row className='d-flex justify-content-center py-3'>
                <GoogleButton type='light' onClick={handleGoogleAuth}/>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
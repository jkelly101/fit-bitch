import React, { useContext } from 'react';
import SignUpForm from '../components/SignUpForm';
import { Col, Row, Container } from "../components/Grid";
import {Redirect} from 'react-router-dom';
import UserContext from '../utils/UserContext';

function SignUp(props){
    const {loggedIn} = useContext(UserContext);
    return (
        
        <div className="container-fluid">
            <Row>
                <Col size="md-4"></Col>
                <Col size="md-4">
                    {loggedIn && <Redirect to="/" />}
                    <h1 className="mt-3">SignUp</h1>
                    <SignUpForm className="full-page-signup" />
                </Col>
                <Col size="md-4"></Col>
            </Row>
        </div>
    )
}

export default SignUp;
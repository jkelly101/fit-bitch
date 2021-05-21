import React, { Fragment, useContext, useRef } from 'react';
// import "./style.scss";
import API from '../../utils/API';
import UserContext from '../../utils/UserContext';

function SignUpForm(props) {
    const { email, setEmail, loggedIn, setLoggedIn } = useContext(UserContext);
    const emailInput = useRef();
    const passwordInput = useRef();

    const weightInput = useRef();
    const heightInput = useRef();
    const bodyFatInput = useRef();

    let extraProps = {}
    if (props.className) {
        extraProps.className = props.className;
    }
    let emailId = props.className ? props.className + "-signup-email" : "signup-email";
    let emailHelpId = props.className ? props.className + "-signup-email-help" : "signup-email-help";
    let passwordId = props.className ? props.className + "-signup-password" : "signup-password";
    let weight = props.className ? props.className + "-signup-weight" : "signup-weight";
    let height = props.className ? props.className + "-signup-height" : "signup-height";
    let bodyFat = props.className ? props.className + "-signup-bodyFat" : "signup-bodyFat";

    const handleSubmit = event => {
        
        // if the user hits enter or hits the button, this function will fire
        event.preventDefault();
        // console.log("submit happened");
        // console.log({ email: emailInput.current.value, password: passwordInput.current.value});
        // API.testUserRouter()
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        API.signup({ 
            email: emailInput.current.value,
            password: passwordInput.current.value,
            weight: weightInput.current.value,
            height: heightInput.current.value,
            bodyFat: bodyFatInput.current.value
            })
            .then(data => {
                // console.log(data);
                setEmail(data.data.email);
                setLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <Fragment>
            { (() => {
                if (!loggedIn) {
                    return (<form {...extraProps} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor={emailId}>Email address</label>
                            <input ref={emailInput} type="email" className="form-control" id={emailId} aria-describedby={emailHelpId} />
                            <small id={emailHelpId} className="email-help-text form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor={passwordId}>Password</label>
                            <input ref={passwordInput} type="password" className="form-control" id={passwordId} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={weight}>Weight</label>
                            <input ref={weightInput} type="number" className="form-control" id={weight} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={height}>Height (Inches)</label>
                            <input ref={heightInput} type="number" className="form-control" id={height} />
                        </div>
                        <div className="form-group">
                            <label htmlFor={bodyFat}>Body Fat (%)</label>
                            <input ref={bodyFatInput} type="number" className="form-control" id={bodyFat} />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                    );
                }
                else {
                    return <h3>{email}</h3>;
                }
            })()
            }
        </Fragment>
    )
}

export default SignUpForm;
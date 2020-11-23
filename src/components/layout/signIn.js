import React,{Component} from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../actions/authActions'
import { Link,Redirect } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faLock} from '@fortawesome/free-solid-svg-icons';

import LogoARD from '../../images/LogoFooter.jpg'

class SignIn extends Component {
    state ={
        email:'',
        password:''
    }
    handleChange = (e) => {
        //console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    }
    render() {
        //return(
            {/*
            <div id="modal-login">
                <div>
                    <h4>Login</h4>

                    <form id="login-form">
                        <div>
                            <input type="email" id="login-email" required />
                            <label for="login-email">Email address</label>
                        </div>
                        <div>
                            <input type="password" id="login-password" required />
                            <label for="login-password">Your password</label>
                        </div>
                        <button >Login</button>
                    </form>
                </div>

                <div id="modal-account" >
                    <div >
                        <h4>Account details</h4><br />
                        <div class="account-details"></div>
                    </div>
                </div>

                <div >
                    <ul id="nav-mobile" >
                        <li >
                            <a href="/" data-target="modal-account">Account</a>
                        </li>
                        <li >
                            <a href="/" id="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            */}
        //console.log (this.props)
        const { authError } = this.props;//WOW!! no need to so sth like this.props.authError
        const { uid } = this.props;//WOW!! no need to so sth like this.props.authError
        console.log('uid :',uid)
        if (uid) return (<Redirect to = '/' />)
        return(
            <div className ="container-fluid contain-login">
                <div className="row contain-login-2">
                    <div className="imglogin col-5">
                        <h2>Sign In</h2>
                        <h5>Some Text here</h5>
                        <Link to="/" className="picLog"><img src={LogoARD}></img></Link>
                    </div>

                    <form onSubmit={this.handleSubmit}  className="was-validated col-7">
                        <div className="form-group row ">
                            <div className="col-12">
                                <label htmlFor="email" className='text-label'>Email</label>
                            </div>
                            <div className="col-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                                    </div>
                                    <input type="email" id="email" className="form-control " onChange={this.handleChange} required placeholder="Email"/>
                                    <div className="invalid-feedback feedback-text">
                                        Email was invalid
                                    </div>
                                    <div className="valid-feedback feedback-text">
                                        Successed
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-12">
                                <label htmlFor="password" className='text-label'>Password</label>
                            </div>
                            <div className="col-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                                    </div>
                                    <input type="password" id="password" className="form-control" onChange={this.handleChange} required placeholder="Password"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row ">
                            <div className="col-12 button-group">
                                <button className="btn col-12">Submit</button>
                                <div className = "red-text center">
                                    {authError ? <p>{authError}</p> : null}
                                </div>
                            </div>

                            <div className="textSignin col-12">
                                Forget <a href="/">Password</a> ?
                                <div>Don't have an account ? <a href="/">Signup</a></div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError : state.auth.authError,
        uid : state.firebase.auth.uid
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
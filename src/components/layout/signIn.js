import React,{Component} from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../actions/authActions'
import { Link,Redirect } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser,faLock,faRegistered} from '@fortawesome/free-solid-svg-icons';

import LogoARD from '../../images/LogoFooter.jpg'
import { render } from '@testing-library/react';



class SignIn extends Component {
    state ={
        email:'',
        password:'',
        overlayInfo:'',
        mobile1:'switch-unactive',
        mobile2:'switch-active'
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

    slideEvent = (e) => {
        e.preventDefault();
        if(this.state.overlayInfo === "-active"){
            this.setState({overlayInfo:"-disable"});
        }else {
            this.setState({overlayInfo:"-active"});
        }
    }

    switchRegister = () =>{
        this.setState({mobile1:"switch-active"});
        this.setState({mobile2:"switch-unactive"});
    }

    switchLogin = () =>{
        this.setState({mobile1:"switch-unactive"});
        this.setState({mobile2:"switch-active"});
    }

    switchButtonGroup = () =>{
        return(
            <div className="switchLoginBtn">
                <div onClick={this.switchLogin} className="switchButton">Login</div>
                <Link to="/"><div className="switchButton">Home</div></Link>
                <div onClick={this.switchRegister} className="switchButton">Regis</div>
            </div>
        )
    }
    registered = () =>{
        return(
            <form  className={`col-12 col-lg-6 ${this.state.mobile1} overlay-form overlay-form-1 overlay-form-1${this.state.overlayInfo} was-validated`}>
                {this.switchButtonGroup()}
                <h1>Register</h1>
                <div className="form-group row ">
                    <div className="col-12">
                        <label htmlFor="email-signup" className='text-label'>Email</label>
                    </div>
                    <div className="col-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon icon={faUser}/></span>
                            </div>
                            <input type="email" id="email-signup" className="form-control " required placeholder="Email"/>
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
                        <label htmlFor="password-signup" className='text-label'>Password</label>
                    </div>
                    <div className="col-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                            </div>
                            <input type="password" id="password-signup" className="form-control" required placeholder="Password"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row mt-4">
                    <div className="col-12">
                        <label htmlFor="code" className='text-label'>Code</label>
                    </div>
                    <div className="col-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FontAwesomeIcon icon={faLock}/></span>
                            </div>
                            <input type="text" id="code" className="form-control" required placeholder="Code for registered"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row ">
                    <div className="col-12 button-group">
                        <button className="btn col-12">Sign Up</button>
                    </div>
                </div>
            </form>
        )
    }

    overLay = () =>{
        return(
            <div className={`col-0 col-lg-6 hidden overlay-info overlay-info${this.state.overlayInfo}`} >
                <div className= {`overlay-info-signup overlay-info-signup${this.state.overlayInfo}`}>
                    <button className="btn btn-danger" onClick={this.slideEvent}>Sign Up</button>
                    <h5>Enter your personal details and start journey with us</h5>
                    <Link to="/" className="picLog"><img src={LogoARD}></img></Link>
                </div>
                <div className={`overlay-info-signin overlay-info-signin${this.state.overlayInfo}`}>
                    <button className="btn btn-danger" onClick={this.slideEvent}>Sign In</button>
                    <h5>To keep connected with us please login with your personal info</h5>
                    <Link to="/" className="picLog"><img src={LogoARD}></img></Link>
                </div>
            </div>
        )
    }

    signIn = () =>{
        const { authError } = this.props;//no need to so sth like this.props.authError
        return(
            <form onSubmit={this.handleSubmit}  className={`col-12 col-lg-6 ${this.state.mobile2} overlay-form overlay-form-2${this.state.overlayInfo} was-validated `}>
                {this.switchButtonGroup()}
                <h1>Login</h1>
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
                        <button className="btn col-12">Sign In</button>
                        <div className = "red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                    <div className="textSignin col-12">
                        Forget <a href="/">Password</a> ?
                    </div>
                </div>
                
            </form>
        )
    }

    render() {

        //console.log (this.props)
        const { uid } = this.props;
        console.log('uid :',uid)
        if (uid) return (<Redirect to = '/' />)

        return(
            <div className ="container-fluid contain-login">
                <div className="row  contain">
                    {this.registered()}
                    {this.overLay()}
                    {this.signIn()}
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

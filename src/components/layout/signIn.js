import React,{Component} from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../actions/authActions'
import { Redirect } from 'react-router-dom'

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
            <div className ="container">
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className = "red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
                </form>
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
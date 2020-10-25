import React,{Component} from 'react';

class signIn extends Component {
    render() {
        return(
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
        )
    }
}

export default signIn;
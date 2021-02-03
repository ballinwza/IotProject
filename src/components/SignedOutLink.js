import React,{Component}  from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
//use Link to prevent refresh page(default when we use a href)
//NavLink tell us which one is active
import LogoARD from '../images/ARDLogo1.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

class SignedOutLink extends Component {
    // Redirect to about after 2 seconds
    /*setTimeout(()=>{
        props.history.push('/about')
    },2000)*/

    constructor(props){
        super(props);
        this.state = {
            menuState: 'mobileDisable'
        }
    }

    showMenu = (e)=>{
        e.preventDefault();
        if(this.state.menuState === 'mobileMenuOut'){
            this.setState({menuState:'mobileDisable'});
        }else{
            this.setState({menuState:'mobileMenuOut'});
        }
    }

    backHome = () =>{
        this.setState({menuState: 'refresh'})
    }


    render(){
        return(
            <nav className="navbar navbar-expand-md">
                <Link to='/' className="navbar-brand">
                    <div className="logo-content">
                        <img src={LogoARD} ></img> 
                    </div>
                </Link>

                <div className="menubarToggleBtn" onClick={this.showMenu} role="button">
                    <FontAwesomeIcon className="bars" icon={faBars}/>
                </div>

                <div className="collapse navbar-collapse " id={`${this.state.menuState}`}>
                    <ul className="navbar-nav">
                        <li className="nav-item" onClick={this.backHome}>
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        
                        <li className="nav-item" onClick={this.backHome}>
                            <Link to='/contact' className="nav-link">Contact</Link>
                        </li>
        
                        <li className="nav-item" onClick={this.backHome}>
                            <Link to='/signin' className="nav-link">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
        )
    }
}
export default SignedOutLink
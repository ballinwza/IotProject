import React  from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
//use Link to prevent refresh page(default when we use a href)
//NavLink tell us which one is active
const SignedOutLink =(props) =>{
    // Redirect to about after 2 seconds
    /*setTimeout(()=>{
        props.history.push('/about')
    },2000)*/
    return(
        <div className="collapse navbar-collapse " id="navbarMenu">
            <ul className="navbar-nav">
                <li className="nav-item ">
                    <Link to='/' className="nav-link">Home</Link>
                </li>

                <li className="nav-item">
                    <Link to='/product' className="nav-link" >Products</Link>
                </li>
                <li className="nav-item">
                    <Link to='/service' className="nav-link" >Sevices</Link>
                </li>

                <li className="nav-item">
                    <Link to='/contact' className="nav-link" href="/">Contact</Link>
                </li>

                <li className="nav-item ">
                    <Link to='/signin' className="nav-link">Login</Link>
                </li>
            </ul>
        </div>
    )
}
export default SignedOutLink
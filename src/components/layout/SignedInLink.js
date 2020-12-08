import React  from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions'
//use Link to prevent refresh page(default when we use a href)
//NavLink tell us which one is active
const SignedInLink =(props) =>{
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

                        <li className="nav-item" >
                            <Link to='/userInfo' className='nav-link'>ชื่อผู้ใช้</Link>
                        </li>

                        <li className="nav-item">
                            <li><a onClick={props.signOut} className="nav-link">Log Out</a></li>  {/* ถ้าทำเป็น Link ได้เปลี่ยนเป็น Link */}
                        </li>
                    </ul>
                </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}
export default connect(null,mapDispatchToProps)(SignedInLink)
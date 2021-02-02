import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import SignedInLink from './layout/SignedInLink'
import SignedOutLink from './layout/SignedOutLink'
import { connect } from 'react-redux'

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons";

// <li><Link to='/service' className="text-link">Service</Link></li>

class Header extends Component {
    render() { 
        const {auth} = this.props
        const link = auth.uid ? <SignedInLink/> : <SignedOutLink/>
        return(
            <div className="ContainerHeader">
                {link}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    console.log(state);
    return{
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(withRouter(Header));
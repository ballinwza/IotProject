import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom'

import PatientList from '../displayFirebase/pages/PatientList';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronCircleLeft,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/LogoFooter.jpg';
import { connect } from 'react-redux'

class UserInfo extends Component {
    state = {
        sideBar:'',
        column1:'width-md-20',
        column2:'width-md-80',
        arrow:''
    }
    showSidebar = () =>{
        if(this.state.sideBar === ''){
            this.setState({sideBar: 'hidden'});
            this.setState({column1: 'width-0'});
            this.setState({column2: 'width-100'});
            this.setState({arrow: 'active'});
        } else{
            this.setState({sideBar: ''});
            this.setState({column1: 'width-md-20'});
            this.setState({column2: 'width-md-80'});
            this.setState({arrow: ''});
        }
    }
    render(){
        const { uid } = this.props;
        if (!uid) return (<Redirect to = '/' />)
        return(
            <div className="container-fluid"> 
                <div className="userInfo-container">
                    <div className="row">
                        <div className={`${this.state.column1}`}>
                            <div className={`sideBar-userInfo ${this.state.sideBar}`}>
                                <div className="img-content"><img src={Logo} /></div>
                                <div className="text-content">
                                    <div className="text">ARDTech</div>
                                </div> 
                            </div>
                        </div>
    
                        <div className={`${this.state.column2}`}>
                            <div className="tableInfo">
                                <div className="userInfo-icon">
                                    <div className={`icon iconArrow ${this.state.arrow}`}><Link onClick={this.showSidebar} ><FontAwesomeIcon icon={faChevronCircleLeft}/></Link></div>
                                    <div className="text">Patients List</div>
                                    <div className="icon"><Link to="/register">Add <FontAwesomeIcon icon={faPlusCircle}/></Link></div>
                                </div>
                
                                <div className="PatientContainer">
                                    <PatientList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(UserInfo) ;
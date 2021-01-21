import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHospitalUser,faUserPlus} from '@fortawesome/free-solid-svg-icons';
import Logo from '../../images/LogoFooter.jpg';
import { connect } from 'react-redux'

class userInfo extends Component {
    render(){
        const { uid } = this.props;
        if (!uid) return (<Redirect to = '/' />)
        return(
            <div className="container-fluid userInfo-container"> 
                <div className="row">
                    <div className="col-12 row-1">
                        <div className="img-content"><img src={Logo} /></div>
                        <div className="text-content">
                            <div>ชื่อ</div>
                            <div>นามสกุล</div>
                            <div>ตำแหน่ง</div>
                            <div>โรงพยาบาล</div>
                        </div>
                    </div>

                    <div className="col-12 row-2">
                        <Link className="icon" to="/patientlist"><FontAwesomeIcon icon={faHospitalUser}/></Link>
                        <Link className="icon" to="/register"><FontAwesomeIcon icon={faUserPlus}/></Link>
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

export default connect(mapStateToProps)(userInfo) ;
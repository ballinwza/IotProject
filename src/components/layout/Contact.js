import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserTie, faMobileAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import GoogleApiWrapper from '../GoogleApiWrapper';


class Contact extends Component {
    render() {
        const { uid } = this.props;
        console.log('uid :',uid)
   
        return(
            <div className="container">
                <div className="mainContact">
                    <div className="row">
                        <div className="col-12">
                            หัวข้อ
                        </div>  
                        <div className="col-6">
                            <FontAwesomeIcon className={`arrowIcon`} icon={faEnvelope}/>
                            surakit_ardt@hotmail.com
                        </div>
                        <div className="col-6">
                            <FontAwesomeIcon className={`arrowIcon`} icon={faEnvelope}/>
                            ardtech.ardt@gmail.com
                        </div>
                        <div className="col-6">
                            <FontAwesomeIcon className={`arrowIcon`} icon={faUserTie}/>
                            Surakit Khaoprew / สุรกิจ ขาวแผ้ว
                        </div>
                        <div className="col-6">
                            <FontAwesomeIcon className={`arrowIcon`} icon={faMobileAlt}/>
                            086-089-1061
                        </div>
                        <div className="col-6">
                            <FontAwesomeIcon className={`arrowIcon`} icon={faPhoneAlt}/>
                            02-077-7031
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <GoogleApiWrapper/>
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

export default connect(mapStateToProps)(Contact) ;
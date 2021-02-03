import React,{Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import ServiceItem from '../components/ServiceItem';


class Service extends Component {
    render() {
        const { uid } = this.props;
        console.log('uid :',uid)

        return(
            <div className="container"> 
                <ServiceItem mainHead="TRAINNING" content="ใส่ข้อความ และเลือกรูปอะไรก็ได้"/>
                <ServiceItem mainHead="RADIATION SAFETY CONSULTANT" content="ใส่ข้อความ และเลือกรูปอะไรก็ได้"/>
                <ServiceItem mainHead="REPAIR & CALIBRATION" content="ใส่ข้อความ และเลือกรูปอะไรก็ได้"/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}
export default connect(mapStateToProps)(Service);
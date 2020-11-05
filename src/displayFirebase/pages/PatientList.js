import React, {Component} from 'react';
import {Link} from "react-router-dom";
import firebaseApp from '../firebaseConnection/firebase';


class PatientList extends Component{

    constructor(props){
        super(props);
        this.state = {data : new Array()};
        this.queryDataFromDocs();
    }

    componentDidUpdate(){
        console.log("update");
    }

    showPatient(){
        console.log(this.state);
        if (this.state.data) {
            return this.state.data.map((patient, index) => (
                <div className="row" key={index}>
                    <div className="col-md-2"><Link to={this.plusString(patient)}>{patient.name}</Link></div>
                    <div className="col-md-1">{patient.date}</div>
                    <div className="col-md-1">{patient.time}</div>
                    
                </div>
            ));
        }
    }

    plusString(patient){
        let params = "/patient?";
        params += "uuid=" + patient.uuid + "&";
        params += "name=" + patient.name + "&";
        params += "activity=" + patient.activity + "&";
        params += "date=" + patient.date + "&";
        params += "time=" + patient.time + "&";
        params += "qr=" + patient.qr;
        return params;
    }

    queryDataFromDocs(){
        this.state = {data : new Array()};
        const impDatabase = firebaseApp.database();
        const db = impDatabase.ref("1jIr0RVcDy9q-wbXIWJ7gRFLTDOmbJ7QW4oo_VbhyngI/Firebase data").once('value');
        db.then((snapshot) => {
            const dbArray = Object.values(snapshot.val());
            dbArray.map((value) => {
                this.setState({data : [...this.state.data, value]});
            })
        });
        
    }

    

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 text-center">ชื่อ-นามสกุล</div>
                    <div className="col-md-1">วันที่</div>
                    <div className="col-md-1">เวลา</div>
                </div>
                {this.showPatient()}
            </div>
        )
        
    }
}

export default PatientList;
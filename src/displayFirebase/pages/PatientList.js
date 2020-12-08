import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import {sortFunctionByLastestDate} from '../myCustomModules/sortFunction';
import {getDateDayDifferent ,  setDateFormat, setTimeFormat} from '../myCustomModules/dateFunction';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class PatientList extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.myDate = new Date().toLocaleDateString('th', myDateFormat);
        this.queryPatientData();
    }

    async queryPatientData (){
        const cloudFireStore = firebaseApp.firestore();
        const patientCollection = cloudFireStore.collection("patients");
        const measurementCollection = cloudFireStore.collection("dose_measurement");
        await patientCollection.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                var dateTimeArray = [];
                this.setState({
                    [doc.id] : {
                        uuid : doc.id,
                        name : doc.data().name,
                        age : doc.data().age,
                        gender : doc.data().gender,
                        activity : doc.data().dose,
                        date : doc.data().date,
                        time : setTimeFormat(doc.data().time),
                        lastestDate : doc.data().date,
                        lastestTime : setTimeFormat(doc.data().time),
                    }
                });
                //this.queryMeasurementData(doc.id);
                measurementCollection.where("uuid","==",doc.id).onSnapshot((snapshot2) => {
                    if (!snapshot2.empty){
                        snapshot2.forEach((doc2) => {
                            dateTimeArray = [...dateTimeArray, doc2.data().date_time.split(" ")].sort().reverse();
                        })
                        this.setState({
                            [doc.id] : {
                                uuid : doc.id,
                                name : doc.data().name,
                                age : doc.data().age,
                                gender : doc.data().gender,
                                activity : doc.data().dose,
                                date : doc.data().date,
                                time : setTimeFormat(doc.data().time),
                                lastestDate : setDateFormat(dateTimeArray[0][0]),
                                lastestTime : setTimeFormat(dateTimeArray[0][1]),
                            }
                        });
                    }
                });


            });
        });
    }
    


    showPatient(){
        const arr = Object.values(this.state).sort(sortFunctionByLastestDate);
        if (arr !== undefined) {
            return arr.map((patient, index) => (
                <div className="row" key={index}>
                    <div className={this.getStatusColor(patient)}>{this.getStatus(patient)}</div>
                    <div className="col "><Link to={this.getGETParamString(patient)}>{patient.name}</Link></div>
                    <div className="col text-center">{patient.lastestDate}</div>
                    <div className="col text-center">{patient.lastestTime}</div>
                </div>
            ));
        }
    }

    getStatus (value) {
        var diff = getDateDayDifferent(value.lastestDate, this.myDate);
        if (userTest.find(element => element === value.name)) {
            return "Test User";
        }
        else if (diff > 3) {
            return "Inactive";
        }
        else{
            return "Active";
        }
    }

    getStatusColor(patient) {
        var cName = "col ";
        switch (this.getStatus(patient)){
            case "Active":
                cName += "text-center table-success";
                break;
            case "Inactive":
                cName += "text-center table-danger";
                break;
            case "Test User":
                cName += "text-center table-warning";
                break;
            defaults:
                cName = "col-md-1 text-center"
                break;
        }
        return cName;
    }

    getGETParamString(patient){
        let params = "/patient?";
        params += "uuid=" + patient.uuid + "&";
        params += "name=" + patient.name + "&";
        params += "gender=" + patient.gender + "&";
        params += "activity=" + patient.activity + "&";
        params += "date=" + patient.date + "&";
        params += "time=" + patient.time;
        return params;
    }

    render(){
        console.log(this.state);
        const { uid } = this.props;//WOW!! no need to so sth like this.props.authError
        if (!uid) return (<Redirect to = '/' />)
        return(
            <div className="container patientlist-table">
                <div className="row">
                    <div className="col col-header bg-dark">Status</div>
                    <div className="col col-header bg-dark">Name</div>
                    <div className="col col-header bg-dark">Lastest Date</div>
                    <div className="col col-header bg-dark">Lastest Time</div>
                </div>
                
                {this.showPatient()}
                <p />
                <p />
            </div>
        )
        
    }
}

const myDateFormat = {
    day : 'numeric',
    month : 'numeric',
    year : 'numeric',
}

const userTest = [
    "ธราดร อุราสุข",
    "ฉัตรบุษกร ขาวแผ้ว",
    "ศิรสิทธิ์ ศรีใส",
    "สุรกิจ ขาวแผ้ว",
    "นันทัชพร นันทปิยะวรรณ",
    "SALSA",
]


const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(PatientList);
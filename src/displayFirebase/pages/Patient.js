import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import {firestore} from 'firebase';
import queryString from 'query-string'
import {sortFunctionByDateTime} from '../myCustomModules/sortFunction';
import {setDateTimeFormat} from '../myCustomModules/dateFunction';
import qrImage from '../myCustomModules/qrImage';
import saveExcel from '../myCustomModules/saveExcel';
import saveImage from '../myCustomModules/saveImage';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LineChart from '../myCustomModules/LineChart';
import { type } from 'jquery';
//pop-up
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";
import updateFirestore from '../../actions/updatePatientAction'


class Patient extends Component {
    state = {
        leftColHeader:this.props.leftColHeader
    }
    getParams(){
        let url = this.props.location.search;
        let params = queryString.parse(url);
        if (this.state.leftColHeader.name == null) {
            this.setState({
                leftColHeader:{
                    name:params.name,
                    gender:params.gender,
                    date:'',
                    time:'',
                    activity:'',
                    uuid:params.uuid
                }
            })
        }
        return params;
    }
    handleSubmitPopup = (updatedState) => {
        //change state
        console.log("handleChangePopup:",updatedState)
        this.setState(prevState => {
            let leftColHeader = { ...prevState.leftColHeader };  // creating copy of state variable jasper
            leftColHeader.date = updatedState.date;                     // update the name property, assign a new value                 
            leftColHeader.time = updatedState.time; 
            leftColHeader.activity = updatedState.activity; 
            console.log(leftColHeader)
            return { leftColHeader };                                 // return new object jasper object
          })

        //update firebase
        let uuid = this.state.leftColHeader.uuid
        const data = updatedState;
        console.log(uuid,data)
        this.props.updateFirestore(uuid,data,firebaseApp);
    }
    componentDidMount(){
        this.queryDataFromFireStore();
        this.queryPatientDataFromFireStore()
    }
    queryDataFromFireStore(){
        const fs = firebaseApp.firestore();
        const db = fs.collection("dose_measurement");
        const query = db.where("uuid", "==", this.getParams().uuid);
        query.onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({[doc.data().date_time] : doc.data().dose_rate});
            })
        });
    }
    queryPatientDataFromFireStore(){
        const fs = firebaseApp.firestore();
        const db = fs.collection("patients");
        const query = db.doc(this.getParams().uuid);
        query.onSnapshot((doc) => {
            if (doc.data()!=null){
                this.setState(prevState => {
                    let leftColHeader = { ...prevState.leftColHeader };  // creating copy of state variable jasper
                    leftColHeader.date = doc.data().date;                     // update the name property, assign a new value                 
                    leftColHeader.time = doc.data().time;  
                    leftColHeader.activity = doc.data().activity;  
                    return { leftColHeader };                                 // return new object jasper object
                })
            }
        });
    }

    RegisteredData(){
        const { uid } = this.props;//WOW!! no need to so sth like this.props.authError
        if (!uid) return (<Redirect to = '/' />)
        //pop-up
        let leftColHeader = this.state.leftColHeader

        return(
            <div className="col-12 col-md-6">
                <div className="registerData-container">
                    <div className="headHighlight"> Registered Data </div>
                    <div className="detail">
                        <div className="row textContain">
                            <div className="col-2 head">ชื่อ</div>
                            <div className="col-10">{leftColHeader.name}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">เพศ</div>
                            <div className="col-10">{leftColHeader.gender}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">date</div>
                            <div className="col-10">{leftColHeader.date}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">time</div>
                            <div className="col-10">{leftColHeader.time}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">activity</div>
                            <div className="col-10">{leftColHeader.activity} mCi</div>
                        </div>
                        <div className="card-body">
                            <button className="btn-download" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">
                            <FontAwesomeIcon icon={faEdit} />
                            Update
                            </button>
                        </div>
            
            
                        <br/>
                    </div>
                     <Popup previousData={this.state.leftColHeader} handleChange={this.handleChangePopup} handleSubmit={this.handleSubmitPopup}/>
                    {this.QRCode()}
                </div>
            </div>
        )
    }

    QRCode(){
        return (
            <div className="row">
                <img class="mx-auto" id="qr-img" src={qrImage(this.getParams().uuid)} ></img>
                <div className="col-12">
                    <div className="btn-download"><button onClick={() => saveImage(qrImage(this.getParams().uuid), this.getParams().name)}>Save QR Code Image (.png)</button></div>
                    <div className="btn-download"><button onClick={() => saveExcel(this.state, this.getParams())}>Save as Microsoft Excel (.csv)</button></div>
                </div>
            </div>
        )
    }

    GraphData(){
        return (
            <div className="col-12 col-md-6">
                <div className="registerData-container">
                    <div className="headHighlight"> Graph Data </div>
                    <LineChart data={this.state} params={this.getParams()}/>
                </div>
            </div>
        )
    }

    MeasuredData(){
        return(
            <div className="col-12">
                <div className="Measured-container">
                    <div className="row">
                        <div className="col-2 col-md-1 headTable"> index </div>
                        <div className="col headTable"> date </div>
                        <div className="col headTable"> time </div>
                        <div className="col headTable"> dose rate </div>
                    </div>
                    {this.showPatient()}
                </div>
            </div>
        )
    }

    showPatient(){
        if (this.state !== null && this.state !== undefined){
            let dbArray = Object.entries(this.state).filter(dbArray => dbArray[0] != "leftColHeader").sort(sortFunctionByDateTime).reverse();
            return dbArray.map((patient, index) => (
                <div className="row" key={index}>
                    <div className="col-2 col-md-1 detailTable">{index + 1}</div>
                    <div className="col detailTable">{setDateTimeFormat(patient[0])[0]}</div>
                    <div className="col detailTable">{setDateTimeFormat(patient[0])[1]}</div>
                    <div className="col detailTable">{patient[1]}</div>
                </div>
            ));
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <p><Link exact to="/patientsortedlist"></Link></p>
                <div className="row">
                    {this.RegisteredData()}
                    {this.GraphData()}
                    {this.MeasuredData()}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid,
        leftColHeader : state.patient
        
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        updateFirestore: (id, data,firebaseApp) => dispatch(updateFirestore(id, data,firebaseApp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Patient);

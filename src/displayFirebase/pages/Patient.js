import React, {Component, useState} from 'react';
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
import '../style2.css';
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
        //console.log("url: ",this.props.location.search)
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

    leftCol(){
        const { uid } = this.props;//no need to so sth like this.props.authError
        if (!uid) return (<Redirect to = '/' />)
        //pop-up
        let leftColHeader = this.state.leftColHeader
        
        return (
        <div className="col col-md">
            <div className="row h1 text-light font-weight-bold bg-primary pl-2">{/*this.getParams().name*/}</div>
            <div className="row-highlight"> Registered Data </div>
            <div className="row">
                <div className="col-3">ชื่อ</div>
                <div className="col-9">{leftColHeader.name}</div>
            </div>
            <div className="row">
                <div className="col-3">เพศ</div>
                <div className="col-9">{leftColHeader.gender}</div>
            </div>
            <div className="card">
                <div className="row">
                    <div className="col-3">Date</div>
                    <div className="col-9">{leftColHeader.date}</div>
                </div>
                <div className="row">
                    <div className="col-3">Time</div>
                    <div className="col-9">{leftColHeader.time}</div>
                </div>
                <div className="row">
                    <div className="col-3">Activity</div>
                    <div className="col-9">{leftColHeader.activity} mCi</div>
                </div>
                <div className="card-body">
                    <button className="btn-download" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">
                        <FontAwesomeIcon icon={faEdit} />
                         Update
                    </button>
                </div>
            </div>
            <Popup previousData={this.state.leftColHeader} handleChange={this.handleChangePopup} handleSubmit={this.handleSubmitPopup}/>
            <br/>
    
            <div className="row-highlight"> Measured Data </div>
            <div className="row">
                <div className="col text-center table-secondary"> Index </div>
                <div className="col text-center table-secondary"> Date </div>
                <div className="col text-center table-secondary"> Time </div>
                <div className="col text-center table-secondary"> Dose rate </div>
            </div>
            {this.showPatient()}
            <p />
            <div className="row-highlight"> Graph Data </div>
            <LineChart data={this.state} updatedParams={this.getParams()}/>
        </div>
        )
    }
    
    rightCol(){
        return (
            <div className="col col-md">
                <div className="row-highlight"> Registered QR Code </div>
                <img className="mx-auto d-block" src={qrImage(this.getParams().uuid)} ></img>
                <div className="row-highlight"> Save Data </div>
                <p />
                <div className="row">
                    <div className="col">
                        <button className="btn-download" onClick={() => saveImage(qrImage(this.getParams().uuid), this.getParams().name)}>Save QR Code Image (.png)</button>
                    </div>
                    <div className="col">
                        <button className="btn-download" onClick={() => saveExcel(this.state, this.getParams())}>Save as Microsoft Excel (.csv)</button>
                    </div>
                </div>
                
                <p />
                <p />
            </div>
        )
    }
    
    showPatient(){
        if (this.state !== null && this.state !== undefined){
            let dbArray = Object.entries(this.state).filter(dbArray => dbArray[0] != "leftColHeader").sort(sortFunctionByDateTime).reverse();
            return dbArray.map((patient, index) => (
                
                    <div className="row" key={index}>
                        <div className="col text-center">{index + 1}</div>
                        <div className="col text-center">{setDateTimeFormat(patient[0])[0]}</div>
                        <div className="col text-center">{setDateTimeFormat(patient[0])[1]}</div>
                        <div className="col text-center">{patient[1]}</div>
                    </div>
            
            ));
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <p><Link exact to="/patientsortedlist"></Link></p>
                <div className="row">
                    {this.leftCol()}
                    {this.rightCol()}
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

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

        )
    }

    GraphData(){
        return (

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
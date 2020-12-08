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

class Patient extends Component {

    getParams(){
        let url = this.props.location.search;
        let params = queryString.parse(url);
        return params;
    }

    componentDidMount(){
        this.queryDataFromFireStore();
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

    leftCol(){
        const { uid } = this.props;//WOW!! no need to so sth like this.props.authError
        console.log('uid :',uid);
        if (!uid) return (<Redirect to = '/' />)
        return (
        <div className="col col-md">
            <div className="row h1 text-light font-weight-bold bg-primary pl-2">{/*this.getParams().name*/}</div>
            <div className="row-highlight"> Registered Data </div>
            <div className="row">
                <div className="col-3">ชื่อ</div>
                <div className="col-9">{this.getParams().name}</div>
            </div>
            <div className="row">
                <div className="col-3">เพศ</div>
                <div className="col-9">{this.getParams().gender}</div>
            </div>
            <div className="row">
                <div className="col-3">date</div>
                <div className="col-9">{this.getParams().date}</div>
            </div>
            <div className="row">
                <div className="col-3">time</div>
                <div className="col-9">{this.getParams().time}</div>
            </div>
            <div className="row">
                <div className="col-3">activity</div>
                <div className="col-9">{this.getParams().activity} mCi</div>
            </div>
            <p />
    
            <div className="row-highlight"> Measured Data </div>
            <div className="row">
                <div className="col text-center table-secondary"> index </div>
                <div className="col text-center table-secondary"> date </div>
                <div className="col text-center table-secondary"> time </div>
                <div className="col text-center table-secondary"> dose rate </div>
            </div>
            {this.showPatient()}
            <p />
            <div className="row-highlight"> Graph Data </div>
            <LineChart data={this.state}params={this.getParams()}/>
        </div>
        )
    }

    rightCol(){
        return (
            <div className="col col-md">
                <div className="row-highlight"> Registered QR Code </div>
                <img class="mx-auto d-block" src={qrImage(this.getParams().uuid)} ></img>
                <div className="row-highlight"> Save Data </div>
                <p />
                <div className="row">
                    <div className="col">
                        <button className="btn-download" onClick={() => saveImage(qrImage(this.getParams().uuid))}>Save QR Code Image (.png)</button>
                    </div>
                    <div className="col">
                        <button className="btn-download" onClick={() => saveExcel(this.state)}>Save as Microsoft Excel (.csv)</button>
                    </div>
                </div>
                
                <p />
                <p />
            </div>
        )
    }

    showPatient(){
        if (this.state !== null && this.state !== undefined){
            let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime).reverse();
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
                <p><Link exact to="/patientlist" className="btn btn-danger">back</Link></p>
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
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(Patient);
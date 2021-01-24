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

    RegisteredData(){
        const { uid } = this.props;//WOW!! no need to so sth like this.props.authError
        if (!uid) return (<Redirect to = '/' />)
        return(
            <div className="col-12 col-md-6">
                <div className="registerData-container">
                    <div className="headHighlight"> Registered Data </div>
                    <div className="detail">
                        <div className="row textContain">
                            <div className="col-2 head">ชื่อ</div>
                            <div className="col-10">{this.getParams().name}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">เพศ</div>
                            <div className="col-10">{this.getParams().gender}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">date</div>
                            <div className="col-10">{this.getParams().date}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">time</div>
                            <div className="col-10">{this.getParams().time}</div>
                        </div>
                        <div className="row textContain">
                            <div className="col-2 head">activity</div>
                            <div className="col-10">{this.getParams().activity} mCi</div>
                        </div>
                    </div>
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
            let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime).reverse();
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
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(Patient);
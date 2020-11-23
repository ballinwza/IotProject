import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import {firestore} from 'firebase';
import queryString from 'query-string'
import {sortFunctionByDateTime} from '../myCustomModules/sortFunction';
import {setDateFormat, setDateTimeFormat} from '../myCustomModules/dateFunction';
import qrImage from '../myCustomModules/qrImage';
import graphImage from '../myCustomModules/graphImage';
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

    /*getImageSource(){
        //let uuid = this.getParams().uuid;
        //return "https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=" + uuid;
        return axios.getUri({
            params : {
                cht : 'qr',
                chs : '220x220',
                chl : this.getParams().uuid,
            },
            url : 'https://chart.googleapis.com/chart',
            method : 'get',
        })
    }

    getGraphSource(){
        if (this.state){
            let xAxis = [];
            let yAxis = [];
            let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime).reverse();
            dbArray.map((patient, index) => {
                xAxis.push(index + 1);
                yAxis.push(patient[1]);
            });
            const xMax = Math.max(...xAxis);
            const yMax = Math.max(...yAxis);
            console.log(xAxis , yAxis);
            return axios.getUri({
                url : 'https://chart.googleapis.com/chart',
                params : {
                    chs : '300x200',        // image size
                    cht : 'lxy',            // image type

                    chxt : 'x,y,t',                                           // construct axis
                    chxl : '2:|dose rate - measured index|3:|dose  |',                      // axis label
                    chxp : '2,50|3,100',                                        // axis label position
                    chxs : '0,000000,16|1,000000,16|2,000000,20|3,000000,20',   // axis label style
                    chxr : '0,1,' + xMax + ',1' + '|' +
                     '1,0,' + yMax + "," + yMax/yAxis.length,                   // axis range
                     
                    chds : '1,' + xMax + ',0,' + yMax,                          // data range
                    chd : "t:" + xAxis.join(",") + "|" + yAxis.join(","),       // data

                    chls : '4',             // line graph stroke size
                    chco : '000000',        // line graph color
                    
                },
                method : 'get'
            });
        }
        
    }

    

    downLoadImage (url) {
        const downloadjs = require("downloadjs");
        downloadjs(url);
    }

    downLoadExcelFile() {
        const downloadjs = require("downloadjs");
        let s = "date,time,dose rate\n";
        let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime);
        dbArray.map((patient, index) => {
            s += setDateTimeFormat(patient[0])[0] + ".," + setDateTimeFormat(patient[0])[1] + "," + patient[1] + "\n";
        });
        downloadjs(s, "measurement.csv");
    }*/


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
        console.log('uid :',uid)
        if (!uid) return (<Redirect to = '/' />)
        return (
        <div className="col-4">
            <div className="row h1 text-light font-weight-bold bg-primary pl-2">{this.getParams().name}</div>
            <div className="row text-light bg-info font-weight-bold pl-2 h5"> Registered Data </div>
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
    
            <div className="row text-light bg-info font-weight-bold pl-2 h5"> Measured data </div>
            <div className="row">
                <div className="col text-center table-secondary"> index </div>
                <div className="col text-center table-secondary"> date </div>
                <div className="col text-center table-secondary"> time </div>
                <div className="col text-center table-secondary"> dose rate </div>
            </div>
            {this.showPatient()}
            
            <p />
    
            <div className="row text-light bg-info font-weight-bold pl-2 h5"> Graph Data </div>
            <LineChart data={this.state}params={this.getParams()}/>
            {/*
            <div className="row pl-2">dose rate</div>
            <img src={graphImage(this.state)} ></img>
            <div className="col text-right"> index </div>
            */}
            <p />
        </div>
        )
    }

    rightCol(){
        return (
            <div className="col-3">
                <div className="row text-light bg-info font-weight-bold pl-4 h5"> Registered QR Code </div>
                <img class="mx-auto d-block" src={qrImage(this.getParams().uuid)} ></img>
                <div className="row text-light bg-info font-weight-bold pl-4 h5"> Save Data </div>
                <p />
                <button className="btn btn-block btn-warning" onClick={() => saveImage(qrImage(this.getParams().uuid))}>Save QR Code Image (.png)</button>
                <button className="btn btn-block btn-warning" onClick={() => saveExcel(this.state)}>Save as Microsoft Excel (.csv)</button>
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
                <p><Link exact to="/patientsortedlist">back</Link></p>
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
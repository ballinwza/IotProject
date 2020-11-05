import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import {firestore} from 'firebase';
import queryString from 'query-string'
import {Link} from 'react-router-dom';
//import request from 'request';
//import fs from 'fs';
//import fetch from 'node-fetch';
//import https from 'https';
import {sortFunctionByDateTime} from '../myCustomModules/sortFunction';

class Patient extends Component {

    getParams(){
        let url = this.props.location.search;
        let params = queryString.parse(url);
        return params;
    }

    getImageSource(){
        let uuid = this.getParams().uuid;
        return "https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=" + uuid;
    }

    componentDidMount(){
        this.queryDataFromFireStore();
    }

    /*downLoadImage = (uri, filename) => {
        const fs = require('fs');
        request.head(uri, () => {
            request(uri).pipe(fs.createWriteStream(filename)).on("close");
        });
    }
    downLoadImage (url) {
        const response = fetch(url);
        const buffer = response.buffer();
        fs.writeFile(`./image.jpg`, buffer, () => console.log('finished downloading!'));
    }
    downLoadImage (url) {
        var filename = fs.createWriteStream('../data/' + Date.now() + '.png');
        var request = https.get(url, (response) => {
            response.pipe(filename);
        });
    }*/
    downLoadImage (url) {

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

    showPatient(){
        if (this.state){
            let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime);
            console.log("dbArray = ",dbArray);
            return dbArray.map((patient, index) => (
                <div className="row" key={index}>
                    <div className="col-2 text-center">{patient[0]}</div>
                    <div className="col-1 text-center">{patient[1]}</div>
                </div>
            ));
        }
    }

    render(){
        return(
            <div className="container-fluid">
                <p><Link exact to="/patientsortedlist">back</Link></p>
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <div className="col h1 font-weight-bold">{this.getParams().name}</div>
                        </div>
                        <div className="row">
                            <div className="col-9 text-light bg-dark font-weight-bold">Registered Data</div>
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
                    </div>
                    <div className="col-2">
                        <img src={this.getImageSource()} ></img>
                        <button className="btn btn-block btn-secondary" onClick={() => this.downLoadImage(this.getImageSource())}>Save As</button>
                    </div>

                    
                </div>

                <div className="row">
                    <div className="col-3 text-light bg-dark font-weight-bold"> Measured data </div>
                </div>
                <div className="row">
                    <div className="col-2 text-center table-secondary"> date-time </div>
                    <div className="col-1 text-center table-secondary"> dose rate </div>
                </div>
                    
                {this.showPatient()}
            </div>
        )
    }
}



export default Patient;
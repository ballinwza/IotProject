import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import {firestore} from 'firebase';
import queryString from 'query-string'
import {Link} from 'react-router-dom';
import {sortFunctionByDateTime} from '../myCustomModules/sortFunction';
import {setDateFormat, setDateTimeFormat} from '../myCustomModules/dateFunction';
import qrImage from '../myCustomModules/qrImage';
import graphImage from '../myCustomModules/graphImage';
import saveExcel from '../myCustomModules/saveExcel';
import saveImage from '../myCustomModules/saveImage';

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

    showPatient(){
        if (this.state !== null && this.state !== undefined){
            let dbArray = Object.entries(this.state).sort(sortFunctionByDateTime).reverse();
            return dbArray.map((patient, index) => (
                <div className="row" key={index}>
                    <div className="col-1 text-center">{setDateTimeFormat(patient[0])[0]}</div>
                    <div className="col-1 text-center">{setDateTimeFormat(patient[0])[1]}</div>
                    <div className="col-1 text-center">{patient[1]}</div>
                </div>
            ));
        }
    }


    render(){
        return(
            <div className="container-fluid">
                <p><Link to="/patientsortedlist">back</Link></p>
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
                        <img src={qrImage(this.getParams().uuid)} ></img>
                        
                        <button className="btn btn-block btn-secondary" onClick={() => saveImage(qrImage(this.getParams().uuid))}>Save QR code</button>
                        <button className="btn btn-block btn-secondary" onClick={() => saveExcel(this.state)}>Save Excel</button>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                        
                    </div>

                    
                </div>
                
                <div className="row">
                    <div className="col-3 text-light bg-dark font-weight-bold"> Measured data </div>
                </div>
                <div className="row">
                    <div className="col-1 text-center table-secondary"> date </div>
                    <div className="col-1 text-center table-secondary"> time </div>
                    <div className="col-1 text-center table-secondary"> dose rate </div>
                </div>
                {this.showPatient()}
                <p />
                <div className="row">
                    <div className="col-3 text-light bg-dark font-weight-bold"> Graph Data </div>
                </div>
                <div className="col">dose rate</div>
                <img src={graphImage(this.state)} ></img>
                <div className="col-3 text-right"> index </div>
                <p />
            </div>
        )
    }
}


const leftCol = (
    <div className="col-3">
        <div className="row h1 font-weight-bold">{this.getParams().name}</div>
        <div className="row text-light bg-dark font-weight-bold"> Registered Data </div>
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

        <div className="row text-light bg-dark font-weight-bold"> Measured data </div>
        <div className="row">
            <div className="col-1 text-center table-secondary"> date </div>
            <div className="col-1 text-center table-secondary"> time </div>
            <div className="col-1 text-center table-secondary"> dose rate </div>
        </div>
        {this.showPatient()}
        <p />

        <div className="row text-light bg-dark font-weight-bold"> Graph Data </div>
        <div className="row">dose rate</div>
        <img src={graphImage(this.state)} ></img>
        <div className="col-3 text-right"> index </div>
        <p />
    </div>
);


export default Patient;
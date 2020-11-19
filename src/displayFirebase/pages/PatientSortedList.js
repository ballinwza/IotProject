import React, {Component} from 'react';
import {Link} from "react-router-dom";
import firebaseApp from '../firebaseConnection/firebase';
import {sortFunctionByLastestDate} from '../myCustomModules/sortFunction';
import {getDateDayDifferent ,  setDateFormat, setTimeFormat} from '../myCustomModules/dateFunction';


class PatientSortedList extends Component{

    constructor(props){
        super(props);
        this.state = {
            database : new Array(),
            dataShowed : new Array(),
            myDateFormat : {
                day : 'numeric',
                month : 'numeric',
                year : 'numeric',
            },
            userTest : [
                "ธราดร อุราสุข",
                "ฉัตรบุษกร ขาวแผ้ว",
                "ศิรสิทธิ์ ศรีใส",
                "สุรกิจ ขาวแผ้ว",
                "นันทัชพร นันทปิยะวรรณ",
            ],
        };
    }

    componentDidMount() {
        this.myDate = new Date().toLocaleDateString('th', this.state.myDateFormat);
        this.queryRealTimeDatabase();   
        //console.log(this.getDateDayDifferent(myDate, myDate2));
    }

    queryRealTimeDatabase(){
        const importRealTimeDatabase = firebaseApp.database();
        const importCloudFireStore = firebaseApp.firestore();
        const firebaseDataTable = importRealTimeDatabase.ref("1jIr0RVcDy9q-wbXIWJ7gRFLTDOmbJ7QW4oo_VbhyngI/Firebase data").once('value');
        const doseMeasurementTable = importCloudFireStore.collection("dose_measurement");
        firebaseDataTable.then((snapshot) => {
            const dbArray = Object.values(snapshot.val());
            dbArray.map((value) => {
                // dbArray เป็นอาเรย์ของออปเจค และ value เป็นออปเจคเก็บสิ่งต่าง ๆ ของผู้ป่วยแต่ละคน
                value.cloudFireStore = [];
                value.dateTimeArray = [];
                this.queryCloudFirestore(doseMeasurementTable, value)
                .then(this.defineValue)
                .then((val) => {
                    this.setState((state) => ({
                        database : [...state.database, val]
                    }));
                    return new Promise((resolve) => {
                        resolve(val);
                    })
                });
            })
        });
    }

    defineValue(value) {
        return new Promise((resolve) => {
            if (value.lastestDate === undefined){
                value.lastestDate = value.date;
            }
            if (value.lastestTime === undefined){
                value.lastestTime = value.time;
            }
            resolve(value);
        });
    }
    
    queryCloudFirestore(table, value) {
        this.setState({dataShowed : {
            ...this.state.dataShowed,
            [value.name] : {
                uuid : value.uuid,
                name : value.name,
                lastestDate : value.date,
                lastestTime : setTimeFormat(value.time),
                googleFormData : {
                    activity: value.activity,
                    date : value.date,
                    time : setTimeFormat(value.time),
                },
                cloudFireStore : [],
            }
        }});
        return new Promise((resolve) => {
            table.where("uuid", "==", value.uuid).onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    value.cloudFireStore = [...value.cloudFireStore, {
                        uuid: doc.data().uuid,
                        dateTime: doc.data().date_time,
                        doseRate: doc.data().dose_rate
                    }];
                    value.dateTimeArray = [...value.dateTimeArray, doc.data().date_time.split(" ")].sort().reverse();
                    value.lastestDate = setDateFormat(value.dateTimeArray[0][0]);
                    value.lastestTime = setTimeFormat(value.dateTimeArray[0][1]);
                    this.setState({dataShowed : {
                        ...this.state.dataShowed,
                        [value.name] : {
                            uuid : value.uuid,
                            name : value.name,
                            lastestDate : value.lastestDate,
                            lastestTime : value.lastestTime,
                            googleFormData : {
                                activity: value.activity,
                                date : value.date,
                                time : setTimeFormat(value.time),
                            },
                            cloudFireStore : value.cloudFireStore,
                        }
                    }});
                })
            });
            
            resolve(value);
        })
    }

    showPatient(){
        const arr = Object.values(this.state.dataShowed).sort(sortFunctionByLastestDate);
        if (arr !== undefined) {
            return arr.map((patient, index) => (
                
                <div className="row" key={index}>
                    <div className={this.getStatusColor(patient)}>{this.getStatus(patient)}</div>
                    <div className="col-2 "><Link to={this.getGETParamString(patient)}>{patient.name}</Link></div>
                    <div className="col-1 text-center">{patient.lastestDate}</div>
                    <div className="col-1 text-center">{patient.lastestTime}</div>
                </div>
            ));
        }
    }

    getStatus (value) {
        var diff = getDateDayDifferent(value.lastestDate, this.myDate);
        if (this.state.userTest.find(element => element === value.name)) {
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
        var cName;
        switch (this.getStatus(patient)){
            case "Active":
                cName = "col-1 text-center table-success";
                break;
            case "Inactive":
                cName = "col-1 text-center table-danger";
                break;
            case "Test User":
                cName = "col-1 text-center table-warning";
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
        params += "activity=" + patient.googleFormData.activity + "&";
        params += "date=" + patient.googleFormData.date + "&";
        params += "time=" + patient.googleFormData.time;
        return params;
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 text-center text-light bg-dark font-weight-bold">Status</div>
                    <div className="col-2 text-center text-light bg-dark font-weight-bold">Name</div>
                    <div className="col-1 text-center text-light bg-dark font-weight-bold">Lastest Date</div>
                    <div className="col-1 text-center text-light bg-dark font-weight-bold">Lastest Time</div>
                </div>
                
                {this.showPatient()}
            </div>
        )
        
    }
}

export default PatientSortedList;
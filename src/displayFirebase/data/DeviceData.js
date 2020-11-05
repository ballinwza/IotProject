import { firestore } from 'firebase';
import React, {Component} from 'react';
import firebaseApp from "../firebaseConnection/firebase";

/*const DeviceData = async (uuid) => {
    let dataArray = [];
    const fs = firebaseApp.firestore();
    const db = fs.collection("dose_measurement");
    const query = db.where("uuid", "==", uuid);
    const snaping = await query.get();
    snaping.forEach((child) => {
        if (child.exists){
            dataArray.push({
                uuid: child.data().uuid,
                dateTime: child.data().created_date_time,
                doseRate: child.data().dose_rate
            });
        }
    });
    return dataArray;
}*/

class DeviceData extends Component{
    constructor(props){
        super(props);
        this.state = {data : new Array()};
        this.getQueryData();
    }

    getQueryData(){
        const fs = firebaseApp.firestore();
        const db = fs.collection("dose_measurement");
        //const query = db.where("uuid", "==", props.uuid);
        const snaping = db.get();
        snaping.forEach((child) => {
            this.setState({data : [...this.state.data, child.data() ]});
        });
    }

    static getState(){
        return this.state.data;
    }
    
}

export default DeviceData;
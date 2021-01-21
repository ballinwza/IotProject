import React, {Component} from 'react';
import firebaseApp from '../firebaseConnection/firebase';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

class Register extends Component {

    state = {
        name : "",
        gender : "",
        age : "",
        dose : "",
        day : "",
        month : "",
        year : "",
        hour : "",
        minute : "",
    }

    /*async setFirebaseData() {
        const firestore = firebaseApp.firestore();
        await firestore.collection('patients').add({
            name: this.state.name,
            age : this.state.age,
            gender : this.state.gender,
            dose : this.state.dose,
            date : this.state.day + "/" + this.state.month + "/" + this.state.year,
            time : this.state.hour + ":" + this.state.minute,
        })
    }*/

    setFirebaseData2(){
        if (this.checkNoneData().length !== 0){
            const alertString = "please fill out this data:\n" + this.checkNoneData().join(", ") + ".";
            alert(alertString);
        }
        else{
            const firestore = firebaseApp.firestore();
            return new Promise((resolve, reject) => {
                firestore.collection('patients').add({
                    name: this.state.name,
                    age : this.state.age,
                    gender : this.state.gender,
                    dose : this.state.dose,
                    date : this.state.day + "/" + this.state.month + "/" + this.state.year,
                    time : this.state.hour + ":" + this.state.minute,
                });
                resolve("ระบบได้บันทึกข้อมูลของ\nคุณ " + this.state.name + " เรียบร้อยแล้ว");
                reject(new Error("พบปัญหาเกิดขึ้น โปรดติดต่อเจ้าหน้าที่"));
            })
            .then((result) => {
                alert(result);
                this.props.history.push('/patientlist');
            })
            .catch((err) => {
                alert(err);
            });
        }
    }

    checkNoneData() {
        let noneArray = [];
        const checkArray = Object.entries(this.state);
        checkArray.map((element) => {
            if (element[1] === ""){
                noneArray = [...noneArray, element[0]]
            }
        })
        return noneArray;
    }
    
    onInputChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmitData = (e) => {
        console.log(this.state);
        this.setFirebaseData();
    }

    numberOption(start, end) {
        const jsx = [];
        for (var i = start; i <= end; i++){
            jsx.push(<option key={i}>{i}</option>);
        }
        return jsx
    }

  
    
    render(){
        const { uid } = this.props;
        if (!uid) return (<Redirect to = '/' />)
        return(
            <div>
                <div className="row" style={{backgroundColor : "#f1f1f1", height : "60px"}} />
                <div className="container-fluid row">
                    
                    <div className="col-2" style={{backgroundColor : "#f1f1f1"}}></div>
                    <div className="col-8">
                        <div className="row mt-5"><h1>Registation Form</h1></div>


                        <div className="mt-5" style={titleStyle}>ชื่อ-นามสกุล</div>
                        <input type="text-center" style={myStyle} className="form-control" name="name" onChange={this.onInputChange} required/>


                        <div style={titleStyle}>เพศ</div>
                        <select className="form-control" style={myStyle} name="gender" onChange={this.onInputChange} >
                            <option></option>
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง" >หญิง</option>
                        </select>
                        
                        <div style={titleStyle}>อายุ (ปี)</div>
                        <input type="text-center" style={myStyle} className="form-control" name="age" onChange={this.onInputChange} />

                        <div style={titleStyle}>ปริมาณไอโอดีนรังสีที่คนไข้ได้รับ (คูรี่; Ci)</div>
                        <input type="text-center" style={myStyle} className="form-control" name="dose" onChange={this.onInputChange} />

                        <div style={titleStyle}>วัน-เดือน-ปี</div>
                        <div className="row mt-4">
                            <div className="col text-center">วันที่</div>
                            <div className="col">
                                <select className="form-control" style={splitSelectionStyle} name="day" onChange={this.onInputChange} >
                                    <option></option>
                                    {this.numberOption(1,31)}
                                </select>
                            </div>
                            <div className="col text-center">เดือน</div>
                            <div className="col">
                                <select className="form-control" style={splitSelectionStyle} name="month" onChange={this.onInputChange} >
                                    <option></option>
                                    {this.numberOption(1,12)}
                                </select>
                            </div>
                            <div className="col text-center">ปี พ.ศ.</div>
                            <div className="col">
                                <select className="form-control" style={splitSelectionStyle} name="year" onChange={this.onInputChange} >
                                    <option></option>
                                    {this.numberOption(2563,2572)}
                                </select>
                            </div>
                        </div>

                        <div style={titleStyle}>เวลาที่ได้รับสารรังสีครั้งแรก</div>
                        <div className="row mt-4">
                            <div className="col" />
                            <div className="col">
                                <select className="form-control" style={splitSelectionStyle} name="hour" onChange={this.onInputChange} >
                                    <option></option>
                                    {this.numberOption(0,23)}
                                </select>
                            </div>
                            <div className="col text-center">นาฬิกา</div>
                            <div className="col">
                                <select className="form-control" style={splitSelectionStyle} name="minute" onChange={this.onInputChange} >
                                    <option></option>
                                    {this.numberOption(0,59)}
                                </select>
                            </div>
                            <div className="col text-center">นาที</div>
                            <div className="col" />
                        </div>
                        <div className="row">
                            <div className="col" />
                            <div className="col" >
                                <button className="btn btn-primary btn-block mt-5 mb-5" onClick={() => this.setFirebaseData2()} style={{fontSize : "16px"}}>submit</button>
                            </div>
                            <div className="col" />
                        </div>
                        
                        
                    </div>
                    <div className="col-2" style={{backgroundColor : "#f1f1f1", }}></div>
                </div>
                <div className="row" style={{backgroundColor : "#f1f1f1", height : "60px"}} />
                
            </div>
        )
    }

}

const titleStyle = {
    fontSize : "16px", 
    backgroundColor : "white", 
    paddingLeft : "20px",
    fontWeight : "bold"
}



const myStyle = {
    fontSize: "16px", 
    marginBottom : "4%", 
    marginInline : "2%",
    width : "96%", 
    backgroundColor : "#f1f1f1"
}

const splitSelectionStyle = {
    fontSize: "16px", 
    margin : "2%", 
    width : "100%", 
    backgroundColor : "#f1f1f1"
}

const mapStateToProps = (state) => {
    return{
        uid : state.firebase.auth.uid
    }
}

export default connect(mapStateToProps)(Register);

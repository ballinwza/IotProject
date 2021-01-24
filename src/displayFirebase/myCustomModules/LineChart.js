import { data } from 'jquery';
import React, {Component} from 'react';
import Chart from 'react-google-charts';
import {sortFunctionByHour} from '../myCustomModules/sortFunction'
import { Redirect } from 'react-router-dom';

class LineChart extends Component {


    getData (obj) {
        let dataArray = [];
        if (obj !== null && obj !== undefined){
            Object.entries(obj).map((element) => {
                let dt = new Date(element[0]);
                dataArray.push([this.getHourDiff(dt), parseFloat(element[1])]);
            });
            dataArray.unshift(['x','dose']);
            dataArray.sort(sortFunctionByHour);
        }
        return dataArray;

    }



    getBaseTime () {
        if (this.props.params !== null && this.props.params !== undefined) {
            let time = this.props.params.time;
            let dateArray = this.props.params.date.split("/").reverse();
            dateArray[0] = (parseInt(dateArray[0]) - 543).toString();
            let date = dateArray.join("-");
            return new Date(date + " " + time);
        }
        else {
            return new Date();
        }
        
    }

    getHourDiff(dt) {
        if (dt.getTime !== undefined){
            let diff = (dt.getTime() - this.getBaseTime().getTime())/(1000*60*60);
            //return Math.abs(Math.round(diff));
            return Math.abs(diff);
        }
        else {
            return 0;
        }
    }

    showData() {
        if (this.getData(this.props.data).length !== 0){
            //console.log(this.getData(this.props.data));
            return (
            <div>
                <Chart 
                    width="100%"
                    height="500px"
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={this.getData(this.props.data)}
                    options={{
                        /*chart : {
                            title : "กราฟแสดงความสัมพันธ์ระหว่างปริมาณ dose-rate ที่วัดจากเครื่อง และ เวลานับตั้งแต่ผู้ป่วยลงทะเบียนครั้งแรก",
                            subtitle : "hello"
                        },*/
                        hAxis: {
                            title : 'time in hours'
                        },
                        vAxis : {
                            title : 'dose rate'
                        },
                        series : {
                            0 : {
                                curveType : 'function',
                                color : '#861818',
                            }
                        }
                        
                    }}
                />
            </div>
            )
        }
        else{
            return(
                <div>
                    <p>no data</p>
                </div>
            )
        }
    }


    render(){
        //const myDate = new Date(this.getData()[0][0]);
        //this.getData();
        return (
            <div>
                {this.showData()}
            </div>
        )
    }
    
}



export default LineChart;
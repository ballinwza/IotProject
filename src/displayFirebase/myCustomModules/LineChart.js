import React, {Component} from 'react';
import Chart from 'react-google-charts';

class LineChart extends Component {


    getData (obj) {
        //console.log(this.props.data);
        let dataArray = [];
        if (obj !== null && obj !== undefined){
            Object.entries(obj).map((element) => {
                let dt = new Date(element[0]);
                dataArray.push([this.getHourDiff(dt), parseInt(element[1])])
            });
            dataArray.sort().unshift(['x','dose']);
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
            return Math.abs(Math.round(diff));
        }
        else{
            return 0;
        }
        
    }

    showData() {
        if (this.getData(this.props.data).length !== 0){
            return (
            <div>
                <Chart 
                    width="500px"
                    height="200px"
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={this.getData(this.props.data)}
                    options={{
                        hAxis: {
                            title : 'time in hours'
                        },
                        vAxis : {
                            title : 'dose rate'
                        },
                        series : {
                            0 : {
                                curveType : 'function'
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
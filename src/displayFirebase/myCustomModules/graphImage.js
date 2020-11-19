import axios from 'axios';
import {sortFunctionByDateTime} from './sortFunction';

const graphImage = function (obj) {
    if (obj !== null && obj !== undefined) {
        let xAxis = [];
        let yAxis = [];
        let dbArray = Object.entries(obj).sort(sortFunctionByDateTime).reverse();
        dbArray.map((patient, index) => {
            xAxis.push(index + 1);
            yAxis.push(patient[1]);
        });
        const xMax = Math.max(...xAxis);
        const yMax = Math.max(...yAxis);
        return axios.getUri({
            url : 'https://chart.googleapis.com/chart',
            params : {
                chs : '400x200',        // image size
                cht : 'lxy',            // image type

                chxt : 'x,y',                                             // construct axis
                chxl : '2:|dose rate - measured index|3:|dose  |',          // axis label
                chxp : '2,50|3,100',                                        // axis label position
                chxs : '0,000000,16|1,000000,16|2,000000,20|3,000000,20',   // axis label style
                chxr : '0,1,' + xMax + ',1' + '|' +
                 '1,0,' + yMax + "," + yMax/yAxis.length,                   // axis range
                 
                chds : '1,' + xMax + ',0,' + yMax,                          // data range
                chd : "t:" + xAxis.join(",") + "|" + yAxis.join(","),       // data

                chls : '4',             // line graph stroke size
                chco : '0000DD',        // line graph color
                
            },
            method : 'get'
        });
    }
}
export default graphImage;
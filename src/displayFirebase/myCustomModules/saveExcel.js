import {sortFunctionByDateTime} from './sortFunction';
import {setDateTimeFormat} from './dateFunction';

const saveExcel =  function(tableSource, params) {
    const downloadjs = require("downloadjs");
    const fileName = params.name.split(" ")[0] + ".csv";
    //const timeDiff = getHourDiff(params);
        let s = "date,time,dose rate\n";
        let dbArray = Object.entries(tableSource).sort(sortFunctionByDateTime).reverse();
        dbArray.map((patient) => {
            s += setDateTimeFormat(patient[0])[0] + ".," + setDateTimeFormat(patient[0])[1] + "," + patient[1] + "," + "\n";
        });
    downloadjs(s, fileName);
}

const getBaseTime  = function (params) {
    if (params !== null && params !== undefined) {
        let time = params.time;
        let dateArray = time.split("/").reverse();
        dateArray[0] = (parseInt(dateArray[0]) - 543).toString();
        let date = dateArray.join("-");
        return new Date(date + " " + time);
    }
    else {
        return new Date();
    }
}

const getHourDiff = function (params, dt) {
    if (dt.getTime !== undefined){
        let diff = (dt.getTime() - getBaseTime(params).getTime())/(1000*60*60);
        //return Math.abs(Math.round(diff));
        return Math.abs(diff);
    }
    else {
        return 0;
    }
}

export default saveExcel;
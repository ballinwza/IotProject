import {sortFunctionByDateTime} from './sortFunction';
import {setDateTimeFormat} from './dateFunction';

const saveExcel =  function(tableSource) {
    const downloadjs = require("downloadjs");
        let s = "date,time,dose rate\n";
        let dbArray = Object.entries(tableSource).sort(sortFunctionByDateTime);
        dbArray.map((patient) => {
            s += setDateTimeFormat(patient[0])[0] + ".," + setDateTimeFormat(patient[0])[1] + "," + patient[1] + "\n";
        });
        downloadjs(s, "measurement.csv");
}

export default saveExcel;
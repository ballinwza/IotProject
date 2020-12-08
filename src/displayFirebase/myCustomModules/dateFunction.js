const myDate = new Date().toLocaleDateString('th', {
    day : 'numeric',
    month : 'numeric',
    year : 'numeric',
});

const setDateFormat = function (date) {
    let dateArray = date.split("-").reverse();
    return dateArray[0] + "/" + dateArray[1] + "/" + (parseInt(dateArray[2]) + 543).toString();
}

const getDateDayDifferent = function (a, b) {
    a = a.split("/")[1] + '/' + a.split("/")[0] + '/' + a.split("/")[2];
    b = b.split("/")[1] + '/' + b.split("/")[0] + '/' + b.split("/")[2];
    const dateA = new Date(a);
    const dateB = new Date(b);
    return (Math.abs(dateA - dateB)/(1000 * 3600 * 24)); 
}

const setTimeFormat = function (time) {
    let timeArray = time.split(":");
    if (timeArray.length === 3) {
        timeArray.pop();
    }
    if (timeArray[1] === "0") {
        timeArray[1] = "00";
    }
    if (timeArray[1].length === 1) {
        timeArray[1] = "0" + timeArray[1];
    }
    return timeArray.join(":");
}

const setDateTimeFormat = function(dateTime){
    let [date, time] = dateTime.split(" ");
    return [setDateFormat(date), time];
}



export {setDateFormat, getDateDayDifferent, setTimeFormat, setDateTimeFormat};
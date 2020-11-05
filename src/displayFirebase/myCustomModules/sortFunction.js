const sortFunctionByLastestDate = function (a, b) {
    const dateA = a.lastestDate.split("/").reverse().map(v => parseInt(v));
    const dateB = b.lastestDate.split("/").reverse().map(v => parseInt(v));
    if (dateA[0] > dateB[0]){
        return -1;
    }
    else if (dateA[0] < dateB[0]){
        return 1;
    }
    else{
        if (dateA[1] > dateB[1]){
            return -1;
        }
        else if (dateA[1] < dateB[1]){
            return 1;
        }
        else{
            if (dateA[2] > dateB[2]){
                return -1;
            }
            else if (dateA[2] < dateB[2]){
                return 1;
            }
            else{
                if (a.lastestTime > b.lastestTime){
                    return 1;
                }
                else if (a.lastestTime < b.lastestTime){
                    return -1;
                }
                else{
                    return 0;
                }
            }
        }
    }
}

const sortFunctionByDateTime = function (a,b) {
    const [dateAS, timeA] = a[0].split(" ");
    const [dateBS, timeB] = b[0].split(" ");
    const dateA = dateAS.split("-").map(v => parseInt(v));
    const dateB = dateBS.split("-").map(v => parseInt(v));
    if (dateA[0] > dateB[0]){
        return -1;
    }
    else if (dateA[0] < dateB[0]){
        return 1;
    }
    else{
        if (dateA[1] > dateB[1]){
            return -1;
        }
        else if (dateA[1] < dateB[1]){
            return 1;
        }
        else{
            if (dateA[2] > dateB[2]){
                return -1;
            }
            else if (dateA[2] < dateB[2]){
                return 1;
            }
            else{
                if (timeA > timeB){
                    return 1;
                }
                else if (timeA < timeB){
                    return -1;
                }
                else{
                    return 0;
                }
            }
        }
    }

}


export { sortFunctionByLastestDate, sortFunctionByDateTime }
import axios from 'axios';

const qrImage = function (uuid) {
    return axios.getUri({
        params : {
            cht : 'qr',
            chs : '250x250',
            chl : uuid,
        },
        url : 'https://chart.googleapis.com/chart',
        method : 'get',
    });
}

export default qrImage;
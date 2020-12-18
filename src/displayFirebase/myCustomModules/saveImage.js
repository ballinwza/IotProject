const saveImage =  function(imageSource, name) {
    const downloadjs = require("downloadjs");
    const fileName = name.split(" ")[0] + ".png";
    //downloadjs(imageSource, firstName + ".png", "image/png");

    var request = new XMLHttpRequest();
    request.open("GET", imageSource, true);
    request.responseType = "blob";
    request.onload = (event) => {
        downloadjs(event.target.response, fileName, "image/png");
    }
    request.send();
}

export default saveImage;
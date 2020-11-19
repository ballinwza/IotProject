const saveImage =  function(imageSource) {
    const downloadjs = require("downloadjs");
    downloadjs(imageSource);
}

export default saveImage;
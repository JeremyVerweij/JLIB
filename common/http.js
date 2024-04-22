JLIB.common.httpReqeust = function(url, _callback){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            _callback(xhr.response);
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}
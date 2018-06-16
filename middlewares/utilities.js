const fs = require('fs');
const axios = require('axios');

axios.default={
    baseURL : process.env.BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'apikey': process.env.API_KEY
    }
}

function serverlog(req,message){
    const date = new Date().toString();
    const url = req.url;
    const method = req.method;
    const theMessage = `${method}  ${url} ${date} ${message}`;
    fs.writeFileSync('../serverlog.log',theMessage);
}


function sendMessage(to,message){
     message = message || "I am a fisherman. I sleep all day and work all night!";

    var post_data = querystring.stringify({
        'to'       : to,
        'message'  : message
    });


    return axios.post('/version1/messaging',post_data)
    .then(resp => {
        // console.log(resp)
        resp.setEncoding('utf8');
        var jsObject   = JSON.parse(resp);
            var recipients = jsObject.SMSMessageData.Recipients;
            if ( recipients.length > 0 ) {
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    logStr     += ';statusCode=' + recipients[i].statusCode;
                    return console.log(logStr);
                    }
            } 
            else {
                    return console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }

    })
    .catch( err => {
        return Promise.reject(err);
    })
}


module.exports.serverlog = serverlog;
module.exports.sendMessage= sendMessage;
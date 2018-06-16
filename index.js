const express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let utilities = require('./middlewares/utilities');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/recieveMessage',(req,res)=>{
    let {from,to,text,date,id} = req.body;
    let messageObj ={
        from,
        to,
        text,
        date,
        id
    }
    //store message to the database for future manipulation and reference purpose;
        
        //send the default response message to the user to acknowledge message receipt;

        utilities.sendMessage(from)
        .then( resp => {
            res.send();
        })
        .catch(err => {
            utilities.serverlog(req,err);
        })
        res.end();
})








app.listen(port, ()=>{
    console.log(`App listening on port ${port} `)
})


//dependencies list 
// axios
// bodyParser

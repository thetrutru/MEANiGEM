var express = require('express');
var port = process.argv[2];  //use 5000
var morgan = require('morgan');
var colors = require('colors');
var bodyParser = require('body-parser');
var cp = require('child_process');
var mongoose = require('mongoose');
var app = express();

//==============MONGODB=================
mongoose.connect('mongodb://localhost/myApp');

var aaSchema = mongoose.Schema({
    'DNAsequence' : String,
    'Prtnsequence' : String
});
var prtnSeq = mongoose.model('aa', aaSchema);

//================bodyparser==================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//====================CORS===================
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//================morgan=================
app.use(morgan(
    ':method '.magenta + 
    ':url '.green + 
    ':status '.blue +
    ':res[content-length] '.italic.grey + 'bits '.italic.grey 
    + 'sent in ' + ':response-time ms'.grey
));

//============middleware================
app.use(function(req, res, next) {
    console.log('got a request!');
    next();
});

//================routes==================
/*app.get('/', function(req,res){
    res.send('dsdsdsd');
});*/

app.get('/one', function(req, res) {
    res.send('got a GET request1');
});

app.post('/one', function(req, res) {
	//console.log(req.body);
    res.send('got a POST request1');
});

app.post('/prtn', function(req, res) {
    var arg = req.body.arg; //req.body is a json --> req.body.n is selecting the value for n

    var results = {
    	received: req.body,
        output: null,
        errorlog: null,
        exitcode: null
    };

    var myPy = cp.spawn('python3', ['DNAtoAA.py', arg]);

    //stdout
    myPy.stdout.on('data', function(stdout) {
        results.output = stdout.toString();
    });

    //stderr
    myPy.stderr.on('data', function(stderr) {
        results.errorlog = stderr.toString();
    });

    //finished
    myPy.on('close', function(code) {
        results.exitcode = code; 

            //save in database
        if (code === 0) {
            var seq = new prtnSeq({
                'DNAsequence' : arg,
                'Prtnsequence' : results.output
            });

            seq.save(function(err, sequence){
                if (err) console.error(err);
                console.log('Saved protein!'.red);
            });
        }
        
        res.send(results);
    });   
});

app.get('/aas', function(req, res){
    prtnSeq.find(function(err, aas){
        if (err) console.error(err);

        res.send(aas);
    });
});

//===================start========================


app.listen(port);
console.log('Express server listening on port ' + port.rainbow);

app.use(express.static('public'));
console.log('Serving content from ' + 'public'.yellow);

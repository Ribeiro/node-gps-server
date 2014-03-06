var express = require('express'),
    voicejs = require('voice.js'),
    http = require('http'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.post('/', function(req, res) {
  var client = new voicejs.Client({
  email: process.argv[2] || 'EMAIL', //google voice credentials
  password: process.argv[3] || 'PASS',
  });

  var text = process.argv[4] || 'https://maps.google.com/maps?q=' + req.body.latitude + '+' + req.body.longitude;
  var to = process.argv.slice(5).length ?  process.argv.slice(5) : [req.body.number];

  client.sms({ to: to[0], text: text}, function(err, res, data){
    if (err) return console.log(err);
    console.log('SMS "' + text + '" sent to', to[0] + '. Conversation id: ', data.send_sms_response.conversation_id);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var ErrorManagement = require('./server/handling/ErrorHandling.js');
var LogManagement = require('./server/handling/LogHandling.js');

var port = process.env.PORT || 3000;
var app = express();


// Process On Every Error
   process.setMaxListeners(0);
   process.on('unhandledRejection', (reason, promise) => {
      ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', reason);
      console.error("'Un Handled Rejection' Error Log File - " + new Date().toLocaleDateString());
   });
   process.on('uncaughtException', function (err) {
     console.log(err);
     
      ErrorManagement.ErrorHandling.ErrorLogCreation('', '', '', err.toString());
      console.error(" 'Un Caught Exception' Error Log File - " + new Date().toLocaleDateString());
   });


// DB Connection

  mongoose.connect('mongodb://kathiraashi:kathir143@ds121871.mlab.com:21871/insight-360');
  //  mongoose.connect('mongodb://localhost/Insight-360');
   mongoose.connection.on('error', function(err) {
      ErrorManagement.ErrorHandling.ErrorLogCreation('', 'Mongodb Connection Error', 'Server.js', err);
   });
   mongoose.connection.once('open', function() {
      console.log('DB Connectivity, Success!');
   });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Every request Log Creation
app.use('/API/', function (req, res, next) {
   if (req.body.Info !== '' && req.body.Info){
      LogManagement.LogHandling.LogCreation(req);
      return next();
   }else {
      ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Security Error For Every Request Log Creation', 'Server.js');
      return res.status(406).end('Invalid arguments');
   }
});

 require('./server/web/routes/Admin/RegisterAndLogin.routes.js')(app);

// Every request Token Validation
// app.use('/API/', function (req, res, next) {
//    if (req.body.Info !== '' && req.body.Info){
//       LogManagement.LogHandling.LogCreation(req);
//       return next();
//    }else {
//       ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Security Error For Every Request Log Creation', 'Server.js');
//       return res.status(406).end('Invalid arguments');
//    }
// });

// Admin
require('./server/web/routes/Admin/AdminManagement.routes.js')(app);
// Settings
   // CRM Settings
      require('./server/web/routes/settings/CRM_Settings.routes.js')(app);
   // Leads Settings
      require('./server/web/routes/settings/Leads_Settings.routes.js')(app);
   // HRMS Settings
      require('./server/web/routes/settings/Hrms_Settings.routes.js')(app);
   // HR Settings
      require('./server/web/routes/settings/Hr_Settings.routes.js')(app);
   // Account Settings
      require('./server/web/routes/settings/Account_Settings.routes.js')(app);



app.get('*', function(req, res){
    res.send('This is Server Side Page');
});


app.listen(port, function(){
  console.log('Listening on port ' + port);
});
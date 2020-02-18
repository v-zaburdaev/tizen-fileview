var express = require('express')
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });


var app = express()

app.post('/upload', upload.any(), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.body);
  console.log(req.files);
  res.send();
})

app.listen(3030, function () {
    console.log('Example app listening on port 3000!');
   });
 
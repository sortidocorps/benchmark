var express = require('express');
var router = express.Router();
var path = require('path');
var multer  = require('multer');
var csvToJson = require('convert-csv-to-json');




const reportFolder = './public/data/';
const fs = require('fs');


// pdf
//var phantom = require('phantom');
//var pdf = require('html-pdf');
var html = fs.readFileSync('./views/index.html', 'utf8');
var options = { format: 'Letter' };

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('test/', function(req, res, next) {  
  res.sendFile(path.join(__dirname, '../../', '', 'extent.html'));
});




module.exports = router;

router.get('/data', function(req,res){
  
  jsonTab = "";
  i = 0;
  var columns = ["cl1", "cl2"];
  fs.readdirSync(reportFolder).forEach(file => {
    json = csvToJson.getJsonFromCsv(reportFolder+file);    
    jsonc = json[json.length-1];   
    i++;
    // Enleve le retour ligne a la fin du fichier csv.
    secondFormat = JSON.stringify(jsonc.second).replace(/[\\n\\r]/g, '');
    fileScreenName = file.split('.')[0];    
    fileScreenName = fileScreenName.split('_').join(' ');

    jsonTab= jsonTab+ '{ "id":' + i + ', "name":"data/' + file + '", "screen":"'+fileScreenName+'", "maxtime":'+secondFormat+'},';
    //console.log(jsonTab);
  });

  jsonTab= jsonTab.substring(0, jsonTab.length - 1);  
  jsonTab= '[' + jsonTab + ']';

  //console.log(jsonTab);
  // format: [{ "id":1, "name":"product.csv"},{ "id":2, "name":"ss.csv"},{ "id":3, "name":"ss.csv"},{ "id":4, "name":"ssss.csv"}]
  res.json(JSON.parse(jsonTab));

});

/*router.get('/pdf', function(req,res){
  
  pdf.create(html, options).toFile('./public/pdf/apliIndicators.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });

});*/
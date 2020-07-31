const fs = require('fs')

export interface Voter{
  name: String,
  guardian: String,
  houseNo: Number,
  houseName: String,
  genderAge: String,
  id: String
}

export function csvJSON(csv){

  var lines =csv.split("\n");

  var result = [];
  var headers=['Name', "guardian", 'HouseNo', 'HouseName', 'Gender_Age', 'IDCardNo'];

  for(var i in lines){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j in headers){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return JSON.stringify(result);
}
const output = csvJSON(fs.readFile('./G05036-Poonjar001-PERUNNILAM001-PERUNNILAM ANGANVADI  GROUND FLOOR.csv'))
console.log(output)
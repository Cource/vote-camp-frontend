const fs = require('fs')

// export interface Voter{
//   name: String,
//   guardian: String,
//   houseNo: Number,
//   houseName: String,
//   genderAge: String,
//   id: String
// }

function csvJSON(csv){

  let lines =csv.split("\n");

  let result = [];
  let headers=['Name', "guardian", 'HouseNo', 'HouseName', 'Gender_Age', 'IDCardNo'];

  for(let i in lines){
      if ()
      let obj = {};
      let currentline=lines[i].split(",");

      for(let j in headers){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return JSON.stringify(result);
}
fs.readFile('Poonjar/G05036-Poonjar001-PERUNNILAM001-PERUNNILAM ANGANVADI  GROUND FLOOR.csv', (err, res)=>
{
    console.log(res)
    console.log(csvJSON(res.toString()))
})
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
    let headers=['name', "guardian", 'houseNumber', 'houseName', 'gender', 'voterId'];

    for(let i in lines){
        if (lines[i] !== ''){
            let currentline=lines[i].split(",");
            let obj = {};

            for(let j in headers){
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
    }
  }

  return JSON.stringify(result);
}
fs.readFile('Poonjar/G05036-Poonjar002-MATTAYKKADU001-POONJAR GOVT. LP SCHOOL, 2ND BLOCK  SOUTH PART.csv', (err, res)=>
{
    console.log(csvJSON(res.toString()))
})
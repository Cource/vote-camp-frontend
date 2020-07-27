export interface Voter{
  name: String,
  guardian: String,
  houseNo: Number,
  houseName: String,
  genderAge: String,
  id: String
}

export function csvJSON(csv){

  var lines:Array<String> =csv.split("\n");

  var result:Array<Voter>  = [];
  var headers=['Name', "guardian's name", 'House No', 'House Name', 'Gender/Age', 'ID Card No'];

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  return JSON.stringify(result);
}

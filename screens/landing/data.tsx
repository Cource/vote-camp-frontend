export interface Option{
    title: String,
    list: Array<String>,
}
  
export let options:Array<Option> =[
    {
      title: "District",
      list: [
          "Kasaragod",
          "Kannur",
          "Wayanad",
          "Kozhikode",
          "Malappuram",
          "Palakkad",
          "Thrissur",
          "Eranakulam",
          "Idukki",
          "Thiruvananthapuram",
          "Kollam",
          "Alappuzha",
          "Pathanamthitta",
          "Kottayam",
      ],
    },
    {
      title: "City/Town",
      list: [
          "Thalayazham",
          "Chempu",
          "Maravanthuruthu",
          "Vechoor"
      ],
    },
    {
      title: "Ward",
      list: [
          "G05019002 - VALLYAD",
          "G05019003 - KALLUNKATHRA",
          "G05019004 - PULIKKUTTISSERY",
          "G05019005 - JAYANTHI",
          "G05019006 - IRAVEESWARAM"
      ],
    }
  ]
  
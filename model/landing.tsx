export interface Option{
    title: String,
    list: Array<String>,
}
  
export const options:Array<Option> =[
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
          "Vechoor",
          "Poonjar",
          "Pala",
          "Manjoor",
          "Erattupetta"
      ],
    },
    {
      title: "Ward",
      list: [
          "Aruvithra",
          "Panchipara",
          "Aanippadi",
          "Block Office",
          "Kallolil"
      ],
    }
]

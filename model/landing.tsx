import { Dispatch, SetStateAction } from 'react';

export interface Option{
  title: String,
  list: Array<String>,
  state: String
  changeState: Dispatch<SetStateAction<string>>,
}
  
export const districts =[
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
]
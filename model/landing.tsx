import { Dispatch, SetStateAction } from 'react';

export interface Option{
  title: String,
  list: Array<String>,
  state: String
  changeState: Dispatch<SetStateAction<string>>,
}
  
export const districts =[
  "kasaragod",
  "kannur",
  "wayanad",
  "kozhikode",
  "malappuram",
  "palakkad",
  "thrissur",
  "eranakulam",
  "idukki",
  "THIRUVANANTHAPURAM",
  "kollam",
  "alappuzha",
  "pathanamthitta",
  "kottayam",
]
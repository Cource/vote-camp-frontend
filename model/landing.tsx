import { Dispatch, SetStateAction } from 'react';
import { ViewStyle, TextStyle } from "react-native";

export interface Option{
  title: string,
  list: Array<string>,
  state: string,
  style?: ViewStyle,
  titleStyle?: TextStyle,
  width?: number,
  changeState: Dispatch<SetStateAction<any>>,
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
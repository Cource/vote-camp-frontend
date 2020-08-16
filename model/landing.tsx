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
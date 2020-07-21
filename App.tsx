import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Picker, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

interface Option{
  title: String,
  list: Array<String>,
}

var options:Array<Option> =[
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


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{
        flexDirection: 'column'
      }}>
        <Text style={styles.header}>Campaign Details</Text>
        <Text style={{
          alignSelf: 'flex-end',
          fontSize: 20,
          fontWeight: '700'
        }}>Kerala Congress</Text>
      </View>

      <View>
        {options.map((option)=>{
          return(
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 10,
            }}>{option.title}</Text>
            <Picker style={{
              borderColor: "#0002",
              borderRadius: 50,
              height: 50,
              width: 300,
            }}>
              {option.list.map((item)=>{
                return(
                  <Picker.Item label={item} value={item}></Picker.Item>
                )
              })}
            </Picker>
          </View>
          )
        })}
      </View>
      <LinearGradient
          colors={['#5ABDFF', '#88E7FF']}
          style={{ paddingHorizontal: 25, paddingVertical:15, marginBottom: 30, alignItems: 'center', borderRadius: 100 }}>
        <TouchableOpacity style={{
        }} onPress={()=> Alert.alert("Campaigning")}>
          <Text style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: "700",
          }}>Start Campaign</Text>
        </TouchableOpacity>
      </LinearGradient>  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 35,
    fontWeight: "700",
    marginTop: 40
  }
});

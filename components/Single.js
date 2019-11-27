import React, { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ListView, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const Single = props => {

   const [dataSource, handleDataSource] = useState([]);
   const [loader, loadered] = useState(true);

   useEffect(() => {
      const { id } = props.navigation.state.params;
      fetch('https://priyaransore.com/balance/api/teachdetails/'+id, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(function(response) {
           return response.json();            
        }).then(function(member) {
            handleDataSource(member);
            setTimeout(() => {
              loadered(false)},3000);
        }.bind(this)).catch(err => {
           console.log('caught it!',err);
        })
   }, [props.navigation.state.params])


    return (
      
        <View style={{flex:1}}>
            { loader ? 

          <ActivityIndicator 
            color = 'red'
            size = 'large'
            style={{marginTop:120}}
          /> :

                <View> 
                  <Image style = {styles.imgstyle} source={require('../assets/single.jpg')} />
                  <Text style = {styles.text}>
                    {dataSource.uname}
                  </Text>
                  <View style={styles.info}>
                      <Icon name="ios-arrow-dropright" size={30} color="green" /> 
                      <Text> {"         "} </Text>
                      <Icon name="md-call" size={30} color="#900" />
                      <Text> {" "} </Text>
                      <Text style={{ fontSize:21 }}> {dataSource.unumber} </Text>
                  </View>

                  <View style={styles.info}>
                      <Icon name="ios-arrow-dropright" size={30} color="green" /> 
                      <Text> {"         "} </Text>
                      <Icon name="md-map" size={30} color="#900" />
                      <Text> {" "} </Text>
                      <Text style={{ fontSize:20, flex:1 }}> {dataSource.uaddress} </Text>
                  </View>

                  <View style={styles.info}>
                      <Icon name="ios-arrow-dropright" size={30} color="green" /> 
                      <Text> {"         "} </Text>
                      <Icon name="md-mail" size={30} color="#900" />
                      <Text> {" "} </Text>
                      <Text style={{ fontSize:17, flex:1 }}> {dataSource.uemail} </Text>
                  </View>

                  <View style={styles.info}>
                      <Icon name="ios-arrow-dropright" size={30} color="green" /> 
                      <Text> {"         "} </Text>
                      <Icon name="md-notifications-outline" size={30} color="#900" />
                      <Text> {" "} </Text>
                      <Text style={{ fontSize:20, flex:1 }}> {dataSource.uplace} </Text>
                  </View>                  
                </View>             
          }
        </View>
      
    )
}

const styles = StyleSheet.create({

  imgstyle:{
    width:400,
    height:200,
  },
  text:{
    marginTop:40,
    marginLeft:90,
    marginRight:100,
    fontSize:25,
    color:'blue',
    borderBottomWidth: 2,
    borderBottomColor:'blue',
  },
  info:{
    flexDirection:'row',
    marginLeft:40,
    marginRight:50,
    marginTop:30,
  }, 
});

export default Single; 
import React, { useEffect, useState, Component} from 'react';
import {ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ListView, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Single extends Component {

  static navigationOptions = { title:'Details' }

  constructor(props) {
    super(props);

    this.state = {
        dataSource:[],
        loader:true
    };
  }

   componentDidMount(){
    const { id } = this.props.navigation.state.params;
    fetch('https://priyaransore.com/balance/api/teachdetails/'+id, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
      }).then(function(response) {
         return response.json();            
      }).then(function(member) {
          this.setState({ 
            dataSource: member,
            loader: false
          })
      }.bind(this)).catch(err => {
         console.log('caught it!',err);
      })
   }

   render(){

    return (
      
        <View style={{flex:1}}>
            { this.state.loader ? 

          <ActivityIndicator 
            color = 'red'
            size = 'large'
            style={{marginTop:120}}
          /> :

              <ScrollView> 
                <View> 
                  <Image style = {styles.imgstyle} source={require('../assets/sss.jpg')} />
                  
                  <View>
                    <Text style = {styles.upertext}> NAME </Text>
                    <Text style = {styles.lowertext}>
                      {this.state.dataSource.uname}
                    </Text>
                  </View>

                  <View>
                    <Text style = {styles.upertext}> NUMBER </Text>
                    <Text style = {styles.lowertext}>
                      {this.state.dataSource.unumber}
                    </Text>
                  </View>

                  <View>
                    <Text style = {styles.upertext}> ADDRESS </Text>
                    <Text style = {styles.lowertext}>
                      {this.state.dataSource.uaddress}
                    </Text>
                  </View>

                  <View>
                    <Text style = {styles.upertext}> EMAIL </Text>
                    <Text style = {styles.lowertext}>
                      {this.state.dataSource.uemail}
                    </Text>
                  </View>

                  {this.state.dataSource.uroll == 'teacher' ?
                    <View style={{marginBottom:40}}>
                      <Text style = {styles.upertext}> MODE </Text>
                      <Text style = {styles.lowertext}>
                        {this.state.dataSource.uplace}
                      </Text>
                    </View>
                   : null 
                  }

                </View>             
              </ScrollView>   
          }
        </View>
      
    )
  }  
}

const styles = StyleSheet.create({

  imgstyle:{
    width:400,
    height:230,
  },
  upertext:{
    marginTop:30,
    marginLeft:40,
    marginRight:30,
    fontSize:17,
    color:'#00ffff',
    borderBottomWidth: 2,
    borderBottomColor:'#00ffff',
  },
  lowertext:{
    marginLeft:45,
    fontSize:18,
  },
  info:{
    flexDirection:'row',
    marginLeft:40,
    marginRight:50,
    marginTop:30,
  }, 
});
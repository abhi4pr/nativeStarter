import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ListView, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Logout extends Component {

   constructor(props) {
       super(props)
       this.state={

       }
   }
  
   componentDidMount(){
     AsyncStorage.removeItem('user');
     this.props.navigation.navigate('Login');
   }


  render() {
    return (
      
      <ScrollView>
        <View style={styles.container}>
          <Text style = {styles.text}>
            Anthony prince
          </Text>          
        </View>
       </ScrollView> 
      
    )
  }
}

const styles = StyleSheet.create({
  
});
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export default class Forgetpass extends Component {

  static navigationOptions = { title: 'Forget Password' }

    constructor(props){
        super(props);
        this.state = {
            uemail:''
        }
      this.handleSubmit = this.handleSubmit.bind(this);  
    }  

   handleSubmit(event){

    if(this.state.uemail.length == 0) { 
       Toast.show('Please Enter Email-ID');
    }
    else {
     event.preventDefault();
     var data = {
        uemail: this.state.uemail
     }   
     fetch('http://priyaransore.com/balance/api/lostpassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
     }).then((response) => {
        Toast.show('Password sent on your Email-ID');   
     }).catch((error) => {
        Toast.show('Email ID not exist');
     });
    }   
   }

  render() {
    return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/check2.jpg')} style={styles.container} >
            <TextInput
             placeholder = "Email"
             style = {styles.input1}
             keyboardType = 'email-address'
             onChangeText = {(TextInputText) => this.setState({uemail:TextInputText})}
            />

            <TouchableOpacity style={styles.lgnbtn}
             onPress={this.handleSubmit}>             
             <Text style={{textAlign:'center',color:'white',padding:10}}> Show My Password </Text>
            </TouchableOpacity>

          </ImageBackground>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width: 380,
      height: 700,
  },
  input1:{
    marginLeft:50,
    borderBottomWidth: 2,
    borderBottomColor:'white',
    marginRight:50,
    marginTop:200,
  },
  lgnbtn:{
    backgroundColor:'green',
    marginTop:40,
    width:285,
    height:45,
    marginLeft:45,
    marginRight:45,
  },
});
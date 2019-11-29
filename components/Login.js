import React, {Component} from 'react';
import {NetInfo, Image, Alert, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

  static navigationOptions = { header: null }

    constructor(props){
        super(props);
        this.state = {
            uemail:'',
            upass:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

   handleSubmit(event){

    if(this.state.uemail.length == 0) { 
       Toast.show('Please Enter Email-ID');
    }
    else if(this.state.upass.length == 0) {
      Toast.show('Please Enter Password');
    }
    else {
     event.preventDefault();
     var data = {
        uemail: this.state.uemail,
        upass: this.state.upass
     }   
     fetch('http://priyaransore.com/balance/api/login/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
     }).then(function(response) {
            return response.json();
        })
       .then(user => {
            if (user) {
              AsyncStorage.setItem('user', JSON.stringify(user));
              Toast.show('You Loggedin successfully');   
              this.props.navigation.navigate('Home');
              return user;
            }else{
              Toast.show('Please enter correct data');
            }
        })
       .catch((error) => {
        Toast.show('You are not connected to internet');
     });
    }   
   }

  render() {
    return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/check1.jpg')} style={styles.container} >
            
            <Image style={styles.bydefault} source={require('../assets/logo.png')} />

            <TextInput
             placeholder = "Email"
             style = {styles.input1}
             keyboardType = 'email-address'
             onChangeText = {(TextInputText) => this.setState({uemail:TextInputText})}
            />

            <TextInput
             placeholder = "Password"
             style = {styles.input}
             secureTextEntry = {true}
             onChangeText = {(TextInputText) => this.setState({upass:TextInputText})}
            />

            <TouchableOpacity style={styles.lgnbtn}
             onPress={this.handleSubmit}>
             
             <Text style={{textAlign:'center',color:'white',padding:10}}> Login </Text>
            </TouchableOpacity>

            <View style={styles.samerow}>

            <TouchableOpacity style={styles.btnstyle}
             onPress={()=> this.props.navigation.navigate('Forgetpass')}>
             <Text style={{textAlign:'center',color:'white',padding:10}}> Miss Password ? </Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.btn}
             onPress={()=> this.props.navigation.navigate('Register')}>
             <Text style={{textAlign:'center',color:'white',padding:10}}> Not Registered ? </Text>
            </TouchableOpacity> 

            </View>

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
  input:{
    marginLeft:50,
    borderBottomWidth: 2,
    borderBottomColor:'white',
    marginRight:50
  },
  lgnbtn:{
    backgroundColor:'green',
    marginTop:40,
    width:285,
    height:45,
    marginLeft:45,
    marginRight:45,
  },
  btnstyle:{
    backgroundColor:'#669900',
    marginTop:40,
    width:110,
    height:55,
    marginLeft:45,
  },
  btn:{
    backgroundColor:'#00ff99',
    marginTop:40,
    width:120,
    height:55,
    marginRight:50,
  },
  samerow:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bydefault:{
    width:150,
    height:150,
    marginLeft:110,
    marginTop:50,
    marginBottom:-110,
    borderRadius:90,
  },
});

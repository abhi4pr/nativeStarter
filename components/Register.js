import React, {Component} from 'react';
import {Picker, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export default class Register extends Component {

  static navigationOptions = { title: 'Register' }

    constructor(props){
        super(props);
        this.state = {
            uname:'',
            uemail:'',
            upass:'',
            unumber:'',
            uroll:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    async componentDidMount() {
      const userData = await AsyncStorage.getItem('user');
      if(userData){
        this.props.navigation.navigate('Home');      
      }
    }

   handleSubmit(event){

    if(this.state.uname.length == 0) { 
       Toast.show('Please Enter Name');
    }
    else if(this.state.uemail.length == 0) {
      Toast.show('Please Enter Email-ID');
    }
    else if(this.state.upass.length == 0) {
      Toast.show('Please Enter Password');
    }
    else if(this.state.unumber.length == 0) {
      Toast.show('Please Enter Number');
    }
    else {

     event.preventDefault();
     var data = {
        uname: this.state.uname,
        uemail: this.state.uemail,
        upass: this.state.upass,
        unumber: this.state.unumber,
        uroll: this.state.uroll
     }   
     fetch('http://priyaransore.com/balance/api/register/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
     }).then((response) => {
        Toast.show('You Registered successfully');
        this.props.navigation.navigate('Login');   
     }).catch((error) => {
        Toast.show('Please fill the proper entries');   
     });
    } 
   }

  render() {
    return (
        <View>
          <ImageBackground source={require('../assets/bgr.jpg')} style={styles.container} >
            <TextInput
             placeholder = "Name"
             style = {styles.input1}
             onChangeText = {(TextInputText) => this.setState({uname:TextInputText})}
            />

            <TextInput
             placeholder = "Email"
             style = {styles.input}
             keyboardType = 'email-address'
             onChangeText = {(TextInputText) => this.setState({uemail:TextInputText})}
            />

            <TextInput
             placeholder = "Password"
             style = {styles.input}
             secureTextEntry = {true}
             onChangeText = {(TextInputText) => this.setState({upass:TextInputText})}
            />

            <TextInput
             placeholder = "Number"
             style = {styles.input}
             keyboardType = 'numeric'
             onChangeText = {(TextInputText) => this.setState({unumber:TextInputText})}
            />

            <Picker
              selectedValue={this.state.uroll}
              style={styles.input}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({uroll: itemValue})
              }>
              <Picker.Item label="Select Your Roll" />
              <Picker.Item label="user" value="user" />
              <Picker.Item label="teacher" value="teacher" />
            </Picker>

            <TouchableOpacity style={styles.btnstyle}
             onPress={this.handleSubmit}>
             <Text style={{textAlign:'center',color:'white',padding:10}}> Register </Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.btnstyle1}
             onPress={()=> this.props.navigation.navigate('Login')}>
             <Text style={{textAlign:'center',color:'white',padding:10}}> Login </Text>
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
    marginTop:110,
  },
  input:{
    marginLeft:50,
    borderBottomWidth: 2,
    borderBottomColor:'white',
    marginRight:50
  },
  btnstyle:{
    backgroundColor:'green',
    marginTop:40,
    width:285,
    height:40,
    marginLeft:45,
  }, 
  btnstyle1:{
    backgroundColor:'blue',
    marginTop:40,
    width:285,
    height:40,
    marginLeft:45,
  },  
});
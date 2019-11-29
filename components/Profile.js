import React, {Component} from 'react';
import {Picker, ScrollView, PixelRatio, Image, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

export default class Profile extends Component {

  static navigationOptions = { title: 'Profile' }

    constructor(props){
        super(props);
        this.state = {
            uname:'',
            uemail:'',
            upass:'',
            unumber:'',
            uaddress:'',
            upic:'',
            id:'',
            uspecial:'',
            uplace:'',
            uroll:'',
            ImageSource:null,
            data:null,
            userDetail:[]
        }
      this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    } 

   async componentDidMount() {
    let userDetail = await AsyncStorage.getItem('user');
    userDetail = JSON.parse(userDetail);
      this.setState({ 
        id:userDetail[0].id,
        uname:userDetail[0].uname,
        uemail:userDetail[0].uemail,
        upass:userDetail[0].upass,
        unumber:userDetail[0].unumber,
        uaddress:userDetail[0].uaddress,
        upic:userDetail[0].upic,
        uspecial:userDetail[0].uspecial,
        uplace:userDetail[0].uplace,
        uroll:userDetail[0].uroll
      });        
   }

   handleSubmit(event){

     event.preventDefault();

     if(this.state.data === null){
       var data = {
          uname: this.state.uname,
          uemail: this.state.uemail,
          upass: this.state.upass,
          unumber: this.state.unumber,
          uaddress: this.state.uaddress,
          uspecial: this.state.uspecial,
          uplace: this.state.uplace
       }
     } else {
        var data = {
          uname: this.state.uname,
          uemail: this.state.uemail,
          upass: this.state.upass,
          unumber: this.state.unumber,
          uaddress: this.state.uaddress,
          upic:this.state.data,
          uspecial: this.state.uspecial,
          uplace: this.state.uplace
       }
     }
     
     const updateId = this.state.id;
     fetch('http://priyaransore.com/balance/api/profile/update/'+updateId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
     }).then((response) => {
         Toast.show('You updated your profile');   
         AsyncStorage.removeItem('user');
         this.props.navigation.navigate('Login');
     }).catch((error) => {
        console.error(error); 
     });
 
   } 

    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          <Text> choose one </Text>
        } else {

        let source = { uri: response.uri };  
        //let source =  'data:image/jpeg;base64,'+ [response.data];
          this.setState({ 
             ImageSource: source,
             data: response.data
          });
        }
      });
    }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageBackground source={require('../assets/check2.jpg')} style={styles.container} >
            
          {this.state.upic === null ? 

            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}> 
              <View>   
              { this.state.ImageSource === null ? <Image style={styles.bydefault} source={require('../assets/select.jpg')} /> :
                <Image style={styles.imgstyle} source={this.state.ImageSource} />
              }   
              </View>   
            </TouchableOpacity>

            : <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}> 
              <View>   
                { this.state.ImageSource === null ? <Image style={styles.imgstyle} source={{uri: "data:image/jpeg;base64,"+this.state.upic}} /> :
                  <Image style={styles.imgstyle} source={this.state.ImageSource} />
                }                      
              </View>   
            </TouchableOpacity>
          }

            <TextInput
              placeholder = "Name"
              style = {styles.input1}
              value = {this.state.uname}
              onChangeText = {(TextInputText) => {this.setState({uname:TextInputText})}}
            />
            
            <TextInput
             placeholder = "Email"
             style = {styles.input}
             keyboardType = 'email-address'
             value = {this.state.uemail}
             onChangeText = {(TextInputText) => {this.setState({uemail:TextInputText})}}
            />

            <TextInput
             placeholder = "Password"
             style = {styles.input}
             secureTextEntry = {false}
             value = {this.state.upass}
             onChangeText = {(TextInputText) => {this.setState({upass:TextInputText})}}
            />

            <TextInput
              placeholder = "Number"
              style = {styles.input}
              keyboardType = 'numeric'
              value = {this.state.unumber}
              onChangeText = {(TextInputText) => {this.setState({unumber:TextInputText})}}
            />        

            <TextInput
             placeholder = "Address"
             style = {styles.input}
             value = {this.state.uaddress}
             onChangeText = {(TextInputText) => {this.setState({uaddress:TextInputText})}}
            />

            {this.state.uroll == 'teacher' ? 
              <Picker
                selectedValue={this.state.uspecial}
                style = {styles.drop}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({uspecial: itemValue})
                }>
                <Picker.Item label="Select Your Speciality" />
                <Picker.Item label="Maths" value="Maths" />
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Hindi" value="Hindi" />
                <Picker.Item label="Science" value="Science" />
                <Picker.Item label="Social" value="Social" />
                <Picker.Item label="Sanskrit" value="Sanskrit" />
                <Picker.Item label="All" value="All" />
              </Picker>
              : null
            }
            
            {this.state.uroll == 'teacher' ? 
              <Picker
                selectedValue={this.state.uplace}
                style = {styles.drop}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({uplace: itemValue})
                }>
                <Picker.Item label="Select Your Mode" />
                <Picker.Item label="Home tution" value="Home tution" />
                <Picker.Item label="Coaching class" value="Coaching class" />
                <Picker.Item label="Anywhere" value="Anywhere" />
              </Picker>
              : null
            }  


            <TouchableOpacity style={styles.btnstyle}
             onPress={this.handleSubmit}>
             <Text style={{textAlign:'center',color:'white',padding:10}}> Update </Text>
            </TouchableOpacity> 

          </ImageBackground>  
        </View>
      </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
      width: 380,
      height: 800,
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
  drop:{
    width:300,
    height:50,
    marginLeft:50,
  },
  imgstyle:{
    width:160,
    height:150,
    marginLeft:100,
    marginTop:30,
    marginBottom:-60,
    borderRadius:90,
  },
  bydefault:{
    width:160,
    height:150,
    marginLeft:100,
    marginTop:30,
    marginBottom:-60,
    borderRadius:90,
  },
});
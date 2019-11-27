import React, {Component} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer';
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import SingleScreen from './Single';
import customimg from './customimg';
import ForgetpassScreen from './Forgetpass';
import LogoutScreen from './Logout';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

class AuthLoadingScreen extends Component {
  constructor(props){
    super(props);
    this.loadData();
  }

  render(){
    return(
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  async loadData(){
    const userData = await AsyncStorage.getItem('user');
    //this.props.navigation.navigate(userData == 'user' ? 'App' : 'Auth');
    if(userData){
      this.props.navigation.navigate('Home');
    }
    else{
      this.props.navigation.navigate('Login');      
    }
  }
  
}

const AppDrawerNavigator = createDrawerNavigator({

  Home: { screen : HomeScreen,
    navigationOptions: () => ({
      title: 'Home',
    }) 
  },
  Profile: { screen : ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
    }) 
  },
  Single: { screen : SingleScreen,
    navigationOptions: () => ({
      drawerLabel: ()=>null,
    })
  },
  Logout: { screen : LogoutScreen,
    navigationOptions: () => ({
      title: 'Logout',
    })
  },
},
  {
    contentComponent: customimg
  }
);

const AuthStackNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },   
  Forgetpass: { screen: ForgetpassScreen },   
});

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoadingScreen: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: {
    screen: AppDrawerNavigator
  }
});

export default createAppContainer(AppSwitchNavigator);
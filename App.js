import React, {Component} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppNavigator from './components/AppNavigator';

export default class App extends Component {
  render(){
    return (
      <AppNavigator />
    );
  }  
};
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ListView, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
//import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';

export default class customimg extends Component {

  constructor() {
    super();
    this.items = [
      {
        navOptionThumb: 'home',
        navOptionName: 'Home',
        screenToNavigate: 'Home',
      },
      {
        navOptionThumb: 'face',
        navOptionName: 'Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: 'bookmark',
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
    ];
  }
  
  render() {
    return (
      
        <View style={styles.sideMenuContainer}>
        <Image
          source={require('../assets/single.jpg')}
          style={styles.sideMenuProfileIcon}
        />
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 1,
          }}
        />
        <View style={{ width: '100%', marginTop:30}}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  sideMenuProfileIcon: {
    width: 280,
    height: 150,
  },
});
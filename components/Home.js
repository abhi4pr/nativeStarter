import React, {Component} from 'react';
import {ActivityIndicator, RefreshControl, FlatList, ScrollView, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ListView, Image} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props);

    this.state = {
        dataSource:[],
        refreshing:true,
        loading:true
    };
  }

  GetTData(){
    fetch("https://priyaransore.com/balance/api/teacherlist")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({ 
        refreshing: false,
        dataSource: responseJson,
        loading: false
      })
     })
    .catch(error => console.log(error))
  }

  GetUData(){
    fetch("https://priyaransore.com/balance/api/userlist")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({ 
        refreshing: false,
        dataSource: responseJson,
        loading: false
      })
     })
    .catch(error => console.log(error))
  }

  async componentDidMount(){
    let userDetail = await AsyncStorage.getItem('user');
    userDetail = JSON.parse(userDetail);

    if(userDetail[0].uroll == 'user'){      
      this.GetTData();
    }else{
      this.GetUData();
    }
  }

  onRefresh() {
    this.setState({ dataSource: [] });
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {

    const { params } = this.props.navigation.state;
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex:1}}>

       <View style={styles.inliii}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../assets/drawer.png')}
            style={{ width:25, height:35, marginLeft:10, marginTop:10, marginBottom:10 }}
          />
        </TouchableOpacity>
          <Text style={{fontSize:20,marginLeft:100,marginTop:11}}>
            Welcome
          </Text>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Search')}>
            <Icon name="md-search" size={30} color="black" 
             style={{ width:25, height:35, marginLeft:94, marginTop:14, marginBottom:10 }}
            />
        </TouchableOpacity>  
       </View>

      <ScrollView>
        <View>

        { this.state.loading ? 

          <ActivityIndicator 
            color = 'red'
            size = 'large'
            style={{marginTop:120}}
          />

        :  <FlatList
              data = {this.state.dataSource}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem = {({item})=>
                  <TouchableOpacity
                    style = {styles.container}
                    onPress = {() => navigate('Single', {id: item.id})}
                  >

                    <View style={styles.sameee}>
                      
                      {item.upic === null ? 
                        <View>   
                          <Image style={styles.imgstyle} source={require('../assets/select.jpg')} />
                        </View>   

                        :  
                         <View>   
                          <Image style = {styles.imgstyle} source={{uri: "data:image/jpeg;base64,"+item.upic}} />                      
                         </View>   
                      }
                      
                      <Text style = {styles.text}>
                        {item.uname}
                      </Text>
                      <Text style = {styles.para}>
                        He is trying to find a tutor near you, you can contact him/her to get them
                      </Text>
                    </View>

                  </TouchableOpacity>
              }
              keyExtractor = {item=>item.id.toString()}
          />

        }
        
        </View>
      </ScrollView> 
     </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding: 15,
      marginTop: 2,
      borderBottomColor:'black',
      borderBottomWidth:1,
   },
   text: {
      color: 'black',
      fontSize:24,
      marginLeft:20,
      flex:1,
   },
   imgstyle:{
      width:80,
      height:80,
      borderRadius:90,
   },
   sameee:{
      flexDirection:'row',
   },
   para:{
      marginRight:10,
      marginLeft:-220,
      flex: 1,
      flexWrap: 'wrap',
      marginTop:30,
   },
   inliii:{
      flexDirection:'row',
      backgroundColor:'#99FF33',
      marginBottom:5,
   },
});
import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

export default class Search extends Component {

  static navigationOptions = { title: 'Search' }

  constructor(props) {
    super(props);
    this.state = {
      films: [],
      query: '',
    };
  }

  componentDidMount() {
    fetch(`https://priyaransore.com/balance/api/commonlist`)
      .then(res => res.json())
      .then(json => {
        this.setState({ films:json });
      });
  }

  findFilm(query) {
    if (query === '') {
      return [];
    }
 
    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter(film => film.uname.search(regex) >= 0);
  }
 
  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
 
    return (
      <View>
       <ImageBackground source={require('../assets/search.jpg')} style={styles.barr}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.beauty}
          listContainerStyle={styles.dada}
          data={films.length === 1 && comp(query, films[0].uname) ? [] : films}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Name"
          renderItem={({ item }) => (
            
            <TouchableOpacity 
             onPress={() => this.props.navigation.navigate('Single', {id: item.id})}
             style={styles.sresults}
            >
              <Text style={styles.itemText}>
                {item.uname}
              </Text>
            </TouchableOpacity>
          )}
        />
       </ImageBackground> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  barr: {
    padding: 16,
    width: 360,
    height: 800,
  },
  autocompleteContainer: {
    flex: 1,
    marginTop: 130,
  },
  beauty:{
    borderRadius: 1,
    borderWidth: 5,
    borderColor: '#d6d7da',
  },
  dada:{
    width: 347,
    marginLeft:-10,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  sresults:{
    
  },
});

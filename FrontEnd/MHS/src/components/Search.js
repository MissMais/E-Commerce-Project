import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
 
  return (
    <TouchableWithoutFeedback >
      <View>
        <SearchBar
          placeholder="Search For ...."
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            paddingHorizontal: 0,
            marginVertical: 45,
            shadowColor: '#808080',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 5,
            shadowRadius: 4,
            height: 30,
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            borderRadius: 20,
          }}
          inputContainerStyle={{ backgroundColor: '#e3e3e3', borderRadius: 30 }}
          searchIcon={<Ionicons name="search" size={24} color="#666F80" />}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;
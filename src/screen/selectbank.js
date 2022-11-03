//import React in our code
import React, { useEffect,useState,useRef } from 'react';

//import all the components we are going to use
import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function SelectAccount ({ route, navigation }) 
{
  const { TOKEN } = route.params;
  
  useEffect(() => {
  
    fetchData();
    
  }, []);

 


  const fetchData = async () => {

  axios.get('http://192.168.43.240:8000/api-get-bank/', 
  {
    headers: {
      'Authorization': `Token ${TOKEN}` 
    }

})
.then(function (response) {
console.log(response.status);
console.log(response.data.bank);
setListItems(response.data.bank);

})
.catch(function (error) {
console.log(error);
});
  
  };
 

  console.log(listItems)

  const [listItems, setListItems] = useState();

  const ItemView = ({ item }) => {

    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <View>
        <Text style={styles.item} onPress={()=>navigation.navigate('AddWithdrawAccount',{
            bankName: item.bank_name,
            bankCode: item.bank_code,
            Authtoken:TOKEN,
          })}>
          {item.bank_name}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert('Bank Code : ' + item.bank_code + ' Value : ' +item.bank_name);

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.footer}>
        <Text animation="bounceIn" style={styles.preboto}>Choose Bank</Text>
      <StatusBar style="none" />
      
        <FlatList
          data={listItems}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
      </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,   
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    

  },

  preboto: {
    color:'#0f2c40',
    fontSize: 20,
    fontWeight:'bold',
    marginBottom:20
    
    
  },

});



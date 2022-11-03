//import React in our code
import React, { useEffect,useState,useRef } from 'react';

//import all the components we are going to use
import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing, StatusBar, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableRipple } from 'react-native-paper';


export default function SelectWithdrawAccount ({ route, navigation }) 
{
  const { TOKEN } = route.params;
  
  useEffect(() => {
  
    fetchData();
    
  }, []);

  const fetchData = async () => {

  axios.get('http://192.168.43.240:8000/api-get-withdraw-account/', 
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
  const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
  useEffect(()=>{
    //Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })
  const ItemView = ({ item }) => {

    return (
      // Single Comes here which will be repeatative for the FlatListItems
      
        <TouchableRipple style={styles.item}onPress={()=>navigation.navigate('Withdraw',{
            bankName: item.bank_name,
            bankId: item.id,
            Number: item.acct_number,
            Name: item.acct_name,
            acc_owner: item.owner_id,
            Authtoken:TOKEN,
      })}>

            <View style={styles.item}>
            <Text style={{fontSize:25, fontWeight:'bold', alignSelf:'center'}}>
            {item.bank_name} 
            </Text>
            <Text style={{fontSize:18,color:'green',fontWeight:'bold', alignSelf:'center'}}>
            {item.acct_name}
            </Text>
            <Text style={{fontSize:16,color:'#000', letterSpacing:5, fontWeight:'900', alignSelf:'center'}}>
            {item.acct_number}
            </Text>
            </View>

      </TouchableRipple>
        
        
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
        <Text animation="bounceIn" style={styles.preboto}>Choose or Add Withdraw Account</Text>
        <StatusBar translucent backgroundColor="transparent" style='dark'/> 

      <Pressable style={styles.add} onPress={()=>navigation.navigate('SelectAccount',{
            TOKEN: TOKEN,
          })}>
      <Text style={{fontSize:20, fontWeight:'noraml', color:'white', textAlignVertical:'center'}}>+Add</Text>
    </Pressable>
      
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
    padding: 0,
    height: 70,
    marginTop:10,
    marginLeft:0,
    height:100,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 0,
    alignItems: 'stretch',
    

  },

  preboto: {
    color:'#0f2c40',
    fontSize: 18,
    fontWeight:'bold',
    marginBottom:20,
    marginLeft:20

    
    
  },

  add: {
    alignItems: 'center',
    alignSelf:'flex-end',
    justifyContent: 'center',
    height:45,
    width:'100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#00a62c',
    marginTop: 0,
    marginRight:40,
    marginBottom:10,
    backgroundColor: '#00a62c',
  },

});



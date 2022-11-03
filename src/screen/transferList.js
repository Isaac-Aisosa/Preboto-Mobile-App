//import React in our code
import React, { useEffect,useState,useRef } from 'react';

//import all the components we are going to use
import { FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function TransferList ({ route, navigation }) 
{
  //const { TOKEN } = route.params;
 // const token = route.params.TOKEN;
 const [token, setToken] = useState('');

 AsyncStorage.getItem('token')
 .then((value) => {
 const data = JSON.parse(value);
 setToken(data)
 });

  const FetchData = async () => {
   // await delay(5000);
    console.log("Waited 5s");
    axios.get('http://192.168.43.240:8000/api-get-transfer-transaction/', 
    {
      headers: {
        'Authorization': `Token ${token}` 
      }
  
  })
  .then(function (response) {
  console.log(response.status);
  console.log(response.data.transfer);
  setListItems(response.data.transfer);
  
  })
  .catch(function (error) {
  console.log(error);
  });
  };
 

  console.log(listItems)

  const [listItems, setListItems] = useState();
  const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
  useEffect(()=>{
    
     FetchData();
    //Animated.timing(translateX,{toValue:0,duration:2000}).start();
    const reload = setInterval(() => {
      FetchData()
    }, 1000 * 20) // in milliseconds
    return () => clearInterval(reload)
  },[token])

 
  
  const ItemView = ({ item }) => {

    return (
      // Single Comes here which will be repeatative for the FlatListItems
     
        <View style={{width:Dimensions.get("window").width-10}} onPress={()=>navigation.navigate('AddWithdrawAccount',{
            bankName: item.bank_name,
            bankCode: item.bank_code,
           
          })}>
            <View style={{ width:'100%', height:50, marginLeft:5}}>
              <View>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
            {'₦' + item.amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
            <Text style={{fontSize:14, fontWeight:'bold'}}>
            {item.recipientName}
            </Text>
            <Text style={{fontSize:11}}>
            {item.timestamp}
            </Text>
            </View>
    
   <View style={{marginTop:10, alignSelf:'flex-end', position:'absolute'}}>

       {item.pending ? (
       <View style={{backgroundColor:'#f7df4a', width:80,height:30, marginRight:5, borderRadius:5, marginBottom:10, alignSelf:'flex-end'}}>
       <Text style={{alignSelf:'center', marginRight:10, marginTop:5,color:'#808080' }}>Pending..</Text>
       </View>
      ) : (
        <View></View>
      )}

    {item.complete ? (
       <View style={{backgroundColor:'#00b300', width:80,height:30, marginRight:5, borderRadius:5, marginBottom:10, alignSelf:'flex-end'}}>
       <Text style={{alignSelf:'center', marginRight:10, marginTop:5,color:'#fff' }}>Success</Text>
       </View>
      ) : (
        <View></View>
      )} 

      {item.failed ? (
       <View style={{backgroundColor:'#f05d5d', width:80,height:30, marginRight:5, borderRadius:5, marginBottom:10, alignSelf:'flex-end'}}>
       <Text style={{alignSelf:'center', marginRight:10, marginTop:5,color:'#fff' }}>Failed</Text>
       </View>
      ) : (
        <View></View>
      )}   


            </View>


            </View>
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
    padding: 5,
    height: 80,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'stretch',
    

  },

  preboto: {
    color:'#0f2c40',
    fontSize: 20,
    fontWeight:'bold',
    marginBottom:20
    
    
  },

});



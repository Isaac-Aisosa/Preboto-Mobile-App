import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState,useRef } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView, Dimensions, Animated, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  LineChart,
  
} from "react-native-chart-kit";
import { TouchableRipple } from 'react-native-paper';

export default function Chat({ navigation })
 {
  const [token, setToken] = useState('');
  const [listItems, setListItems] = useState();
  //const [chartItems, setChartItems] = useState([12,13]);

  AsyncStorage.getItem('token')
  .then((value) => {
  const data = JSON.parse(value);
  setToken(data)
  });
 
   const FetchData = async () => {
     axios.get('http://192.168.43.240:8000/api-get-account-trade-history/', 
     {
       headers: {
         'Authorization': `Token ${token}` 
       }
   
   })
   .then(function (response) {
  // console.log(response.status);
   console.log(response.data.trade);
   setListItems(response.data.trade);
   
   })
   .catch(function (error) {
   //console.log(error);
   });
   }

//    const FetchChartData = async () => {
//     axios.get('http://192.168.43.240:8000/api-get-last-six-account-trade/', 
//     {
//       headers: {
//         'Authorization': `Token ${token}` 
//       }
  
//   })
//   .then(function (response) {
//  // console.log(response.status);
//   console.log(response.data.trade);
//   setChartItems(response.data.trade);
  
//   })
//   .catch(function (error) {
//   //console.log(error);
//   });
//   }
 
   //console.log(listItems)

   const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
   useEffect(()=>{
     
      FetchData();
     // FetchChartData ();
     //Animated.timing(translateX,{toValue:0,duration:2000}).start();
     const reload = setInterval(() => {
       FetchData();
      // FetchChartData ();
     }, 1000 * 20) // in milliseconds
     return () => clearInterval(reload)
   },[token])
 
    const ItemView = ({ item }) => {
 
     return (
       // Single Comes here which will be repeatative for the FlatListItems
      
       <TouchableRipple style={{width:Dimensions.get("window").width-10,}} onPress={()=>navigation.navigate('TradeDetails',{
         inputAmount: item.inputAmount,
         outputAmount: item.outputAmount,
         returns: item.returns,
         gain: item.gain,
         loss: item.loss,
         timestamp: item.timestamp,
       })}>
        
             <View style={{ width:'100%', height:50}}>
               <View style={{marginVertical:10}}>
             <Text style={{fontSize:12, fontWeight:'bold'}}>
             {'Trade ₦' + item.inputAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' to  ₦' + item.outputAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
             </Text>
             <Text style={{fontSize:11}}>
             {item.timestamp}
             </Text>
             </View>
     
      <View style={{ marginTop:10, alignSelf:'flex-end', position:'absolute'}}>     
        {item.gain ? (
        <View style={{backgroundColor:'#00b300', width:80,height:30, marginRight:5, borderRadius:5, marginBottom:10, alignSelf:'flex-end'}}>
        <Text style={{alignSelf:'center', marginRight:10, marginTop:5,color:'#fff', fontSize:12 }}>
        { '+' + (item.returns / item.inputAmount * 100).toFixed(1) + "%"}
          
          </Text>
        </View>
       ) : (
         <View></View>
       )}
 
 
       {item.loss ? (
        <View style={{backgroundColor:'#f05d5d', width:80,height:30, marginRight:5, borderRadius:5, alignSelf:'flex-end', marginBottom:10}}>
        <Text style={{alignSelf:'center', marginRight:10, marginTop:5,color:'#fff', fontSize:12}}>
        {(item.returns / item.inputAmount * 100).toFixed(1) + "%"}
          </Text>
        </View>
       ) : (
         <View></View>
       )}   
    </View>
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
 
  
  return (
      <View style={styles.container}>
    <View style={styles.footer}>
    <StatusBar style="dark"/>
  <LineChart
    data={{
      labels:['wee','eer'],
      datasets: [
        {
          data:  [23,233]
          
        }
      ]
    }}
    width={Dimensions.get("window").width-10} // from react-native
    height={250}
    yAxisLabel="₦"
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#000566",
      backgroundGradientFrom: "#000566",
      backgroundGradientTo: "#6c6ee0",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 5
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginBottom: 10,
      borderRadius: 5,
      display:'none'
    }}
  />
   
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
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },

  footer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    alignItems:'center',
    alignSelf:'center'
  },

  chart:{
  width:'100%',
  marginTop:10,
  height:Dimensions.get("window").height-10,
  },

  logo: {
      width: 150,
      height: 150

  },

  text: {
   
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 4
   
},

preboto: {
  color:'#0f2c40',
  fontSize: 40,
  fontWeight:'bold'
  
},
title: {
  color:'#363636',
  fontSize: 16,
  fontWeight:'bold',
  marginLeft:10
  
},

button: {
  marginBottom:30,
  
  
},



});

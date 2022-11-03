import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EmailLogin from './login'
import EmailReg from './register'
import Create_Profile from './create_profile'
import TransactionCode from './transaction_code';
import index from '../screen/index'
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='EmailLogin' component={EmailLogin}/>
        <RootStack.Screen name='EmailReg' component={EmailReg}/>
        <RootStack.Screen name='TransactionCode' component={TransactionCode}/>
        <RootStack.Screen name='Create_Profile' component={Create_Profile}/>
        <RootStack.Screen name='index' component={index}/>
    </RootStack.Navigator>
);
export default RootStackScreen;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tab from './tab'
// import Sercurity from '../Auth/security'
import Auth from '../Auth/auth'
import Deposit from './deposit'
import DepositSummary from './depositSummary'
import DepositComplete from './DepositComplete'
import Transfer from './Transfer';
import TransferSummary from './transferSummary';
import TransferComplete from './TransferComplete';
import Withdraw from './withdraw'
import AddWithdrawAccount from './AddWithdrawAccount'
import SelectAccount from './selectbank'
import SelectWithdrawAccount from './selectWithdrawAccount'
import WithdrawComplete from './withdrawComplete'
import DepositDetails from './depositDetails'
import WithdrawDetails from './withdrawDetails'
import TradeDetails from './tradeDetails'
import Policy from './policy'
import Website from './website'
import About from './about'

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) =>(
    <RootStack.Navigator headerMode='none'>
       
        <RootStack.Screen name='Tab' component={Tab}/>
        <RootStack.Screen name='Auth' component={Auth}/>
        <RootStack.Screen name='Deposit' component={Deposit}/>
        <RootStack.Screen name='DepositSummary' component={DepositSummary}/>
        <RootStack.Screen name='DepositComplete' component={DepositComplete}/>
        <RootStack.Screen name='Transfer' component={Transfer}/>
        <RootStack.Screen name='TransferSummary' component={TransferSummary}/>
        <RootStack.Screen name='TransferComplete' component={TransferComplete}/>
        <RootStack.Screen name='Withdraw' component={Withdraw}/>
        <RootStack.Screen name='AddWithdrawAccount' component={AddWithdrawAccount}/>
        <RootStack.Screen name='SelectAccount' component={SelectAccount}/>
        <RootStack.Screen name='SelectWithdrawAccount' component={SelectWithdrawAccount}/>
        <RootStack.Screen name='WithdrawComplete' component={WithdrawComplete}/>
        <RootStack.Screen name='DepositDetails' component={DepositDetails}/>
        <RootStack.Screen name='WithdrawDetails' component={WithdrawDetails}/>
        <RootStack.Screen name='TradeDetails' component={TradeDetails}/>
        <RootStack.Screen name='Policy' component={Policy}/>
        <RootStack.Screen name='Website' component={Website}/>
        <RootStack.Screen name='About' component={About}/>
    </RootStack.Navigator>
);
export default RootStackScreen;

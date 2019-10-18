import React from 'react';
import {View, Text} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Drawer from '../screens/Drawer';
import CustomerSupport from '../screens/CustomerSupport';
import Messages from '../screens/Messages';
import Users from '../screens/Users';
import Loading from '../screens/Loading';

// const finalDrawer = createStackNavigator({
//   Drawer: Drawer
// })

const UserStuff = createStackNavigator({
  Users
})

const MessagesStuff = createStackNavigator({
  Messages
})

const CustomerSupportStuff = createStackNavigator({
  CustomerSupport
})

const BottomNavigator = createBottomTabNavigator({
    Users: UserStuff,
    Messages: MessagesStuff,
    CustomerSupport: CustomerSupportStuff,
}, {
   
    
    //   defaultNavigationOptions: ({ navigation }) => ({
    //     headerTitleStyle: {
    //       flex: 1,
    //       textAlign: 'center',
    //       color: 'orange',
    //       paddingTop: 10,
    //     },
    //     headerStyle: {
    //       backgroundColor: '#000',
    //       borderBottomWidth: 0,
    //     },
    //     // eslint-disable-next-line react/prop-types
    //     tabBarIcon: () => {
    //       const { routeName } = navigation.state
    //       if (routeName == 'Users') {
    //         return <Text>Users</Text>
    //       }
    //     }, 
    //     tabBarOptions: {
    //       showIcon: true
    //     }
    // }) 
    headerMode: 'none'
  });

const SwitchNavigator = createSwitchNavigator({
    Loading: {
      screen: Loading,
    },
    SecondTier: BottomNavigator,
  } 
  );

  const AppNavigator = createStackNavigator({
    SwitchNavigator,
    BottomNavigator: {
      screen: BottomNavigator,
    },
  }, {
    headerMode: 'none'
  })
  // {initialRouteName: 'Drawer'}
  
const DrawerNavigator = createDrawerNavigator({
  Main: AppNavigator,
});

// const final = createStackNavigator({
//   DrawerNavigator
// })
  export default createAppContainer(DrawerNavigator);
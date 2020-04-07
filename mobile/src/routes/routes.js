import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

import Main from '../pages/Main';
import Search from '../pages/Search';
import Cart from '../pages/Cart';
import Perfil from '../pages/Perfil';
import Notification from '../pages/Notification';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Apresentation from '../pages/Apresentation';

const { Screen, Navigator } = createBottomTabNavigator();
const { Screen: Stack, Navigator: StackNavigator } = createStackNavigator();

export default function Routes() {
   const isLogin = true;

   return (
      <NavigationContainer>
         {isLogin ? (
            <Navigator
               screenOptions={{ headerShown: false }}
               tabBarOptions={{
                  activeTintColor: '#FF5858',
                  inactiveTintColor: 'grey',
                  style: {
                     height: 75,
                     margin: 0,
                     padding: 0,
                  },
                  labelStyle: {
                     marginBottom: 15,
                     marginTop: -20,
                     padding: 0,
                  },
               }}
            >
               <Screen
                  name="Main"
                  component={Main}
                  options={{
                     tabBarLabel: 'Inicio',
                     tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-home" size={size} color={color} />
                     ),
                  }}
               />
               <Screen
                  name="Doar"
                  component={Search}
                  options={{
                     tabBarLabel: 'Doar',
                     tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-search" size={size} color={color} />
                     ),
                  }}
               />
               <Screen
                  name="Cart"
                  component={Cart}
                  options={{
                     tabBarLabel: 'Carrinho',
                     tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-cart" size={size} color={color} />
                     ),
                  }}
               />
               <Screen
                  name="Perfil"
                  component={Perfil}
                  options={{
                     tabBarLabel: 'Perfil',
                     tabBarIcon: ({ color, size }) => (
                        <Ionicons
                           name="ios-contact"
                           size={size}
                           color={color}
                        />
                     ),
                  }}
               />
               <Screen
                  name="Notification"
                  component={Notification}
                  options={{
                     tabBarLabel: 'Notificações',
                     tabBarIcon: ({ color, size }) => (
                        <Ionicons
                           name="ios-notifications"
                           size={size}
                           color={color}
                        />
                     ),
                  }}
               />
            </Navigator>
         ) : (
            <StackNavigator>
               <Stack name="Mercadão" component={Apresentation} />
               <Stack name="Login" component={Login} />
               <Stack name="Register" component={Register} />
            </StackNavigator>
         )}
      </NavigationContainer>
   );
}

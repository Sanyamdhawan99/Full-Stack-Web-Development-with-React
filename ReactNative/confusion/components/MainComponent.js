import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';

const HomeNavigator = createStackNavigator()

function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff",        
                },
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />       
        </HomeNavigator.Navigator>
    );
}

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Details"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator()

function MainNavigatorScreen() {
    return(
        <MainNavigator.Navigator drawerStyle={{backgroundColor: "#D1C4E9"}}>
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
            />  
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
            />       
        </MainNavigator.Navigator>
    );
}


class Main extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
    }  

    render() {
    
        return (
            <NavigationContainer >
                <MainNavigatorScreen />     
            </NavigationContainer>
        );
    }
}
  
export default Main;
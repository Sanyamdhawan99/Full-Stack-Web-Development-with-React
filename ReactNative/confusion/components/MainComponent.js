import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
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

const AboutNavigator = createStackNavigator()

function AboutNavigatorScreen() {
    return(
        <AboutNavigator.Navigator
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
                name="About Us"
                component={About}
            />       
        </AboutNavigator.Navigator>
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

const ContactNavigator = createStackNavigator()

function ContactNavigatorScreen() {
    return(
        <ContactNavigator.Navigator
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
                name="Contact Us"
                component={Contact}
            />       
        </ContactNavigator.Navigator>
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
                name="About Us"
                component={AboutNavigatorScreen}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
            />    
            <MainNavigator.Screen
            name="Contact Us"
            component={ContactNavigatorScreen}
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
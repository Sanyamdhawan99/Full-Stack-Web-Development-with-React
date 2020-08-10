import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Reservation from './ReservationComponent';
import Favorite from './FavoriteComponent';
import Contact from './ContactComponent';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators'; 

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
  })

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image source={require('./images/logo.png')} style={styles.drawerImage} />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}> Ristorante Con Fusion </Text>
            </View>
        </View>
        <DrawerItemList {...props} />
    </ScrollView>
);

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
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
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
            <AboutNavigator.Screen
                name="About Us"
                component={About}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
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
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
            />
            <MenuNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Details"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const FavoritesNavigator = createStackNavigator()

function FavoritesNavigatorScreen() {
    return(
        <FavoritesNavigator.Navigator
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
            <FavoritesNavigator.Screen
                name="My Favorites"
                component={Favorite}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
            />       
        </FavoritesNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator()

function ReservationNavigatorScreen() {
    return(
        <ReservationNavigator.Navigator
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
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
            />       
        </ReservationNavigator.Navigator>
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
            <ContactNavigator.Screen
                name="Contact Us"
                component={Contact}
                options={
                    ({navigation}) => ({
                        headerLeft: () => (
                            <Icon 
                                name="menu"
                                size={24}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )       
                    })
                }
            />       
        </ContactNavigator.Navigator>
    );
}

const MainNavigator = createDrawerNavigator()

function MainNavigatorScreen() {
    return(
        <MainNavigator.Navigator 
            drawerStyle={{backgroundColor: "#D1C4E9"}}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <MainNavigator.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="home"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />  
            <MainNavigator.Screen
                name="About Us"
                component={AboutNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="info"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="list"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />   
            
            <MainNavigator.Screen
                name="My Favorites"
                component={FavoritesNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="heart"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />     

            <MainNavigator.Screen
                name="Reserve Table"
                component={ReservationNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="cutlery"
                            type="font-awesome"
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            /> 

            <MainNavigator.Screen
                name="Contact Us"
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon 
                            name="address-card"
                            type="font-awesome"
                            size={22}
                            color={tintColor}
                        />
                    )
                }}
            />       
        </MainNavigator.Navigator>
    );
}


class Main extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }  

    render() {
    
        return (
            <NavigationContainer >
                <MainNavigatorScreen />     
            </NavigationContainer>
        );
    }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Alert} from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as ImageManipulator from "expo-image-manipulator";

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({ username: userinfo.username })
                    this.setState({ password: userinfo.password })
                    this.setState({ remember: true })
                }
            })
    }

    static NavigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
    };

    handleLogin() {
        if(this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
            }))
            .catch((error) => Alert.alert('', 'Coud not save user info due to error' + error));
        } 
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => Alert.alert('', 'Coud not delete user info due to error' + error));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input  
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input  
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                /> 
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title=" Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{backgroundColor: '#512DA8'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')}
                        title=" Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        // buttonStyle={{backgroundColor: '#512DA8'}}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status ==='granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 4]
            });
            if(!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        let capturedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4]
        });
        if(!capturedImage.cancelled) {
            console.log(capturedImage);
            this.processImage(capturedImage.uri);
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: ImageManipulator.SaveFormat.PNG}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri});
    }

    static NavigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon 
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
            }))
            .catch((error) => Alert.alert('', 'Coud not save user info due to error' + error));
        } 
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => Alert.alert('', 'Coud not delete user info due to error' + error));
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source= {{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button 
                            title='Camera'
                            onPress={this.getImageFromCamera} 
                        />
                         <Button 
                            title='Gallery'
                            onPress={this.getImageFromGallery} 
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <Input  
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input  
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    /> 
                    <Input  
                        placeholder='First Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input  
                        placeholder='Last Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input  
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.handleRegister()}
                            title=" Register "
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'            
                                    size={24}
                                    color= 'white'
                                />
                            }
                            buttonStyle={{backgroundColor: '#512DA8'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const tabNavigator = createBottomTabNavigator();

function Login() {
    return(
        <NavigationContainer independent={true}>
            <tabNavigator.Navigator
                initialRouteName='Login'
                tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'gray'
                }}>
                <tabNavigator.Screen 
                name='Login' 
                component={LoginTab}
                options={{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                          name='sign-in'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      )
                }}
                />
                <tabNavigator.Screen 
                    name='Register' 
                    component={RegisterTab}
                    options={{
                        title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon
                              name='user-plus'
                              type='font-awesome'            
                              size={24}
                              iconStyle={{ color: tintColor }}
                            />
                          )
                    }}
                />
            </tabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-evenly'
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },  
    formInput: {
        margin: 0
    },
    formCheckbox: {
            margin: 10,
            backgroundColor: null
    },
    formButton: {
        margin: 20
    }
});

export default Login;
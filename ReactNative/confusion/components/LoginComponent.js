import React, { Component } from 'react';
import { View, Button, StyleSheet, Alert} from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

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
        title: 'Login'
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
                    placeholder='username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input  
                    placeholder='password'
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
                        title="Login"
                        color="#512DA8"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
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
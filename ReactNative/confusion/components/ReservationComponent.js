import React, { Component } from  'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date',
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests + '\nSmoking?: ' + this.state.smoking + 
                '\nDate and Time: ' + this.state.date,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date); 
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            {cancelable: false}
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        }); 
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if(permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();

        const defaultCalendarSource =
            Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };

        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        tempdate = Date.parse(date);
        startdate = new Date(tempdate)
        enddate = new Date(tempdate + 2*60*60*1000);
        Calendar.createEventAsync(
            newCalendarID,
            {
                title: 'Con Fusion Table Reservation',
                startDate: startdate,
                endDate: enddate,
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
            
        );
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})} 
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState( {smoking: value} )}
                        >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <TouchableOpacity style={styles.formItem}
                                style={{
                                    padding: 7,
                                    borderColor: '#512DA8',
                                    borderWidth: 2,
                                    flexDirection: "row",
                                }}
                                onPress={() => this.setState({ show: true, mode: 'date' })}
                        >
                            <Icon type='font-awesome' name='calendar' color='#512DA8' />
                            <Text >
                                {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
                            </Text>
                        </TouchableOpacity>

                        {this.state.show && (
                            <DateTimePicker
                                value={this.state.date}
                                mode={this.state.mode}
                                minimumDate={new Date()}
                                minuteInterval={30}
                                onChange={(event, date) => {
                                    if (date === undefined) {
                                        this.setState({ show: false });
                                    }
                                    else {
                                        this.setState({
                                            show: this.state.mode === "time" ? false : true,
                                            mode: "time",
                                            date: new Date(date)
                                        });
                                    }
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.formRow}>
                        <Button 
                            title="Reserve"
                            color="#512DA8"
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;
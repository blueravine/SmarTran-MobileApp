import React, { Component } from 'react';

import { Platform, StyleSheet,Dimensions, View, Text, Image,AsyncStorage, TouchableOpacity,StatusBar, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
// import Registration from "./Registration"; // 4.0.0-beta.31
var mobiledata={mobile: null,jwttoken:null};
var paramsmobile={tempnumber:'',jwttoken:null};
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

        setTimeout(() => {
             AsyncStorage.getItem('mobileno')
                .then((mobileno) => {
                    paramsmobile.tempnumber = mobileno;
                }).done(() => {
                 if(!(paramsmobile.tempnumber)) {
                     Actions.registerScreen();
                 }
                 else{
                     AsyncStorage.getItem('jwttoken')
                         .then((jwttoken) => {
                             paramsmobile.jwttoken = jwttoken;
                         }).done(() =>{
                             if(!(paramsmobile.jwttoken)){
                                 Actions.loginScreen(paramsmobile.tempnumber);
                             }
                             else{
                                 fetch('http://35.240.167.48:3037/user/token/verify', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                                     method: 'POST', // USE GET, POST, PUT,ETC
                                     headers: { //MODIFY HEADERS
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                         'Authorization':'Bearer '+paramsmobile.jwttoken,
                                         //    application/x-www-form-urlencoded
                                     },
                                     body: JSON.stringify({mobile:paramsmobile.tempnumber,
                                         jwtaudience:'SmarTran'  })
                                 })
                                     .then((response) => response.json())
                                     .then((responseJson) => {

                                         if (responseJson.message==="jwt token valid") {
                                             // Actions.loginScreen({phone:this.props.phone});
                                             Actions.homeScreen();
                                             // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                                         }
                                         else
                                         {
                                             Actions.loginScreen(paramsmobile.tempnumber);
                                             // alert("user creation failed");
                                         }


                                     }).catch((error) => {
                                     alert(error);
                                 });
                             }

                     });
                 }

             });

        }, 5000)

    }

    render() {
        paramsmobile = {};
        paramsmobile = {
            mobileno :this.props.tempnumber,
        };
        return (
            <View style={styles.SplashScreen_ChildView}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#4d6bcb'/>
                </View>
            <View style={{  justifyContent: 'space-between',
                alignItems: 'center',
               }}>

                {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}

                <Image source={require('../Images/SmarTran_newlogo.png')}
                       style={{justifyContent: 'space-between',
                           alignItems: 'center',}} />
            </View>
            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        SplashScreen_ChildView:
            {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4d6bcb',
                flex:1,
            },
    });
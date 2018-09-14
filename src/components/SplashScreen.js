import React, { Component } from 'react';

import { Platform, StyleSheet,Dimensions, View, Text, Image, TouchableOpacity,StatusBar, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
// import Registration from "./Registration"; // 4.0.0-beta.31

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        setTimeout(() => {
            // go to Home page
            Actions.homeScreen();
        }, 5000)
    }

    render() {
        return (
            <View style={{justifyContent: 'space-between'}}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#0c71b7'/>
                </View>
            <View style={{  justifyContent: 'center',
                alignItems: 'center',
               }}>

                {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}

                <Image source={require('../Images/smartranlogowhite.png')}
                       style={{width:'100%', height: '100%'}} />
            </View>
            </View>
        )
    }
}
// const styles = StyleSheet.create(
//     {
//         SplashScreen_ChildView:
//             {
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#FFFFFF',
//                 flex:1,
//                 margin:0,
//             },
//     });
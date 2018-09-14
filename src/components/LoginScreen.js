import React, { Component } from "react";
import PropTypes from 'prop-types';

// import styles from "./style";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,StatusBar,TextInput,Dimensions,ScrollView,Alert,Animated,Easing
} from 'react-native';
import Button from 'react-native-button'; // 2.3.0
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import Toast from 'react-native-simple-toast';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
// var newno;
export default class LoginScreen extends Component {



    constructor() {
        super();

        this.state = {
            isLoading: false
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
        this.state = { hidePassword: true }
    }
    managePasswordVisibility = () =>
    {
        // function used to change password visibility
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    //{ this.props.navigation.state.params.mobiles }
    _onPress() {
        if (this.state.isLoading) return;

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();

        setTimeout(() => {
            this._onGrow();
        }, 2000);

        setTimeout(() => {
            // Actions.secondScreen();
            fetch('http://35.240.250.77:3037/users/create', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                method: 'POST', // USE GET, POST, PUT,ETC
                headers: { //MODIFY HEADERS
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //    application/x-www-form-urlencoded
                },
                body: JSON.stringify({mobile:this.props.phone})
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // alert(responseJson.message);
                    if (responseJson.message==="user created"){ //MAKE YOU VALIDATIONS HERE ) {

                        // Actions.loginScreen();
                        Actions.homeScreen();
                        // alert('Please check the no')

                    }
                    else   {
                        // Actions.lo({text: this.state.mobiles });
                        // Actions.homeScreen();

                    }

                })
                .catch((error) => {
                    console.error(error);
                });
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        }, 2300);
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    render() {

        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });
        //     var width = Dimensions.get('window').width; //full width
        // var height = Dimensions.get('window').height; //full height
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="light-content"/>
                <View style={[styles.halfHeight,{paddingLeft:25,paddingRight:25}]} >
                    <View style={[{backgroundColor: '#FFFFFF',flex:1}]}>
                        <Image source = {require('../Images/smartranlogo.png')} style={styles.ImageStyle} />
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Image source = {require('../Images/phonecircle.png')} style = {{ width: 45, height: 45,marginTop: 78 }} />
                        <View style={styles.numberFormTextInput}>

                            <TextInput placeholder="+91" placeholderTextColor="#2CA8DB"
                                       underlineColorAndroid="#fafafa" style={{justifyContent: 'flex-start',}} />
                        </View>
                        <View style={styles.loginFormTextInputnonedit}>

                            <TextInput
                                placeholder="   "
                                keyboardType='phone-pad'
                                editable={false}
                                selectTextOnFocus={false}
                                placeholderTextColor="#2CA8DB"
                                returnKeyType={"done"}
                                selectionColor="#2CA8DB"
                                underlineColorAndroid="#fafafa"
                                maxLength={10}
                                // value={this.state.phone}
                                // onChangeText={(phone) => this.setState({phone})}
                                style={{justifyContent: 'flex-end',}}>
                                {this.props.phone}
                                {/*{this.state.phone}*/}
                            </TextInput>
                        </View>
                    </View>


                </View>
                <View style={styles.quarterHeight}>
                    <View style={{flexDirection:"row"}}>


                        <View style={{flexDirection:"row"}}>
                            <Image source = {require('../Images/key.png')} style = {{ width: 45, height: 45,marginTop: 18 }} />
                            <View style={styles.loginFormTextInput1}>

                                <TextInput
                                    placeholder="    Password"

                                    placeholderTextColor="#2CA8DB"
                                    underlineColorAndroid="#fafafa"
                                    returnKeyType={"done"}
                                    selectionColor="#2CA8DB"
                                    maxLength={12}
                                    // Making the Text Input Text Hidden.
                                    secureTextEntry = { this.state.hidePassword }                                       style={{justifyContent: 'flex-end',}}/>
                                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                    <Image source = { ( this.state.hidePassword ) ? require('../Images/hide.png') : require('../Images/view.png') }
                                           style = { styles.btnImage } />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Animated.View >
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={this.onButtonPress}
                            onPress={this._onPress}
                            activeOpacity={1}>
                            {

                                <Text style={styles.text}>Login</Text>
                            }
                        </TouchableOpacity>
                        <Animated.View
                            style={[styles.circle, {transform: [{scale: changeScale}]}]}
                        />
                    </Animated.View>
                    {/*<Text style={styles.fbLoginButton} onPress={this._onPress}*/}
                    {/*>Login</Text>*/}

                </View>

            </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'

    },
    halfHeight: {
        flex: .5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    visibilityBtn:
        {
            position: 'absolute',
            right: 3,
            height: 40,
            width: 35,
            padding: 5
        },

    btnImage:
        {
            resizeMode: 'contain',
            height: '100%',
            width: '100%'
        },

    quarterHeight: {
        flex: .62,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0C71B7',
        height: MARGIN,
        fontSize: 16,
        width:DEVICE_WIDTH - 220,
        borderRadius: 15,
        color:'#FFFFFF',
        borderColor: '#0C71B7',
        padding:10,
        paddingLeft:15,
        marginTop: 20,
        marginBottom:10,
        textAlign: 'center',
        alignSelf: 'center',
        zIndex: 100
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        //  borderWidth: 1,
        //   borderColor: '#F035E0',
        //   borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#FFFFFF',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    fbLoginButton:{
        height: 40,
        fontSize: 16,
        width:DEVICE_WIDTH - 250,
        borderWidth: 0.5,
        borderRadius:10,
        color:'#FFFFFF',
        borderColor: '#2CA8DB',
        backgroundColor: '#2CA8DB',
        padding:10,
        paddingLeft:10,
        marginLeft:10,
        marginTop: 20,
        marginBottom:10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    loginFormTextInputnonedit:{
        height: 45,
        fontSize: 14,
        width:DEVICE_WIDTH - 200,
        borderWidth: 0.5,
        borderRadius:10,
        borderColor: '#bbbfbc',
        backgroundColor: '#fafafa',
        padding:4,
        paddingLeft: 5,
        marginLeft:15,
        marginRight: 15,
        marginTop: 80,
        marginBottom:10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    loginFormTextInput1:{
        height: 45,
        fontSize: 14,
        width:DEVICE_WIDTH - 120,
        borderWidth: 0.5,
        borderRadius:10,
        borderColor: '#2CA8DB',
        backgroundColor: '#fafafa',
        padding:4,
        paddingLeft:5,
        marginLeft:15,
        marginRight: 10,
        marginTop: 20,
        marginBottom:10,
        textAlign: 'center',
        alignSelf: 'center'
    },
    numberFormTextInput:{
        height: 45,
        fontSize: 16,
        width:DEVICE_WIDTH -300,
        borderWidth: 0.5,
        borderRadius:10,
        borderColor: '#2CA8DB',
        backgroundColor: '#fafafa',
        padding:4,
        paddingLeft:10,
        marginLeft:15,
        marginTop: 70,
        marginBottom:0,
        textAlign: 'center',
        alignSelf: 'center'
    },
    ImageStyle: {
        padding: 10,
        paddingLeft:45,
        paddingRight:45,
        margin: 105,
        marginRight:100,
        marginLeft:300,
        marginTop:1,
        height: 150,
        width: 150,
        resizeMode : 'stretch',
        alignItems: 'center'
    }
});

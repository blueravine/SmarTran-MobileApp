import React, { Component } from 'react';
import {Navigator,
    Platform, StyleSheet, View, Text,text,TextInput, Image, TouchableOpacity, Alert,
    AppRegistry,TouchableHighlight,StatusBar,Dimensions,Button,ScrollView,Animated,
    Easing,
} from 'react-native';
import {Card,icon} from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import Toast from 'react-native-simple-toast';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
global.sessionid ;
import PropTypes from 'prop-types';


export default class Registration extends Component {
    // public static var=sessionid;
    constructor() {
        super();
        this.state = {
            mobiles: ''
        };

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

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

            fetch('http://35.240.250.77:3037/users/mobile', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                method: 'POST', // USE GET, POST, PUT,ETC
                headers: { //MODIFY HEADERS
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //    application/x-www-form-urlencoded
                },
                body: JSON.stringify({mobile:this.state.mobiles})
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // alert(responseJson.message);
                    if (responseJson.message==="user not found"){ //MAKE YOU VALIDATIONS HERE ) {

                        Actions.otpScreen({phone: this.state.mobiles });

                        fetch('https://2factor.in/API/V1/88712423-890f-11e8-a895-0200cd936042/SMS/'+this.state.mobiles+'/AUTOGEN/Registration', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                            method: 'GET', // USE GET, POST, PUT,ETC
                            headers: { //MODIFY HEADERS
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                //    application/x-www-form-urlencoded
                            },
                            // body: JSON.stringify({mobile:this.state.mobiles})
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.Status === "Success") {

                                    sessionid = responseJson.Details;


                                }
                                else {

                                }

                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                    else   {
                        // Actions.lo({text: this.state.mobiles });
                        Actions.loginScreen({phone: this.state.mobiles });

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
        return(

            <View style = { styles.MainContainer }>

                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#4d6bcb'/>
                </View>
                <View style={[styles.headerviewhome]}>
                    {/*<View style={[{backgroundColor: '#FFFFFF',flex:1}]}>*/}
                    {/*<Image source = {require('../Images/smartranlogowhite.png')} style={styles.ImageStyle} />*/}
                    {/*</View>*/}

                    <Card style={{ borderRightWidth:10,borderBottomRightRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,
                        borderTopLeftRadius:10,borderLeftWidth:10,shadowColor:"#f1f1f1f1",borderColor:'#FFFFFF'}}>
                        <View style={{paddingLeft:25,paddingRight:25}} >
                            <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                {/*<Image source = {require('../Images/phonecircle.png')} style = {{ width: 45, height: 45,marginTop: 88 }} />*/}
                                <Icon type='FontAwesome' name='whatsapp' size={45} color="#bbbfbc" style = {{marginTop: 95 }}/>
                                <View style={styles.numberFormTextInput}>

                                    <TextInput placeholder="+91" placeholderTextColor="#2CA8DB"
                                               underlineColorAndroid="#fafafa" style={{justifyContent: 'flex-start',}} />
                                </View>
                                <View style={styles.loginFormTextInput}>

                                    <TextInput
                                        placeholder="   Enter Mobile Number"
                                        keyboardType='phone-pad'
                                        placeholderTextColor="#2CA8DB"
                                        underlineColorAndroid="#fafafa"
                                        returnKeyType={"done"}
                                        selectionColor="#2CA8DB"
                                        value={this.state.mobiles}
                                        onChangeText={(mobiles) => this.setState({mobiles})}
                                        maxLength={10}
                                        style={{justifyContent: 'flex-end',}}/>

                                </View>

                            </View>

                        </View>

                        <View style={styles.quarterHeight}>
                            <Animated.View >
                                <TouchableOpacity
                                    style={styles.button}
                                    // onPress={this.onButtonPress}
                                    onPress={this._onPress}>
                                    {/*activeOpacity={1}>*/}
                                    {/*{*/}

                                        {/*<Text style={styles.text}>Continue ---></Text>*/}
                                    {/*}*/}
                                    <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                        {/*<Image source={require('../Images/search_magnifie.png')} style = {{ width: 20,*/}
                                        {/*height: 20,alignItems:'center'}}/>*/}
                                        {/*<Icoon type='MaterialCommunityIcons' name='skip-next-circle' size={20} color="#FFFFFF" style = {{alignItems:'center' }}/>*/}
                                        <Text style={{fontSize:20,color:'#FFFFFF'
                                            ,textAlign:'center',paddingLeft:10}}>Continue</Text>
                                    </View>

                                </TouchableOpacity>
                                {/*<Animated.View*/}
                                    {/*style={[styles.circle, {transform: [{scale: changeScale}]}]}*/}
                                {/*/>*/}
                            </Animated.View>


                            <View style={{flexDirection:"row"}}>
                                <View style={styles.orTextView}>
                                    <Text style={styles.orText}>Login With</Text>
                                </View>

                                <View style={{flexDirection:"row"}}>
                                    <TouchableHighlight style = {{width: 50, height: '100%',marginLeft:0,marginTop: 78}}onPress={()=>this._onPressButton('Login with Facebook')}>
                                        <Image source = {require('../Images/facebook.png')} style = {{ width: 40, height: 40}}/>
                                    </TouchableHighlight>
                                    <Text style={styles.orText1}>or</Text>
                                    <TouchableHighlight style = {{ width: 50, height:'100%',marginLeft:20,marginTop: 78}}onPress={()=>this._onPressButton('Login with Google')}>
                                        <Image source = {require('../Images/googlesearch.png')} style = {{ width: 40, height: 40 }} />
                                    </TouchableHighlight>
                                </View>
                            </View>

                        </View>

                    </Card>





                </View>

            </View>

        );

    }

    _onPressButton = function(value){
        Alert.alert(
            'Alert',
            value,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
        )
    }

}


const styles = StyleSheet.create(
    {
        MainContainer:
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#4d6bcb',
                // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
            },

        headerviewhome: {
            // height: 250,
            //borderRadius:25,
            // borderWidth:5,
            // borderColor:'#917cb7',
            position: 'absolute',
            backgroundColor: '#4d6bcb',
            paddingRight:15,
            paddingLeft:15,
            paddingTop:55,
            left: 0,
            right: 0,
            top:0,

        },
        halfHeight: {
            flex: .5,
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
        },




        quarterHeight: {
            flex: .5,
            marginBottom:10,

            alignItems: 'center',
        },


        orTextView:{
            marginTop: 5,
        }
        ,orText:{
            fontSize: 18,
            fontWeight: 'bold',
            color:'#2CA8DB',
            paddingRight:12,
            marginTop: 85,
        },
        orText1:{
            fontSize: 20,
            fontWeight: 'bold',
            color:'#2CA8DB',
            marginTop: 85,
            paddingLeft:12,
            textDecorationLine: 'underline'
        },
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2eacde',
            height: 60,
            fontSize: 20,
            width:DEVICE_WIDTH - 50,
            // borderRadius: 15,
            color:'#FFFFFF',
            borderColor: '#2eacde',
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
            fontSize: 20,
        },

        loginFormTextInput: {
            height: 45,
            fontSize: 14,
            width:DEVICE_WIDTH - 200,
            borderWidth: 0.5,
            borderRadius:10,
            borderColor: '#2CA8DB',
            backgroundColor: '#fafafa',
            padding:4,
            paddingLeft: 5,
            marginLeft:15,
            marginRight: 15,
            marginTop: 90,
            marginBottom:10,
            textAlign: 'center',
            justifyContent:"space-evenly",
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
            marginTop: 80,
            marginBottom:0,
            justifyContent:"space-evenly",
            textAlign: 'center',
            alignSelf: 'center'
        },
        ImageStyle: {
            padding: 5,
            alignItems:"flex-end",
            // marginTop:1,
            height: 80,
            width: 150,
            resizeMode : 'stretch',
        },

    });


// AppRegistry.registerComponent('reactTest', () => reactTest);




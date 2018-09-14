import React, { Component } from "react";
import PropTypes from 'prop-types';

// import styles from "./style";
  import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
     Animated,
     TouchableOpacity,
  Easing,
    TouchableHighlight,StatusBar,TextInput,Dimensions,ScrollView,Alert
  } from 'react-native';
import Button from 'react-native-button'; // 2.3.0
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import spinner from '../Images/loading.gif';
import Registration from "./Registration";
import LoginScreen from "./LoginScreen";
import Toast from 'react-native-simple-toast';
// const appId = "1047121222092614"
 const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { StackNavigator } from 'react-navigation';

export default class OTPScreen extends Component {


constructor() {
    super();
    this.state={
        mobile:''
    };
    this.state = {
        otp: ''
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


        fetch('https://2factor.in/API/V1/88712423-890f-11e8-a895-0200cd936042/SMS/VERIFY/'+sessionid+'/'+this.state.otp, { // USE THE LINK TO THE SERVER YOU'RE USING mobile
            method: 'GET', // USE GET, POST, PUT,ETC
            headers: { //MODIFY HEADERS
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if((responseJson.Status==="Success") && (responseJson.Details==="OTP Matched")){

                    Actions.loginScreen({phone:this.props.phone});

                }
                else if((responseJson.Status==="Success") && (responseJson.Details==="OTP Mismatched")){
                    //sessionid=responseJson.Details;
                    alert('Please Check the OTP and type again'+responseJson.Details);


                }
                else if((responseJson.Status==="Success") && (responseJson.Details==="OTP Expired")){
                    //sessionid=responseJson.Details;

                    alert(responseJson.Details);


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
    // _onLinkPress(phone){
    //     // Actions.otpScreen({texts: this.state.mobiles });
    //     // Toast.show('my no'+this.state.mobile);
    //     fetch('https://2factor.in/API/V1/88712423-890f-11e8-a895-0200cd936042/SMS/'+phone+'/AUTOGEN/Registration', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
    //         method: 'GET', // USE GET, POST, PUT,ETC
    //         headers: { //MODIFY HEADERS
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             //    application/x-www-form-urlencoded
    //         },
    //
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             if (responseJson.Status === "Success") {
    //
    //                 sessionid = responseJson.Details;
    //
    //
    //             }
    //             else {
    //
    //             }
    //
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //
    // }

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
                            placeholder="   9999912345"
                            keyboardType='phone-pad'
                            editable={false} 
                            selectTextOnFocus={false}
                            placeholderTextColor="#2CA8DB" 
                            returnKeyType={"done"} 
                            selectionColor="#2CA8DB"
                            underlineColorAndroid="#fafafa"
                            // value={this.state.mobile}
                            // onChangeText={(mobile) => this.setState({mobile})}
                            maxLength={10}                           
                          style={{justifyContent: 'flex-end',}}>
                            {this.props.phone}
                        </TextInput>
                  </View>
                 </View>

                 
                </View>
                <View style={styles.quarterHeight}>
                 <View style={{flexDirection:"row"}}>
                  
                  
                                     <View style={{flexDirection:"row"}}>
                    <Image source = {require('../Images/padlock.png')} style = {{ width: 45, height: 45,marginTop: 15 }} />
                    <View style={styles.loginFormTextInput1}>
                          
                        <TextInput 
                            placeholder="   OTP(One Time Password)" 
                            keyboardType='phone-pad'
                            placeholderTextColor="#2CA8DB" 
                            underlineColorAndroid="#fafafa" 
                            returnKeyType={"done"}
                            value={this.state.otp}
                            onChangeText={(otp) => this.setState({otp})}
                            selectionColor="#2CA8DB"
                            maxLength={6}                           
                          style={{justifyContent: 'flex-end',}}/>
                  </View>
                 </View>
                </View>
                <View style={{flexDirection:"row"}}>
                  <View style={styles.orTextView1}>                
                    <Text style={styles.orTextView1}>Problem reciving OTP?  </Text>                 
                  </View>
                  
                  <View style={{flexDirection:"row"}}>

<Text style={styles.orText1} >Resend OTP </Text>
                      {/*onPress={this._onLinkPress(this.props.phone)}*/}
                  </View>
                </View>
               <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>Verify OTP</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
               </View>
                
            </View>
            
      );
    }

  // _onLinkPress = function(value){
  //               Alert.alert(
  //                 'Alert',
  //                 value,
  //                 [
  //                   {text: 'OK', onPress: () => console.log('OK Pressed!')},
  //                 ]
  //               )
  //     }
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

  

      
      quarterHeight: {
          flex: .52,
          backgroundColor: '#FFFFFF',
            alignItems: 'center',
      },
     
        orTextView1:{
          fontSize: 18,
          color:'#2CA8DB',
        marginTop: 12
        
        
      },
      orText1:{
          fontSize: 18,
           color:'#2CA8DB',
           marginTop: 20,
          
           paddingLeft:15,
           textDecorationLine: 'underline'
      },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0C71B7',
    height: MARGIN,
    borderRadius: 15,
    zIndex: 100,
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
  image: {
    width: 24,
    height: 24,
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

// AppRegistry.registerComponent('Login', () => Login);
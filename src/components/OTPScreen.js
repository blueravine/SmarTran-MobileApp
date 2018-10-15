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
     TouchableOpacity,AsyncStorage,BackHandler,
  Easing,
    TouchableHighlight,StatusBar,TextInput,Dimensions,ScrollView,Alert
  } from 'react-native';
import {Card,icon} from 'native-base';
import Button from 'react-native-button'; // 2.3.0
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Icoon from 'react-native-vector-icons/FontAwesome5';
import Icoons from 'react-native-vector-icons/FontAwesome5';
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import spinner from '../Images/loading.gif';
import Registration from "./Registration";
import LoginScreen from "./LoginScreen";
import Toast from 'react-native-simple-toast';
// const appId = "1047121222092614"
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
 const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { StackNavigator } from 'react-navigation';
var paramsmobile={tempnumber:''};
var addmynumber;
export default class OTPScreen extends Component {


constructor(props) {
    super(props);
    this.state={
        mobile:'',
        otp: ''
    };

    // this.state = {
    //   isLoading: false,
    // };
    //
    // this.buttonAnimated = new Animated.Value(0);
    // this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this.state = { hidePassword: true }
  }
    managePasswordVisibility = () =>
    {
        // function used to change password visibility
        this.setState({ hidePassword: !this.state.hidePassword });
    }
  _onPress() {
    // if (this.state.isLoading) return;
    //
    // this.setState({isLoading: true});
    // Animated.timing(this.buttonAnimated, {
    //   toValue: 1,
    //   duration: 200,
    //   easing: Easing.linear,
    // }).start();
    //
    // setTimeout(() => {
    //   this._onGrow();
    // }, 2000);

    // setTimeout(() => {


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

                    fetch('http://35.240.147.215:3037/users/create', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                        method: 'POST', // USE GET, POST, PUT,ETC
                        headers: { //MODIFY HEADERS
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            //    application/x-www-form-urlencoded
                        },
                        body: JSON.stringify({mobile:paramsmobile.tempnumber})
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {

                            if (responseJson.message==="user created") {
                                // Actions.loginScreen({phone:this.props.phone});
                                Actions.homeScreen(paramsmobile);
                                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                            }
                            else
                            {
                                alert("user creation failed");
                            }


                            }).catch((error) => {
                        alert(error);
                    });
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

    //     this.setState({isLoading: false});
    //   this.buttonAnimated.setValue(0);
    //   this.growAnimated.setValue(0);
    // }, 2300);
  }

  // _onGrow() {
  //   Animated.timing(this.growAnimated, {
  //     toValue: 1,
  //     duration: 200,
  //     easing: Easing.linear,
  //   }).start();
  // }
    // savemynumber(currentmobnumber) {
    //     try {
    //
    //         // AsyncStorage.getItem('mobileno')
    //         //     .then((mobileno) => {
    //         //         addmynumber = mobileno;
    //         // Toast.show("tickets " +c ,Toast.LONG);
    //         // addmynumber.push(currentmobnumber);
    //         AsyncStorage.setItem('mobileno', currentmobnumber);
    //         // });
    //
    //     } catch (error) {
    //         alert(error)
    //     }
    // }
    _onLinkPress(phone){
        // Actions.otpScreen({texts: this.state.mobiles });
        // Toast.show('my no'+this.state.mobile);
        fetch('https://2factor.in/API/V1/88712423-890f-11e8-a895-0200cd936042/SMS/'+phone+'/AUTOGEN/Registration', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
            method: 'GET', // USE GET, POST, PUT,ETC
            headers: { //MODIFY HEADERS
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //    application/x-www-form-urlencoded
            },

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


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        Actions.registerScreen();
        // Alert.alert(
        //     'Exit App',
        //     'Exiting the application?', [{
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel'
        //     }, {
        //         text: 'OK',
        //         onPress: () => BackHandler.exitApp()
        //     }, ]
        //     , {
        //         cancelable: false
        //     }
        // );
        return true;
    };

   render() {
       // paramsmobile = {};
       paramsmobile = {
           tempnumber:this.props.tempnumber,
       };
 // const changeWidth = this.buttonAnimated.interpolate({
 //      inputRange: [0, 1],
 //      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
 //    });
 //    const changeScale = this.growAnimated.interpolate({
 //      inputRange: [0, 1],
 //      outputRange: [1, MARGIN],
 //    });

      return (
   <View style={styles.container}>
       <View>
           <StatusBar
               hidden={false}
               backgroundColor='#4d6bcb'/>
       </View>
       <View style={[styles.headerviewotp]}>
           <Card style={{ borderRightWidth:10,borderBottomRightRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,
               borderTopLeftRadius:10,borderLeftWidth:10,shadowColor:"#f1f1f1f1",borderColor:'#FFFFFF'}}>
                <View style={[styles.halfHeight,{paddingLeft:25,paddingRight:25}]} >
                    {/*<View style={[{backgroundColor: '#FFFFFF',flex:1}]}>*/}
                     {/*<Image source = {require('../Images/smartranlogo.png')} style={styles.ImageStyle} />*/}
                    {/*</View>*/}
                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    {/*<Image source = {require('../Images/phonecircle.png')} style = {{ width: 45, height: 45,marginTop: 78 }} />*/}
                        <Icon type='FontAwesome' name='whatsapp' size={45} color="#bbbfbc" style = {{marginTop: 25 }}/>
                    <View style={styles.numberFormTextInput}>
                     
                        <TextInput placeholder="+91" placeholderTextColor="#2CA8DB"
                                   editable={false}
                                   selectTextOnFocus={false}
                            underlineColorAndroid="#fafafa" style={{justifyContent: 'flex-start',}} />
                    </View>
                    <View style={styles.loginFormTextInputnonedit}>
                          
                        <TextInput 
                            placeholder="   mobile number"
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
                            {this.props.tempnumber}
                        </TextInput>
                  </View>
                 </View>

                 
                </View>
                <View style={styles.quarterHeight}>
                 <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                  
                  
                     <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                    {/*<Image source = {require('../Images/padlock.png')} style = {{ width: 45, height: 45,marginTop: 15 }} />*/}
                         <Icons type='SimpleLineIcons' name='lock' size={45} color="#bbbfbc" style = {{marginTop: 15 }}/>
                    <View style={styles.loginFormTextInput1}>
                          
                        <TextInput 
                            placeholder="   OTP(One Time Password)" 
                            keyboardType='phone-pad'
                            placeholderTextColor="#2CA8DB" 
                            underlineColorAndroid="#fafafa" 
                            returnKeyType={"done"}
                            value={this.state.otp}
                            onChangeText={(otp) => this.setState({otp:otp})}
                            selectionColor="#2CA8DB"
                            maxLength={6}                           
                          style={{justifyContent: 'flex-end',}}/>
                  </View>
                 </View>

                 </View>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                        {/*<Image source = {require('../Images/key.png')} style = {{ width: 45, height: 45,marginTop: 18 }} />*/}
                        <Icoon type='FontAwesome5' name='key' size={45} color="#bbbfbc" style = {{marginTop: 18 }}/>
                        <View style={styles.loginFormTextInput1}>

                            <TextInput
                                placeholder="    Set new password"

                                placeholderTextColor="#2CA8DB"
                                underlineColorAndroid="#fafafa"
                                returnKeyType={"done"}
                                selectionColor="#2CA8DB"
                                maxLength={12}
                                // Making the Text Input Text Hidden.
                                secureTextEntry = { this.state.hidePassword }
                                style={{justifyContent: 'flex-end',}}/>
                            <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                <Image source = { ( this.state.hidePassword ) ? require('../Images/hide.png') : require('../Images/view.png') }
                                       style = { styles.btnImage } />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"space-evenly",marginBottom:10}}>
                  <View style={styles.orTextView1}>                
                    <Text style={styles.orTextView1}>Problem receiving OTP?  </Text>
                  </View>
                  
                  <View style={{flexDirection:"row",justifyContent:"space-evenly",marginBottom:10}}>

<Text style={styles.orText1} >Resend OTP </Text>
                      {/*onPress={this._onLinkPress(this.props.phone)}*/}
                  </View>
                </View>
               {/*<View style={styles.container}>*/}
        {/*<Animated.View style={{width: changeWidth}}>*/}
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}>
            {/*activeOpacity={1}>*/}
            {/*{this.state.isLoading ? (*/}
              {/*<Image source={spinner} style={styles.image} />*/}
            {/*) : (*/}
              {/*<Text style={styles.text}>Verify OTP</Text>*/}
            {/*)}*/}
              <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                  {/*<Image source={require('../Images/search_magnifie.png')} style = {{ width: 20,*/}
                  {/*height: 20,alignItems:'center'}}/>*/}
                  <Icoon type='FontAwesome5' name='key' size={20} color="#FFFFFF" style = {{alignItems:'center' }}/>
                  {/*{this.state.isLoading ? (*/}
                      {/*<Icoon type='FontAwesome5' name='spinner' size={24} color="#2ezcde" style={styles.image}/>*/}
                  {/*) : (*/}
                  <Text style={{fontSize:20,color:'#FFFFFF'
                      ,textAlign:'center',paddingLeft:10}}>Verify OTP</Text>
                      {/*)}*/}
              </View>

          </TouchableOpacity>
          {/*<Animated.View*/}
            {/*style={[styles.circle, {transform: [{scale: changeScale}]}]}*/}
          {/*/>*/}
        {/*</Animated.View>*/}
      {/*</View>*/}
               </View>
           </Card>
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
          flexDirection: 'column',
       backgroundColor: '#4d6bcb',
       // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
   },

      headerviewotp: {
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
          backgroundColor: '#FFFFFF',
            alignItems: 'center',
      },
     
        orTextView1:{
          fontSize: 16,
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
      backgroundColor: '#2eacde',
      height: 60,
      fontSize: 16,
      width:DEVICE_WIDTH - 10,
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
      fontSize:20,
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
  marginTop: 30,
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
  marginTop: 20,
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
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
    TouchableHighlight,StatusBar,BackHandler,AsyncStorage,TextInput,Dimensions,ScrollView,Alert,Animated,Easing,Keyboard,ActivityIndicator
} from 'react-native';
import {Card,icon} from 'native-base';
import Button from 'react-native-button'; // 2.3.0
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
// var newno;
var paramshome;
var paramsmobile={tempnumber:''};
var userdata={mobile: null,jwt:null};
// var userdata={mobile: null,username:null,age:null,gender:null,email:null,name:null,jwt:null,
//     countrycode:null};
export default class LoginScreen extends Component {



    constructor() {
        super();

        this.state = {
            loading:false,
            mobiles:'',
            password: '',
        };

        // this.buttonAnimated = new Animated.Value(0);
        // this.growAnimated = new Animated.Value(0);
        this._onPressLogin = this._onPressLogin.bind(this);
        this.state = { hidePassword: true }
    }
    managePasswordVisibility = () =>
    {
        // function used to change password visibility
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    ShowHideActivityIndicator = () =>{

        this.setState({loading: true});
        setTimeout(() => {
            this._onPressLogin();
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        }, 500)
        // this.setState({loading: false})
    };

    //{ this.props.navigation.state.params.mobiles }
    _onPressLogin() {
        Keyboard.dismiss();
            fetch('https://interface.blueravine.in/smartran/user/login', { // USE THE LINK TO THE SERVER YOU'RE USING mobile
                method: 'POST', // USE GET, POST, PUT,ETC
                headers: { //MODIFY HEADERS
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //    application/x-www-form-urlencoded
                },
                body: JSON.stringify({mobile:userdata.mobile,
                    password: this.state.password,
                    jwtaudience:"SmarTran"  })
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    if (responseJson.message==="user authenticated") {
                        userdata.jwt = responseJson.token;
                        AsyncStorage.setItem('userInfo',JSON.stringify(userdata))
                        .then((userInfo) => {
                            
                        }).done(() =>{
                            Actions.homeScreen();
                        });
                        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                    }
                    else
                    {
                        // alert("user authentication failed");
                        alert(responseJson.message);
                    }


                }).catch((error) => {
                alert(error);
            });
            // this.setState({isLoading: false});
            // this.buttonAnimated.setValue(0);
            // this.growAnimated.setValue(0);
     
    }
    async componentDidMount(){
        await AsyncStorage.getItem('userInfo')
        .then((userInfo) => {
            let tempuserdata = userdata;
            let  jsonuserinfo = userInfo ? JSON.parse(userInfo) : tempuserdata;
            // userdata.name = jsonuserinfo.name;
            this.setState({
                mobiles: jsonuserinfo.mobile.toString()
            });
            // alert(this.state.mobiles);
            userdata.mobile = jsonuserinfo.mobile;
            // this.setState({countrycode : jsonuserinfo.countrycode});
            // this.setState({username : jsonuserinfo.username});
            // userdata.countrycode = jsonuserinfo.countrycode;
            // userdata.email = jsonuserinfo.email;
            // userdata.username = jsonuserinfo.username;
            // userdata.age = jsonuserinfo.age;
            // userdata.gender = jsonuserinfo.gender;
            userdata.jwt = jsonuserinfo.jwt;
            // alert(jsonuserinfo.mobile);
        }).done(() => {
            // alert((this.state.phone));
            // alert(userdata.mobile);
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#4d6bcb'/>
                </View>
                <View style={[styles.headerviewlogin]}>
                    <Card style={{ borderRightWidth:10,borderBottomRightRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,
                        borderTopLeftRadius:10,borderLeftWidth:10,shadowColor:"#f1f1f1f1",borderColor:'#FFFFFF'}}>
                <View style={[styles.halfHeight,{paddingLeft:25,paddingRight:25}]} >
                    {/*<View style={[{backgroundColor: '#FFFFFF',flex:1}]}>*/}
                        {/*<Image source = {require('../Images/smartranlogo.png')} style={styles.ImageStyle} />*/}
                    {/*</View>*/}
                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                        {/*<Image source = {require('../Images/phonecircle.png')} style = {{ width: 45, height: 45,marginTop: 78 }} />*/}
                        <Icon type='FontAwesome' name='whatsapp' size={45} color="#bbbfbc" style = {{marginTop: 78 }}/>
                        <View style={styles.numberFormTextInput}>

                            <TextInput placeholder="+91" placeholderTextColor="#2CA8DB"
                                       underlineColorAndroid="#fafafa" style={{justifyContent: 'flex-start',}} />
                        </View>
                        <View style={styles.loginFormTextInputnonedit}>

                            <TextInput
                                placeholder=" mobile number  "
                                keyboardType='phone-pad'
                                editable={false}
                                value={this.state.mobiles}
                                selectTextOnFocus={false}
                                placeholderTextColor="#2CA8DB"
                                returnKeyType={"done"}
                                selectionColor="#2CA8DB"
                                underlineColorAndroid="#fafafa"
                                // maxLength={10}
                                style={{justifyContent: 'flex-end',}}>
                               
                            </TextInput>
                        </View>
                    </View>


                </View>
                <View style={styles.quarterHeight}>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>


                        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                            {/*<Image source = {require('../Images/key.png')} style = {{ width: 45, height: 45,marginTop: 18 }} />*/}
                            <Icoon type='FontAwesome5' name='key' size={45} color="#bbbfbc" style = {{marginTop: 18 }}/>
                            <View style={styles.loginFormTextInput1}>

                                <TextInput
                                    placeholder="    Password"

                                    placeholderTextColor="#2CA8DB"
                                    underlineColorAndroid="#fafafa"
                                    returnKeyType={"done"}
                                    selectionColor="#2CA8DB"
                                    maxLength={12}
                                    onChangeText={(password) => this.setState({password})}
                                    // Making the Text Input Text Hidden.
                                    secureTextEntry = { this.state.hidePassword }
                                    style={{justifyContent: 'flex-end',}}/>
                                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                    <Image source = { ( this.state.hidePassword ) ? require('../Images/hide.png') : require('../Images/view.png') }
                                           style = { styles.btnImage } />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* <Animated.View > */}
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={this.onButtonPress}
                            onPress={this.ShowHideActivityIndicator}>
                            {/*activeOpacity={1}>*/}
                            {/*{*/}

                                {/*<Text style={styles.text}>Login</Text>*/}
                            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                {/*<Image source={require('../Images/search_magnifie.png')} style = {{ width: 20,*/}
                                {/*height: 20,alignItems:'center'}}/>*/}
                                <Icoon type='FontAwesome5' name='key' size={20} color="#FFFFFF" style = {{alignItems:'center' }}/>
                                <Text style={{fontSize:20,color:'#FFFFFF'
                                    ,textAlign:'center',paddingLeft:10}}>Login</Text>
                            </View>
                            {/*}*/}
                        </TouchableOpacity>
                        {/* <Animated.View
                            style={[styles.circle, {transform: [{scale: changeScale}]}]}
                        /> */}
                    {/* </Animated.View> */}
                    {
                        // Here the ? Question Mark represent the ternary operator.
                        //style={{backgroundColor:'#FFFFFF',width:width-220}}
                        this.state.loading ?  <ActivityIndicator color = '#2eacde'
                                                                 size = "large" style={{padding: 20}} /> : null
                    }
                    {/*<Text style={styles.fbLoginButton} onPress={this._onPress}*/}
                    {/*>Login</Text>*/}

                </View>
                    </Card>
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
        flexDirection: 'column',
        backgroundColor: '#4d6bcb',
        // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    headerviewlogin: {
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
        flex: .5,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
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

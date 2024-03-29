import React, { Component } from 'react';
import MapView, { AnimatedRegion,Polyline,Marker, Callout, ProviderPropType } from 'react-native-maps';
import { Image,ScrollView,StyleSheet,TouchableOpacity,StatusBar,Alert,
    TouchableHighlight,Dimensions,Animated,Easing,PermissionsAndroid } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button,  Left, Body, Right,
    Footer, FooterTab} from 'native-base';

import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import Toast from 'react-native-simple-toast';
import Permissions from 'react-native-permissions'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
// import { BottomNavigation } from 'react-native-material-ui';

import BottomNavigation, {
    ShiftingTab
} from 'react-native-material-bottom-navigation'
import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Iccon from 'react-native-vector-icons/SimpleLineIcons';
import Iccons from 'react-native-vector-icons/Foundation'

const card      = {card: {width: 300,height:500}};
const cardItem = {cardItem: {fontSize: 40}};
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 17.4365557;
const LONGITUDE = 78.3670722;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
import carImg from '../Images/car.png';
import bus from '../Images/bus.png';
import bus1 from '../Images/bus1.png';
import bus2 from '../Images/bus2.png';
import StepIndicator from 'react-native-step-indicator';
 
const labels = ["Miyapur","Alwin X Road","Hafeezpet","Kondapur","Khothaguda","Botanical Garden","Gachibowli"];
const customStyles = {
  stepIndicatorSize: 5,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#fe7013',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#fe7013'
}

const labels1 = ["BHEL","Seriligampally","Gulmohar Park","University of Hyd","Gachibowli Stadium","IIIT","Indira Nagar","Gachibowli"];
const customStyles1 = {
    stepIndicatorSize: 5,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#fe7013',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: '#fe7013'
}

const labels2 = ["Waverock","Wipro","ISB","Infosys","IIIT","Indira Nagar","Gachibowli"];
const customStyles2 = {
    stepIndicatorSize: 5,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#fe7013',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: '#fe7013'
}
var i;
var j;
var k;
var newposition;
var newposition1;
var newposition2;
import openMap from 'react-native-open-maps';
export default class Trips extends Component {

    state = {
        types: [],
        status: {},
    }


    constructor() {
        super();
        this.state = {
            activeTab: 'track',
            currentPosition: 0,
            currentPosition1: 2,
            currentPosition2: 4,
            dummystatevar:'',
            busnote1:'Khothaguda',
            busnote2:'Indira Nagar',
            busnote3:'Infosys'
        };

        this.onPageChange = this.onPageChange.bind(this)
    }
    
    tabs = [
        {
            key:"home",
            // icon={<Image source={require('../Images/home_icon.png')} color="#2eacde" name="Search" style={{ width: 20, height: 20 }} />}
            label:"Home",
            icon : 'home',
            barColor: '#2eacde',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key:"favourite",
            // icon={<Image source={require('../Images/route.png')}color="#669999" name="trips" style={{ width: 20, height: 20 }} />}
            icon : 'star' ,
            label:"Favourite",
            barColor: '#2eacde',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key:"track",
            // icon={<Image source={require('../Images/route.png')}color="#669999" name="trips" style={{ width: 20, height: 20 }} />}
            icon : 'location-on' ,
            label:"Track",
            barColor: '#2eacde',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key:"ticket",
            // icon={<Image source={require('../Images/route.png')}color="#669999" name="trips" style={{ width: 20, height: 20 }} />}
            icon :'receipt' ,
            label:"Ticket",
            barColor: '#2eacde',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key:"more",
            // icon={<Image source={require('../Images/route.png')}color="#669999" name="trips" style={{ width: 20, height: 20 }} />}
            icon : 'menu' ,
            label:"More",
            barColor: '#2eacde',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
    ]
    _goToYosemite() {
        openMap({
            //  latitude: 17.4467602, longitude: 78.3753886,
                  travelType:"drive",zoom:18,query:"17.4467602,78.3753886"	 });
      }
    _handleTabPress(pressedKey) {
        switch (pressedKey) {
            case 'home':
                Actions.homeScreen();
                break;
            case 'favourite':
                Actions.homeScreen();
                // {this.buttonPress}
                this.setState({viewSection:!this.state.viewSection});
                // {this.renderBottomComponent()}
                break;
            case 'track':

                break;
            case 'ticket':
                Actions.ticketScreen();
                break;
            case 'more':
                Actions.moreScreen();
                break;
            default:

        }
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />

    )

    renderTab = ({ tab, isActive }) => (
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )
    sleep(ms){
        return new Promise(resolve => setTimeout(resolve,ms))
    }
    async componentDidMount() {
        
        for(i=0; i<6;i++) {
            await this.sleep(10000);
            this.onPageChange();
            if(i===3) {
                PushNotification.localNotification({
                    /* Android Only Properties */
                    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    // ticker: "My Notification Ticker", // (optional)
                    // bigText: "Your bus is One stop before will arrive in 10 minutes", // (optional) default: none
                    color: "red", // (optional) default: system default
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: "high", // (optional) set notification priority, default: high
                    visibility: "private", // (optional) set notification visibility, default: private
                    importance: "high", // (optional) set notification importance, default: high
                    message: "Your bus is One stop before will arrive in 10 minutes", // (required)
                    playSound: true, // (optional) default: true
                    // repeatType: 'week', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                
                });
            }
        }
        for(j=0; j<7;j++) {
            await this.sleep(11000);
            this.onPageChange1();
            if(j===4) {
                PushNotification.localNotification({
                    /* Android Only Properties */
                    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    // ticker: "My Notification Ticker", // (optional)
                    // bigText: "Your destination will arrive in 10 minutes", // (optional) default: none
                    color: "red", // (optional) default: system default
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: "high", // (optional) set notification priority, default: high
                    visibility: "private", // (optional) set notification visibility, default: private
                    importance: "high", // (optional) set notification importance, default: high
                    message:  "Your destination will arrive in 10 minutes", // (required)
                    playSound: true, // (optional) default: true
                    // repeatType: 'week', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                
                });
            }
        }

        for(k=0; k<6;k++) {
            await this.sleep(12000);
            this.onPageChange2();
            if(k===3) {
                PushNotification.localNotification({
                    /* Android Only Properties */
                    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    // ticker: "My Notification Ticker", // (optional)
                    // bigText: "You are 5 minutes away from your destination", // (optional) default: none
                    color: "red", // (optional) default: system default
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: "high", // (optional) set notification priority, default: high
                    visibility: "private", // (optional) set notification visibility, default: private
                    importance: "high", // (optional) set notification importance, default: high
                    message: "You are 5 minutes away from your destination", // (required)
                    playSound: true, // (optional) default: true
                    // repeatType: 'week', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                
                });
            }
        }

        
            // (imagePaths.includes('index') === true)
        // labels.indexOf(labels[5].toLowerCase()) > -1
       
    }

    // componentWillUnmount() {
    //     AppState.removeEventListener('change', this._handleAppStateChange)
    // }

    onPageChange = () => {
         newposition = this.state.currentPosition +1;
        this.setState({currentPosition: newposition});
    }

    onPageChange1 = () => {
        newposition1 = this.state.currentPosition1 +1;
        this.setState({currentPosition1: newposition1});
    }

    onPageChange2 = () => {
        newposition2 = this.state.currentPosition2 +1;
        this.setState({currentPosition2: newposition2});
    }
    render() {

        return (

            <View style={styles.container}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#0c71b7'/>
                </View>
                <View style={[styles.headerview]}>

                {/* <Button style={{height:60,width:width-10,backgroundColor: '#2eacde',
                            marginTop:10,marginBottom:5,justifyContent:'space-evenly'}}
                                onPress={this.onPageChange}>
                                <Text style={{fontSize:20,color:'#FFFFFF'
                                    ,textAlign:'center',paddingLeft:10}}>Change</Text>
                        </Button> */}
                        <View style={{flexDirection:"column"}}>
                        <Text style={{fontSize:20
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5}}> 625M </Text>

                                    <Text style={{fontSize:12
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5,color:'#000',fontStyle: 'italic'}}> {this.state.busnote1} </Text>
                <TouchableOpacity onPress={this._goToYosemite}>
                <View style={{flexDirection:"row",marginBottom:5}}>
                 <Icons type='MaterialCommunityIcons' name='google-maps' size={20} color="#2eacde" style={{marginLeft:5,marginTop:5}}/>
                 <Text style={{fontSize:15
                                    ,textAlign:'left',paddingLeft:10}}> Click to open in Map </Text>
                 </View>
                 </TouchableOpacity>
                 <StepIndicator
                    customStyles={customStyles}
                    stepCount={7}
                    currentPosition={this.state.currentPosition}
                    labels={labels}
                />
                </View>
                <View style={{flexDirection:"column",marginTop:10}}>
                        <Text style={{fontSize:20
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5}}> 635MA </Text>
                
                <Text style={{fontSize:12
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5,fontStyle: 'italic'}}> {this.state.busnote2} </Text>
                 <TouchableOpacity onPress={this._goToYosemite}>
                 <View style={{flexDirection:"row",marginBottom:5}}>
                 <Icons type='MaterialCommunityIcons' name='google-maps' size={20} color="#2eacde" style={{marginLeft:5,marginTop:5}}/>
                 <Text style={{fontSize:15
                                    ,textAlign:'left',paddingLeft:10}}> Click to open in Map </Text>
                 </View>
                 </TouchableOpacity>
                 
                 <StepIndicator
                    customStyles={customStyles1}
                    stepCount={8}
                    currentPosition={this.state.currentPosition1}
                    labels={labels1}
                />
</View>
 <View style={{flexDirection:"column",marginTop:10}}>
                        <Text style={{fontSize:20
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5}}> 645TA </Text>
                 <Text style={{fontSize:12
                                    ,textAlign:'left',paddingLeft:10,marginBottom:5,fontStyle: 'italic'}}> {this.state.busnote3} </Text>
                 
                 <TouchableOpacity onPress={this._goToYosemite}>
                 <View style={{flexDirection:"row",marginBottom:5}}>
                 <Icons type='MaterialCommunityIcons' name='google-maps' size={20} color="#2eacde" style={{marginLeft:5,marginTop:5}}/>
                 <Text style={{fontSize:15
                                    ,textAlign:'left',paddingLeft:10}}> Click to open in Map </Text>
                 </View>
                 </TouchableOpacity>

                 <StepIndicator
                    customStyles={customStyles2}
                    stepCount={7}
                    currentPosition={this.state.currentPosition2}
                    labels={labels2}
                />
                </View>
</View>
                <View style={[styles.footer]}>

                    <BottomNavigation
                        tabs={this.tabs}
                        activeTab={this.state.activeTab}
                        onTabPress={newTab => {this.setState({ activeTab: newTab.key }),this._handleTabPress(newTab.key)}}
                        renderTab={this.renderTab}
                        // useLayoutAnimation
                    />

                </View>
            </View>

        );
        // Toast.show("Latitute"+this.state.latitude+"Longitude"+this.state.longitude);
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',

    },
    headerview: {
        // height: 250,
        //borderRadius:25,
        // borderWidth:5,
        // borderColor:'#917cb7',
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        paddingRight:5,
        paddingLeft:5,
        paddingTop:55,
        left: 0,
        right: 0,
        top:0,

    },
    content1: {
        // backgroundColor: '#B7B152',
        marginTop:300,

    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtext: {
        textAlign: 'center',
    },
    button: {
        margin: 5,
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden',
    },
    buttonInner: {
        flexDirection: 'column',
    },
    undetermined: {
        backgroundColor: '#E0E0E0',
    },
    authorized: {
        backgroundColor: '#C5E1A5',
    },
    denied: {
        backgroundColor: '#ef9a9a',
    },
    restricted: {
        backgroundColor: '#ef9a9a',
    },
    footer: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // borderTopColor:'#00CC77'
        // backgroundColor: '#8BC34A'
    },
    box: {

        backgroundColor: '#FFFFFF',
        // marginBottom: 10
        marginRight:5,
        marginLeft:5,

    },
    header: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderTopEndRadius:5,
        borderWidth:2,
        // borderColor:'#FFFFFF',
        marginRight:5,
        marginLeft:5,
    },
    headerText: {
        // textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        // color:'#FFFFFF',
    },
    content: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        // color:'#B7B152',
        marginRight:5,
        marginLeft:5,
    },

    Container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex:1
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
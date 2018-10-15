import React, { Component,PropTypes } from 'react';
import { Image,ScrollView,StyleSheet,TouchableOpacity,StatusBar,AsyncStorage,ActivityIndicator,BackHandler,AppState,
     UIManager, findNodeHandle,Alert,Keyboard,
    TouchableHighlight,Dimensions,Animated,Easing } from 'react-native';
import { Container, Header, Content, Card, CardItem, Spinner,Thumbnail,Picker,DeckSwiper, Text,Item,icon,Input,View,Fab, Button,  Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iccon from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iccons from 'react-native-vector-icons/Foundation'
import BottomNavigation, {
    ShiftingTab
} from 'react-native-material-bottom-navigation';
var PushNotification = require('react-native-push-notification');
// import Spinner from 'react-native-spinkit';
import Drawer from 'react-native-drawer';
import DatePicker from 'react-native-datepicker';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { TextField } from 'react-native-material-textfield';
import Snackbar from 'react-native-snackbar';
const ICON_SIZE = 24;
import { Actions, ActionConst } from 'react-native-router-flux'; // 4.0.0-beta.31
import Toast from 'react-native-simple-toast';

import SendSMS from 'react-native-sms-x';
// import Select from 'react-select';
import Divider from 'react-native-divider';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
// import { BottomNavigation } from 'react-native-material-ui';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Swiper from 'react-native-swiper';
const card      = {card: {width: 300,height:500}};
const cardItem = {cardItem: {fontSize: 40}};
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const ac_icon_blue = require('../Images/ac_icon_blue.png');
const ac_icon_grey = require('../Images/ac_icon_grey.png');
const nonac_icon_blue = require('../Images/nonac_icon_blue.png');
const nonac_icon_grey = require('../Images/nonac_icon_grey.png');
const search_magnifier_black = require('../Images/search_magnifier_black.png');
const search_magnifier_blue = require('../Images/search_magnifier_blue.png');
import Icoons from 'react-native-vector-icons/FontAwesome';
var params;
var favoriteticketdata={mobile: "9999988888",stops:[],routes:[]};
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
};
var locationkey={};
var locationlabel={};
var poiarray=[];
var currentpoi;
var favcardListArr;
var favticketkeys;
var poi = [
    {
        id: "1212",
        code:"CNTLGCB",
        name: "Hyderabad Central Gachibowli"
    },
    {
        id: "1213",
        code:"RDISSON",
        name: "Radisson Hotel Gachibowli"
    },
    {
        id: "1214",
        code:"GCHBWLI",
        name: "Gachibowli"
    },

    {
        id:125,
        code:"TLCMNGR",
        name: "TelecomNagar Bus Stop",
        nearby: [
            {
                id: "1212",
                code:"CNTLGCB",
                name: "Hyderabad Central Gachibowli"
            },
            {
                id: "1213",
                code:"RDISSON",
                name: "Radisson Hotel Gachibowli"
            },
            {
                id: "1214",
                code:"GCHBWLI",
                name: "Gachibowli"
            }
        ]
    },
];

var options = [    {
    key: '',
    label: ''

}];
// var options = [    {
//     key: 'kenya',
//     label: 'Kenya',
//     searchKey: 'Africa',
// },
//     {
//         key: 'uganda',
//         label: 'Uganda',
//         searchKey: 'Africa',
//     },
//     {
//         key: 'libya',
//         label: 'Libya',
//         searchKey: 'Africa',
//     },
//     {
//         key: 'japan',
//         label: 'Japan',
//         searchKey: 'Asia',
//     },
//     {
//         key: 'estonia',
//         label: 'Estonia',
//         searchKey: 'Europe',
//     }];

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            favticket:[],
            activeTab: 'home',
            isDateTimePickerVisible: false,
            selectedItem: undefined,
            selected2: '',
            viewSection :false,
            results: {
                items: []
            },
            pickervisible1: false,
            pickervisible2: false,
            picked1: '',
            picked2: '',
            date: new Date(),
            selected1: '',

        };
        // this.handleAppStateChange = this.handleAppStateChange.bind(this);
        // this._onButtonPressed = this._onButtonPressed.bind(this);
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
    ];

    // renderBottomComponent(){
    //
    // if(this.state.viewSection) {
    //         return (
    //             <ScrollView
    //                 style={styles.container1}
    //                 ref={(scrollView) => { this.scrollView = scrollView; }}
    //                 //pagingEnabled={true}
    //                 horizontal= {true}
    //                 decelerationRate={0}
    //                 snapToInterval={width - 60}
    //                 snapToAlignment={"center"}
    //                 contentInset={{
    //                     top:0,
    //                     left: 30,
    //                     bottom:0,
    //                     right: 30,
    //                 }}>
    //                 <Card style={styles.view} >
    //                     <Text style={{textAlign:'center'}}>
    //                         Date:date
    //                     </Text>
    //                     <Text style={{textAlign:'center'}}>
    //                         From:Location
    //                     </Text>
    //                     <Text style={{textAlign:'center'}}>
    //                         To:Location
    //                     </Text>
    //                 </Card>
    //                 <Card style={styles.view2} >
    //                 </Card>
    //                 <Card style={styles.view} >
    //                 </Card>
    //                 <Card style={styles.view2} >
    //                 </Card>
    //             </ScrollView>
    //         );
    //     }
    // }
    // buttonPress=()=>{
    //     // this.scrollView.scrollTo({x: -30},1);
    //     this.setState({viewSection:true})
    //     // this.setState({viewSection: !this.state.viewSection})
    // };


    // state = {
    //     activeTab: this.tabs[0].key
    // }
    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />

    );


    renderTab = ({ tab, isActive }) => (
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    );

    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }
    onChangeValue (value: string) {
        this.setState({
            selected2 : value
        });
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });


    _hideDateTimePicker = () => {this.setState({ isDateTimePickerVisible: false })};

    _handleDatePicked = (date) => {
        this.setState({
            date :  date
        });
        this._hideDateTimePicker();
    };

    handleChange(value: string) {
        this.setState({
            selected: value
        });
    };

    _SwapPickerText(){
        let temploc=this.state.picked1;
        this.setState({picked1: this.state.picked2, picked2:temploc});
    };


    // sendSMSFunction() {
    //     SendSMS.send(9885638104, "9885638104", "Hello.. Thank you for using SmarTran booking service ! \nYour ticket for Jedimetla to mehdipatnam for 18 Aug 2018\n" +
    //         "at 5:30 have been generated open the link fro seeing th qr code for scanning\n" +
    //         "  Have a nice day.",
    //         (msg)=>{
    //             Toast.show(msg, Toast.SHORT);
    //         }
    //     );
    // Actions.ticketScreen();
    // }
    // setFromLoc(){
    //     this.setState({selected1: ''});
    // }
    _handleTabPress(pressedKey) {
        switch (pressedKey) {
            case 'home':
                break;
            case 'favourite':
                // Actions.homeScreen();
                // {this.buttonPress}
                this.setState({viewSection:!this.state.viewSection});
                // {this.renderBottomComponent()}
                break;
            case 'track':
                Actions.tripScreen();
                break;
            case 'ticket':
                Actions.ticketScreen(params);
                break;
            case 'more':
                Actions.moreScreen();
                break;
            default:

        }
    };

    onFromShowpicker = () => {
        this.setState({ pickervisible1: true });
    };
    onToShowpicker = () => {
        this.setState({ pickervisible2: true });
    };

    onFromSelectpicker = (picked) => {
        this.setState({
            picked1: picked,
            pickervisible1: false,
        });
        // Keyboard.dismiss();
    };
    onToSelectpicker = (picked) => {
        this.setState({
            picked2: picked,
            pickervisible2: false,
        });
    };

    onFromCancelpicker = () => {
        this.setState({
            pickervisible1: false
        });
    };
    onToCancelpicker = () => {
        this.setState({
            pickervisible2: false
        });
    };

    // favouritedata(recivedindex){
    //     // this.setState({
    //     //     picked1: favoriteticketdata.routes[recivedindex].from
    //     // });
    //     // this.setState({
    //     //     picked2: favoriteticketdata.routes[recivedindex].to
    //     // });
    //     params.fromLoc= favoriteticketdata.routes[recivedindex].from;
    //     params.toLoc= favoriteticketdata.routes[recivedindex].to;
    //
    //     alert("all tick"+recivedindex+"from"+params.fromLoc+"to"+params.toLoc+"date"+params.tripdte);
    //
    // };


    ShowHideActivityIndicator = () =>{

        this.setState({loading: true});
                setTimeout(() => {
            Actions.searchScreen(params);
                    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        }, 2000)
            // this.setState({loading: false})
    };
    // _onButtonPressed() {
    //             setTimeout(() => {
    //         this.setState({ loading: true });
    //         Actions.searchScreen(params);
    //                 this.setState({ loading: false });
    //     }, 3000)
    // };
    async componentDidMount() {
        await AsyncStorage.getItem('favs')
            .then((favs) => {
                let tempfavticket = favoriteticketdata;
                // alert("all tick"+favs+"favticket");
                favoriteticketdata = favs ? JSON.parse(favs) : tempfavticket;
                // this.setState({favticket: favoriteticketdata});
                // alert("all tick"+JSON.stringify(favoriteticketdata.routes));
            }).done();
        await AsyncStorage.getItem('mobileno')
            .then((mobileno) => {
                // let tempfavticket = favoriteticketdata;
                // alert("all tick"+favs+"favticket");
                favoriteticketdata.mobile = mobileno;
                // this.setState({favticket: favoriteticketdata});
                // AsyncStorage.setItem('number', (favoriteticketdata.mobile));
                // alert("all tick"+(favoriteticketdata.mobile));
                BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            }).done();
        // AppState.addEventListener('change',this.handleAppStateChange);
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change',this.handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    // handleAppStateChange = ()  => {
    //     // if(appState === 'background'){
    //         PushNotification.localNotification({
    //             /* Android Only Properties */
    //             id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    //             ticker: "My Notification Ticker", // (optional)
    //             autoCancel: true, // (optional) default: true
    //             largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    //             smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    //             bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    //             subText: "This is a subText", // (optional) default: none
    //             color: "red", // (optional) default: system default
    //             vibrate: true, // (optional) default: true
    //             vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    //             tag: 'some_tag', // (optional) add tag to message
    //             group: "group", // (optional) add group to message
    //             ongoing: false, // (optional) set whether this is an "ongoing" notification
    //             priority: "high", // (optional) set notification priority, default: high
    //             visibility: "private", // (optional) set notification visibility, default: private
    //             importance: "high", // (optional) set notification importance, default: high
    //
    //             //     /* iOS only properties */
    //             //     alertAction: // (optional) default: view
    //             //     category: // (optional) default: null
    //             // userInfo: // (optional) default: null (object containing additional notification data)
    //
    //             /* iOS and Android properties */
    //             title: "My Notification Title", // (optional)
    //             message: "My Notification Message", // (required)
    //             playSound: false, // (optional) default: true
    //             soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    //             number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    //             repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    //             actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
    //         });
    //
    //     // }
    // };
    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit the app?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
    }, {
            text: 'OK',
                onPress: () => BackHandler.exitApp()
        }, ]
    , {
            cancelable: false
        }
    );
        return true;
    };

    resetData(){
    this.setState({
        picked2 : ''
                  });
};
    render() {
        params = {};
         params = {
             fromLoc:this.state.picked1,
             toLoc:this.state.picked2,
             tripdte:this.state.date,

         };

        fetch("http://35.240.147.215:3037/poi/name", { // USE THE LINK TO THE SERVER YOU'RE USING mobile
            method: 'POST', // USE GET, POST, PUT,ETC
            headers: { //MODIFY HEADERS
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                //    application/x-www-form-urlencoded
            },
            body: 'name='
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(responseJson.message);
               // if (responseJson.message==="poi found"){

                    poiarray=responseJson.POI;
                    options = poiarray.map( (currentpoi) => {
                        return{
                            key: currentpoi.name,
                            label: currentpoi.name,
                        };
                    });

               // }

            })
            .catch((error) => {
                console.error(error);
            });

            favcardListArr = favoriteticketdata.routes.map((AllfavTicket,index)=> {
            // favticketkeys = Object.keys(AllfavTicket);
            // let favcardlistlen = favoritedata.length;
            // alert("all tick" + AllfavTicket.from);

            // if(this.state.viewSection===true) {
            return (

                <Card style={styles.view}>
                    <TouchableOpacity  onPress={ () => {
                        params.fromLoc= favoriteticketdata.routes[index].from;
                        params.toLoc= favoriteticketdata.routes[index].to;

                        // alert("all tick "+index+" from"+params.fromLoc+"to"+params.toLoc+"date"+params.tripdte);
                        Actions.searchScreen(params);
                    }}>
                    <View style={{flexDirection:'column'}}>
                    <Text style={{textAlign: 'center',marginTop: 5, fontSize: 14, color: '#000'}}>
                        {AllfavTicket.from}
                    </Text>
                    <Text  style={{textAlign:'center',fontSize:16,color:'#000',marginTop:10}} > To
                    </Text>
                    <Text style={{textAlign: 'center',marginTop: 5, fontSize: 14, color: '#000'}}>
                         {AllfavTicket.to}
                    </Text>
                    </View>
                    </TouchableOpacity>
                </Card>

            );
            // }
        });
        return (

            <View style={styles.container}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#4d6bcb'/>
                </View>

                <View style={[styles.headerview]}>

                    <Card styles={card}>

                        <View style={{flexDirection:"row",marginTop:10}}>
                            <View style={{flexDirection:"column",justifyContent:'space-evenly',marginLeft: 15}}>
                                {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                                <Image source={require('../Images/from_icon.png')}
                                       style={{width: 25, height: 35, paddingLeft: 5}}/>
                                <Image source={require('../Images/to_icon.png')}
                                       style={{width: 25, height: 35, paddingLeft: 5}}/>

                            </View>
                            <View style={{flexDirection:"column",justifyContent:'space-evenly'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:20}}>

                                <TouchableOpacity style={{width:280,justifyContent:'flex-end',flex:8}}
                                                  onPress={this.onFromShowpicker}>
                                    {/*<Text>Select Country: {this.state.picked}</Text>*/}
                                    <TextField label="From Location"
                                    lineHeight={30}
                                    value={this.state.picked1}
                                    fontSize={16}
                                    editable={false}
                                    // onChangeText={(itemValue) => {this.setState({selected1: this.findPOI(itemValue)})}}
                                    containerStyle={{height:55,width:280,justifyContent:'flex-end'}}
                                    />
                                </TouchableOpacity>
                                <ModalFilterPicker
                                    visible={this.state.pickervisible1}
                                    onSelect={this.onFromSelectpicker}
                                    onCancel={this.onFromCancelpicker}
                                    options={options}
                                    optionTextStyle={style={fontSize:16}}
                                />
                                    <TouchableOpacity  style={{marginTop:20}} onPress={this._SwapPickerText.bind(this)}>
                                        <Icon type='MaterialIcons' name='swap-vertical-circle' size={35} color="#2eacde"/>
                                    </TouchableOpacity>
                                    {/*<View style={{*/}
                                        {/*flex: 1,*/}
                                        {/*borderBottomColor: 'black',*/}
                                        {/*borderBottomWidth: 1,*/}
                                        {/*width: width - 10,}}>*/}
                                    {/*</View>*/}
                                </View>
                                <TouchableOpacity  style={{width:280,justifyContent:'flex-end'}}
                                                   onPress={this.onToShowpicker}>
                                    {/*<Text>Select Country: {this.state.picked}</Text>*/}
                                <TextField label="To Location"
                                           lineHeight={30}
                                           value={this.state.picked2}
                                           editable={false}
                                           fontSize={16}
                                           // onChangeText={(itemValue) => this.setState({selected2: itemValue})}
                                           containerStyle={{height:55,width:280,marginTop:10,justifyContent:'flex-end'}}/>
                                </TouchableOpacity>
                                <ModalFilterPicker
                                    visible={this.state.pickervisible2}
                                    onSelect={this.onToSelectpicker}
                                    onCancel={this.onToCancelpicker}
                                    options={options}
                                    optionTextStyle={style={fontSize:16}}
                                />

                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:'flex-start',marginTop:10}}>

                            <TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>
                                <Image source={require('../Images/calendar_icon.png')} style={{height: 25, width: 25,marginLeft:18}}
                                />
                            </TouchableOpacity>
                            <Text note style={{fontSize:12,textAlign:'center'}} >  Journey Date</Text>
                        </View>

                        <View style={{flexDirection:"row",justifyContent:'flex-start'}}>
                            <TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    mode={'date'}
                                    minimumDate={Moment().toDate()}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />


                            </TouchableOpacity>



                        </View>
                        <TouchableOpacity onPress={this._showDateTimePicker}>
                            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}
                                  onPress={this._showDateTimePicker}>

                                <Text note style={{fontSize:25,color:'#000',marginLeft:15}} onPress={this._showDateTimePicker}> {
                                    Moment(this.state.date).format('DD')} </Text>

                                <View style={{flexDirection:"column",justifyContent:'space-evenly'}}
                                      onPress={this._showDateTimePicker}>
                                    {/*<Text note style={{fontSize:10,color:'#000'}}*/}
                                          {/*onPress={this._showDateTimePicker}> {*/}
                                        {/*Moment(this.state.date).format('ddd')} </Text>*/}
                                    <Text note style={{fontSize:25,color:'#000'}}
                                          onPress={this._showDateTimePicker}> {
                                        Moment(this.state.date).format('MMM')} </Text>
                                </View>
                                {/*<Text note style={{fontSize:16,color:'#2eacde',textAlign:'center',fontWeight:'bold'}} > {*/}
                                {/*Moment(this.state.date).format('h:mm A')} </Text>*/}
                                <Text note style={{fontSize:25,color:'#000',marginLeft:98,justifyContent: 'flex-end'}}
                                      onPress={this._showDateTimePicker}> {
                                    Moment(this.state.date).format('dddd')} </Text>
                            </View>
                        </TouchableOpacity>


                        <Button style={{height:60,width:width-10,backgroundColor: '#2eacde',
                            marginTop:10,justifyContent:'space-evenly'}}
                                onPress={() => {
                                if(!this.state.picked1 || !this.state.picked2){
                                    // Toast.show(" From or To Location cannot be empty! ",Toast.LONG);
                                    Snackbar.show({
                                        title: 'From or To Location cannot be empty!',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                }
                                else if(this.state.picked1 === this.state.picked2){
                                    // Toast.show(" From and To Location cannot be same! ",Toast.LONG);
                                    Snackbar.show({
                                        title: 'From and To Location cannot be same!',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                    this.resetData();
                                }
                                else{
                                    // Actions.searchScreen(params);
                                    this.ShowHideActivityIndicator();
                                    // this._onButtonPressed();
                                }}}>
                            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                <Image source={require('../Images/search_magnifie.png')} style = {{ width: 20,
                                    height: 20,alignItems:'center'}}/>
                                <Text style={{fontSize:20,color:'#FFFFFF'
                                    ,textAlign:'center',paddingLeft:10}}>Search</Text>
                            </View>
                        </Button>

                    </Card>
                    {
                        // Here the ? Question Mark represent the ternary operator.
                        //style={{backgroundColor:'#FFFFFF',width:width-220}}
                        this.state.loading ?  <ActivityIndicator color = '#2eacde'
                                                                 size = "large" style={{padding: 20}} /> : null
                    }
                    {/*{(this.state.viewSection) &&*/}
                    {/*<ActivityIndicator*/}
                        {/*animating = {this.state.loading}*/}
                        {/*color = '#bc2b78'*/}
                        {/*size = "large"*/}
                        {/*style = {styles.activityIndicator}/>*/}

                        {/*<ScrollView*/}
                        {/*style={styles.container1}*/}
                        {/*ref={(scrollView) => { this.scrollView = scrollView; }}*/}
                        {/*//pagingEnabled={true}*/}
                        {/*horizontal= {true}*/}
                        {/*decelerationRate={0}*/}
                        {/*snapToInterval={width - 60}*/}
                        {/*snapToAlignment={"center"}*/}
                        {/*contentInset={{*/}
                        {/*top:0,*/}
                        {/*left: 30,*/}
                        {/*bottom:0,*/}
                        {/*right: 30,*/}
                    {/*}}>*/}

                        {/*</ScrollView>*/}

                    {/*}*/}
                    {(this.state.viewSection) &&
                    <View>
                        <Text  style={{justifyContent:'flex-start',fontSize:16,color:'#FFFFFF'}} > Favourite Routes
                        </Text>

                    <ScrollView
                        style={styles.container1}
                        ref={(scrollView) => { this.scrollView = scrollView; }}
                        //pagingEnabled={true}
                        horizontal= {true}
                        decelerationRate={0}
                        snapToInterval={width - 60}
                        snapToAlignment={"center"}
                        contentInset={{
                            top:0,
                            left: 30,
                            bottom:0,
                            right: 30,
                        }}>

                        {favcardListArr}
                        {/*<Card style={styles.view}>*/}
                            {/*/!*<Text style={{textAlign:'center'}}>*!/*/}
                            {/*/!*Date:date*!/*/}
                            {/*/!*</Text>*!/*/}
                            {/*<Text style={{textAlign: 'center'}}>*/}
                               {/*From:from*/}
                            {/*</Text>*/}
                            {/*<Text style={{textAlign: 'center'}}>*/}
                                {/*To:to*/}
                            {/*</Text>*/}
                        {/*</Card>*/}

                    </ScrollView>
                    </View>
                    }

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
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#4d6bcb',

    },
    headerview: {
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
    spinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF'

    },
    content1: {
        // backgroundColor: '#B7B152',
        marginTop:300,

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

        backgroundColor: '#4d6bcb',
        // marginBottom: 10
        marginRight:5,
        marginLeft:5,

    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    header: {
        backgroundColor: '#4d6bcb',
        padding: 10,
        borderTopEndRadius:5,
        borderWidth:2,
        // borderColor:'#0C71B7',
        marginRight:5,
        marginLeft:5,
    },
    headerText: {
        // textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        // color:'#0C71B7',
    },
    content: {
        padding: 20,
        backgroundColor: '#4d6bcb',
        // color:'#B7B152',
        marginRight:5,
        marginLeft:5,
    },
    container1: {},
    view: {
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        width: width - 80,
        margin: 10,
        height: 100,
        borderRadius: 10,
        color:'#000',
        borderRightWidth:10,borderBottomRightRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,
        borderTopLeftRadius:10,borderLeftWidth:10,shadowColor:"#f1f1f1f1",borderColor:'#2eacde'
        //paddingHorizontal : 30
    },
    view2: {
        marginTop: 85,
        backgroundColor: '#FFFFFF',
        width: width - 80,
        margin: 10,
        height: 100,
        borderRadius: 10,
        color:'#000'
        //paddingHorizontal : 30
    }
});
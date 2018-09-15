import React, { Component,PropTypes } from 'react';
import { Image,ScrollView,StyleSheet,TouchableOpacity,StatusBar,
     UIManager, findNodeHandle,
    TouchableHighlight,Dimensions,Animated,Easing } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,icon,Input,View,Fab, Button,  Left, Body, Right,
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
var params;
const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
};
var locationkey={};
var locationlabel={};
var poiarray=[];
var currentpoi;
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
            activeTab: 'home',
            isDateTimePickerVisible: false,
            selectedItem: undefined,
            selected2: '',
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

    _onSubmit(param) {
        // const { selected1, selected2 } = this.state;
        if(!(this.state.selected1) || !(this.state.selected2)){
            Toast.show("Please enter From and To Location",Toast.LONG);
        }

        else if(this.state.selected1 === this.state.selected2){
            Toast.show(" From and To Location cannot be same",Toast.LONG);
        }

        else if((this.state.selected1) && (this.state.selected2)){
            Actions.searchScreen(param);
        }
        // Alert.alert('Button has been pressed!');
    };

    onFromShowpicker = () => {
        this.setState({ pickervisible1: true });
        // fetch("http://35.240.144.134:3037/poi/name", { // USE THE LINK TO THE SERVER YOU'RE USING mobile
        //     method: 'POST', // USE GET, POST, PUT,ETC
        //     headers: { //MODIFY HEADERS
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         //    application/x-www-form-urlencoded
        //     },
        //     body: JSON.stringify({location:"name"})
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         // alert(responseJson.message);
        //         if (responseJson.message==="poi found"){ //MAKE YOU VALIDATIONS HERE ) {
        //
        //
        //         }
        //         else   {
        //             // Actions.lo({text: this.state.mobiles });
        //             // Actions.homeScreen();
        //
        //         }
        //
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };
    onToShowpicker = () => {
        this.setState({ pickervisible2: true });
    };

    onFromSelectpicker = (picked) => {
        this.setState({
            picked1: picked,
            pickervisible1: false,
        });
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

    render() {
          params = {};
         params = {
             fromLoc:this.state.picked1,
             toLoc:this.state.picked2,
             tripdte:this.state.date,
         };
        fetch("http://35.240.144.134:3037/poi/name", { // USE THE LINK TO THE SERVER YOU'RE USING mobile
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
                                />
                                {/*<Picker*/}
                                    {/*placeholder="Select One"*/}
                                    {/*// prompt="From Location"*/}
                                    {/*mode="dropdown"*/}
                                    {/*style={{height:45,width:295,borderWidth:5, borderColor:'#2eacde',justifyContent:'flex-end'}}*/}
                                    {/*selectedValue={this.state.selected1}*/}
                                    {/*onValueChange={(itemValue) => this.setState({selected1: itemValue})}>*/}
                                    {/*/!*<View style={{flexDirection: 'row'}}>*!/*/}
                                    {/*/!*<Text note style={{fontSize:12,textAlign:'center',backgroundColor:'#2eacde',*!/*/}
                                    {/*/!*color:'#FFFFFF'}} >JED</Text>*!/*/}
                                    {/*/!*</View>*!/*/}
                                    {/*<Item label="From Location" value="" />*/}
                                    {/*<Item label="JEDIMETLA BUS STOP" value="JEDIMETLA BUS STOP" />*/}
                                    {/*<Item label="KOTI BUS STOP" value="KOTI BUS STOP" />*/}
                                    {/*<Item label="HITECH CITY BUS STOP" value="HITECH CITY BUS STOP" />*/}
                                    {/*<Item label="VANASTALIPURAM" value="VANASTALIPURAM" />*/}
                                    {/*<Item label="KACHIGUDA BUS STOP" value="KACHIGUDA BUS STOP" />*/}
                                    {/*<Item label="MEHDIPATNAM BUS STOP" value="MEHDIPATNAM BUS STOP" />*/}
                                    {/*<Item label="JNTU (KUKATPALLY) BUS STOP" value="JNTU (KUKATPALLY) BUS STOP" />*/}
                                    {/*<Item label="MIYAPUR X ROADS" value="MIYAPUR X ROADS" />*/}
                                {/*</Picker>*/}
                                {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                                    {/*<View style={{*/}
                                        {/*flex: 10,*/}
                                        {/*borderBottomColor: 'black',*/}
                                        {/*borderBottomWidth: 1,*/}
                                        {/*width: width - 10,}}>*/}
                                    {/*</View>*/}
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
                                           // onChangeText={(itemValue) => this.setState({selected2: itemValue})}
                                           containerStyle={{height:55,width:280,marginTop:10,justifyContent:'flex-end'}}/>
                                </TouchableOpacity>
                                <ModalFilterPicker
                                    visible={this.state.pickervisible2}
                                    onSelect={this.onToSelectpicker}
                                    onCancel={this.onToCancelpicker}
                                    options={options}
                                />

                                {/*<Picker*/}
                                    {/*placeholder="Select One"*/}
                                    {/*mode="dropdown"*/}
                                    {/*style={{height:45,width:295,borderWidth:5, borderColor:'#2eacde'}}*/}
                                    {/*selectedValue={this.state.selected2}*/}
                                    {/*onValueChange={(itemValue) => this.setState({selected2: itemValue})}>*/}

                                    {/*<Item label="To Location" value="" />*/}
                                    {/*<Item label="MEHDIPATNAM BUS STOP" value="MEHDIPATNAM BUS STOP" />*/}
                                    {/*<Item label="MIYAPUR X ROADS" value="MIYAPUR X ROADS" />*/}
                                    {/*<Item label="JNTU (KUKATPALLY) BUS STOP" value="JNTU (KUKATPALLY) BUS STOP" />*/}
                                    {/*<Item label="JEDIMETLA BUS STOP" value="JEDIMETLA BUS STOP" />*/}
                                    {/*<Item label="VANASTALIPURAM" value="VANASTALIPURAM" />*/}
                                    {/*<Item label="KOTI BUS STOP" value="KOTI BUS STOP" />*/}
                                    {/*<Item label="HITECH CITY BUS STOP" value="HITECH CITY BUS STOP" />*/}
                                    {/*<Item label="KACHIGUDA BUS STOP" value="KACHIGUDA BUS STOP" />*/}
                                {/*</Picker>*/}

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
                                }
                                else{
                                    Actions.searchScreen(params);
                                }}}>
                            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                <Image source={require('../Images/search_magnifie.png')} style = {{ width: 20,
                                    height: 20,alignItems:'center'}}/>
                                <Text style={{fontSize:20,color:'#FFFFFF'
                                    ,textAlign:'center',paddingLeft:10}}>Search</Text>
                            </View>
                        </Button>


                    </Card>


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
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: '#F5FCFF',
    // },
    // title: {
    //     textAlign: 'center',
    //     fontSize: 22,
    //     fontWeight: '300',
    //     marginBottom: 20,
    // },
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



    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4d6bcb',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4d6bcb',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4d6bcb',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontStyle:'italic',
        fontWeight:'bold'
    },
    image: {
        width,
        flex: 1
    }
    // active: {
    //     backgroundColor: 'rgba(255,255,255,1)',
    // },
    // inactive: {
    //     backgroundColor: 'rgba(245,252,255,1)',
    // },
    // selectors: {
    //     marginBottom: 10,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    // },
    // selector: {
    //     backgroundColor: '#F5FCFF',
    //     padding: 10,
    // },
    // activeSelector: {
    //     fontWeight: 'bold',
    // },
    // selectTitle: {
    //     fontSize: 14,
    //     fontWeight: '500',
    //     padding: 10,
    // },
});
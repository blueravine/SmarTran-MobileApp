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
} from 'react-native-material-bottom-navigation'

import Drawer from 'react-native-drawer'
import DatePicker from 'react-native-datepicker'
const ICON_SIZE = 24
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
}
// import {BoxShadow} from 'react-native-shadow';
// import Switch from 'react-native-customisable-switch';
import AutoComplete from "react-native-autocomplete";

// import DropDown, {
//     Select,
//     Option,
//     OptionList,
// } from 'react-native-selectme';


// const options = [
//     // ...
//     { value: 'Jedimetla', label: 'Jed' },
//     { label:"Ko", value:"Koti"},
//     {label:"Ga", value:"Gachibowli"},
//     {label:"Jub," ,value:"JublieeHills"},
//     {label:"Meh", value:"Mehdipatnam"},
//     {label:"Meh", value:"Mehboobnagar"},
//     {label:"Kot", value:"Kothaguda"},
//     {label:"Mi" ,value:"Miyapur" },
//     // ...
// ];
// const filterOptions = createFilterOptions({ options });

export default class Home extends Component {
    // state = {
    //     activeTab: 'home'
    // }
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
    ]

    // state = {
    //     activeTab: this.tabs[0].key
    // }
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
    // static propTypes = {
    //     // array of strings, will be list items of Menu
    //     // actions:  PropTypes.arrayOf(PropTypes.string).isRequired,
    //     onPress: PropTypes.func.isRequired
    // }

    state = {
        isDateTimePickerVisible: false,
    };


    constructor() {
        super();

        // this.state = {
        //     icon: null
        // }

        this.state = { date: new Date() };
        this.state ={
            showacimage:false
        };
        this.state ={
            shownonacimage:false
        };
        this.state ={
            showasearchimage:false
        };
        // this.setState = { date: new Date() };

        // this.state= {
        //     active:'search',
        // };
        this.state= {
            activeTab: 'home',
        };
        // this.state = {
        //     selected: "Je",
        //
        // };

        this.state = {
            selectedItem: undefined,
            selected1: '',
            results: {
                items: []
            }
        }
        this.state = {
            selectedItem: undefined,
            selected2: '',
            results: {
                items: []
            }
        }
        // this.state = {
        //     canada: ''
        // };

    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    // _getOptionList() {
    //     return this.refs['OPTIONLIST'];
    // }
    //
    //
    // _canada(province) {
    //
    //     this.setState({
    //         ...this.state,
    //         canada: province
    //     });
    // }

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

    changeACLogo() {
        var imgsource = this.state.showacimage ? ac_icon_blue : ac_icon_grey;
        return (

            <Image source={imgsource} style={{height: 30, width: 30,alignItems:'center'}}/>

        );
    }
    changebottomLogo() {
        var imgsourcesearch = this.state.showasearchimage ? search_magnifier_blue : search_magnifier_black;
        return (

            <Image source={imgsourcesearch} style={{height: 30, width: 30,alignItems:'center'}}/>

        );
    }
    // onError () {
    //     console.log('Popup Error')
    // }
    // onPress = () => {
    //     if (this.state.icon) {
    //         UIManager.showPopupMenu(
    //             findNodeHandle(),
    //            this.props.actions,
    //             this.onError,
    //            this.props.onPress
    //         )
    //     }
    // }
    // onRef = icon => {
    //     if (!this.state.icon) {
    //         this.setState({icon})
    //     }
    // }

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            date :  date
        });
        this._hideDateTimePicker();
    };
    // _handleTimePicked = (time) => {
    //     this.setState({
    //         time :  time
    //     });
    //     this._hideDateTimePicker();
    // };
    handleChange(value: string) {
        this.setState({
            selected: value
        });
    }
    state = {
        isOnDefaultToggleSwitch: true,
        isOnLargeToggleSwitch: false,
        isOnBlueToggleSwitch: false,
    };

    onToggle(isOn){
        // alert('Changed to ' + isOn)
        this.state=false;
    }
    onToggle(isOff){
        // alert('Changed to ' + isOn)
        this.state=true;
    }

    _SwapPickerText(){
        // var pickertext = fromloc;
        // fromloc = toloc;
        // toloc = pickertext;
        //
        // return(fromloc,toloc);
        let temploc=this.state.selected1;
        this.setState({selected1: this.state.selected2, selected2:temploc});
    }


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
    }

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
    }
    render() {
          params = {};
         params = {
             fromLoc:this.state.selected1,
             toLoc:this.state.selected2,
             tripdte:this.state.date,
         };
        return (

            <View style={styles.container}>
                <View>
                    <StatusBar
                        hidden={false}
                        backgroundColor='#4d6bcb'/>
                </View>
                {/*<Drawer*/}
                    {/*open={true}*/}
                    {/*ref={(ref) => this._drawer = ref}*/}
                    {/*type="overlay"*/}
                    {/*// content={<ControlPanel />}*/}
                    {/*tapToClose={true}*/}
                    {/*openDrawerOffset={0.2} // 20% gap on the right side of drawer*/}
                    {/*panCloseMask={0.2}*/}
                    {/*closedDrawerOffset={-3}*/}
                    {/*styles={drawerStyles}*/}
                    {/*tweenHandler={(ratio) => ({*/}
                        {/*main: { opacity:(2-ratio)/2 }*/}
                    {/*})}*/}
                {/*>*/}
                    {/*/!*<MainView />*!/*/}
                {/*</Drawer>*/}

                {/*<ScrollView >*/}
                <View style={[styles.headerview]}>
                    {/*<Card>*/}
                    {/*<Image source={require('../Images/smartranlogowhite.png')} style={{height: 100, width: 100, flex: 1,*/}
                    {/*marginLeft:125,justifyContent: "center"}}/>*/}
                    {/*</Card>*/}
                    {/*<Text note style={{fontSize:18,color:'#FFFFFF',fontWeight:'bold'}} > Plan your trip here !</Text>*/}
                    {/*<Header />*/}

                    {/*<Content>*/}

                    <Card styles={card}>

                        {/*<CardItem cardBody styles={cardItem}>*/}
                        <View style={{flexDirection:"row",marginTop:10}}>
                            <View style={{flexDirection:"column",justifyContent:'space-evenly',marginLeft: 15}}>
                                {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                                <Image source={require('../Images/from_icon.png')}
                                       style={{width: 25, height: 35, paddingLeft: 5}}/>
                                <Image source={require('../Images/to_icon.png')}
                                       style={{width: 25, height: 35, paddingLeft: 5}}/>

                            </View>
                            {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                            {/*<Text note style={{fontSize:16,fontWeight:'bold',textAlign:'left'}} > From</Text>*/}
                            {/*<Text note style={{fontSize:16,fontWeight:'bold',textAlign:'left'}} > To</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                                {/*<View*/}
                                    {/*style={{*/}
                                        {/*borderLeftWidth: 1,*/}
                                        {/*borderLeftColor: '#000',*/}
                                    {/*}}*/}
                                {/*/>*/}
                            {/*</View>*/}
                            <View style={{flexDirection:"column",justifyContent:'space-evenly'}}>
                                {/*<Select*/}
                                {/*width={250}*/}
                                {/*ref="SELECT1"*/}
                                {/*optionListRef={this._getOptionList.bind(this)}*/}
                                {/*defaultValue="From ..."*/}
                                {/*onSelect={this._canada.bind(this)}>*/}
                                {/*<Option value = {{id : "Je"}}>Jedimetla</Option>*/}
                                {/*<Option>Gachibowli</Option>*/}
                                {/*<Option>Koti</Option>*/}
                                {/*<Option>JublieeHills</Option>*/}
                                {/*<Option>Mehdipatnam</Option>*/}
                                {/*<Option>Raheja IT Park</Option>*/}
                                {/*<Option>Miyapur</Option>*/}
                                {/*</Select>*/}

                                {/*<OptionList ref="OPTIONLIST"/>*/}

                                {/*<Select*/}
                                {/*width={250}*/}
                                {/*ref="SELECT1"*/}
                                {/*optionListRef={this._getOptionList.bind(this)}*/}
                                {/*defaultValue="From ..."*/}
                                {/*onSelect={this._canada.bind(this)}>*/}
                                {/*<Option value = {{id : "Me"}}>Mehdipatnam</Option>*/}
                                {/*<Option>Gachibowli</Option>*/}
                                {/*<Option>Koti</Option>*/}
                                {/*<Option>JublieeHills</Option>*/}
                                {/*<Option>Mehdipatnam</Option>*/}
                                {/*<Option>Raheja IT Park</Option>*/}
                                {/*<Option>Miyapur</Option>*/}
                                {/*</Select>*/}

                                {/*<OptionList ref="OPTIONLIST"/>*/}
                                {/*<View style={{*/}
                                {/*borderBottomColor: 'black',*/}
                                {/*borderBottomWidth: 1,*/}
                                {/*height: height - 20,}}>*/}
                                {/*</View>*/}
                                {/*<View style={{*/}
                                {/*flex: 1,*/}
                                {/*borderBottomColor: 'black',*/}
                                {/*borderBottomWidth: 1,*/}
                                {/*height: height - 420,}}>*/}
                                {/*</View>*/}
                                {/*<Select*/}
                                {/*name="university"*/}
                                {/*value="one"*/}
                                {/*options={options}*/}
                                {/*filterOptions={filterOptions}*/}
                                {/*onChange={val => console.log(val)}*/}
                                {/*/>*/}
                                <Picker
                                    placeholder="Select One"
                                    // prompt="From Location"
                                    mode="dropdown"
                                    style={{height:45,width:295,borderWidth:5, borderColor:'#2eacde',justifyContent:'flex-end'}}
                                    selectedValue={this.state.selected1}
                                    onValueChange={(itemValue) => this.setState({selected1: itemValue})}>
                                    {/*<View style={{flexDirection: 'row'}}>*/}
                                    {/*<Text note style={{fontSize:12,textAlign:'center',backgroundColor:'#2eacde',*/}
                                    {/*color:'#FFFFFF'}} >JED</Text>*/}
                                    {/*</View>*/}
                                    <Item label="From Location" value="" />
                                    <Item label="JEDIMETLA BUS STOP" value="JEDIMETLA BUS STOP" />
                                    <Item label="KOTI BUS STOP" value="KOTI BUS STOP" />
                                    <Item label="HITECH CITY BUS STOP" value="HITECH CITY BUS STOP" />
                                    <Item label="VANASTALIPURAM" value="VANASTALIPURAM" />
                                    <Item label="KACHIGUDA BUS STOP" value="KACHIGUDA BUS STOP" />
                                    <Item label="MEHDIPATNAM BUS STOP" value="MEHDIPATNAM BUS STOP" />
                                    <Item label="JNTU (KUKATPALLY) BUS STOP" value="JNTU (KUKATPALLY) BUS STOP" />
                                    <Item label="MIYAPUR X ROADS" value="MIYAPUR X ROADS" />
                                </Picker>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{
                                        flex: 10,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                        width: width - 10,}}>
                                    </View>
                                    <TouchableOpacity   onPress={this._SwapPickerText.bind(this)}>
                                    <Icon type='MaterialIcons' name='swap-vertical-circle' size={35} color="#2eacde"/>
                                    {/*<TouchableOpacity onPress={this._SwapPickerText.bind(this)}>*/}
                                        {/*<Image source={require('../Images/change_position.png')} style={{height: 35, width: 35,flex:5}}*/}
                                        {/*/>*/}
                                    </TouchableOpacity>
                                    <View style={{
                                        flex: 1,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: 1,
                                        width: width - 10,}}>
                                    </View>
                                </View>
                                <Picker
                                    placeholder="Select One"
                                    mode="dropdown"
                                    style={{height:45,width:295,borderWidth:5, borderColor:'#2eacde'}}
                                    selectedValue={this.state.selected2}
                                    onValueChange={(itemValue) => this.setState({selected2: itemValue})}>

                                    <Item label="To Location" value="" />
                                    <Item label="MEHDIPATNAM BUS STOP" value="MEHDIPATNAM BUS STOP" />
                                    <Item label="MIYAPUR X ROADS" value="MIYAPUR X ROADS" />
                                    <Item label="JNTU (KUKATPALLY) BUS STOP" value="JNTU (KUKATPALLY) BUS STOP" />
                                    <Item label="JEDIMETLA BUS STOP" value="JEDIMETLA BUS STOP" />
                                    <Item label="VANASTALIPURAM" value="VANASTALIPURAM" />
                                    <Item label="KOTI BUS STOP" value="KOTI BUS STOP" />
                                    <Item label="HITECH CITY BUS STOP" value="HITECH CITY BUS STOP" />
                                    <Item label="KACHIGUDA BUS STOP" value="KACHIGUDA BUS STOP" />
                                </Picker>

                            </View>
                        </View>
                        <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1,
                            width: width - 10,}}>
                        </View>
                        {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}

                        {/*<View style={{flex:.5}}>*/}

                        {/*</View>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:.1}}>*/}
                        {/*<Image source={require('../Images/arrow.png')} style = {{ width: 20, height: 20,alignItems:'center',marginTop:10 }}/>*/}
                        {/*</View>*/}

                        {/*<View style={{flex:.5}}>*/}
                        {/*<Picker*/}
                        {/*selectedValue='Meh'*/}
                        {/*style={{height:35,width:50}}*/}
                        {/*// label='To'*/}
                        {/*onValueChange={() => {this.handleChange}}*/}
                        {/*>*/}
                        {/*<Item label="Vanastalipuram" value="Va" />*/}
                        {/*<Item label="Miyapur" value="Mi" />*/}
                        {/*<Item label="JublieeHills" value="Jub" />*/}
                        {/*<Item label="Mehdipatnam" value="Meh" />*/}
                        {/*<Item label="Raheja IT Park" value="Ra" />*/}
                        {/*<Item label="Gachibowli" value="GA" />*/}
                        {/*</Picker>*/}
                        {/*</View>*/}
                        {/*</View>*/}

                        {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}

                        {/*<View style={{flex:.5}}>*/}

                        {/*</View>*/}
                        {/*</View>*/}
                        {/*<View style={{flex:.1}}>*/}
                        {/*<Image source={require('../Images/arrow.png')} style = {{ width: 20, height: 20,alignItems:'center',marginTop:10 }}/>*/}
                        {/*</View>*/}

                        {/*<View style={{flex:.5}}>*/}

                        {/*</View>*/}
                        {/*</View>*/}

                        {/*</CardItem>*/}

                        {/*<View style={{flexDirection:"row",justifyContent:'space-evenly',marginTop:10}}>*/}
                        {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                        {/*<Text note style={{fontSize:12,textAlign:'center'}} >Tap icon to change date/time</Text>*/}
                        {/*<TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>*/}
                        {/*<Image source={require('../Images/event.png')} style={{height: 30, width: 30}}*/}
                        {/*/>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<DateTimePicker*/}
                        {/*isVisible={this.state.isDateTimePickerVisible}*/}
                        {/*mode={'datetime'}*/}
                        {/*onConfirm={this._handleDatePicked}*/}
                        {/*onCancel={this._hideDateTimePicker}*/}
                        {/*/>*/}

                        {/*</View>*/}
                        {/*<TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>*/}
                        {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}

                        {/*<Text note style={{fontSize:16,color:'#2eacde',textAlign:'center',fontWeight:'bold'}} > {*/}
                        {/*Moment(this.state.date).format('DD-MMM-YYYY')} </Text>*/}
                        {/*<Text note style={{fontSize:16,color:'#2eacde',textAlign:'center',fontWeight:'bold'}} > {*/}
                        {/*Moment(this.state.date).format('h:mm A')} </Text>*/}

                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={{flexDirection:"row",justifyContent:'flex-start',marginTop:10}}>

                            <TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>
                                <Image source={require('../Images/calendar_icon.png')} style={{height: 25, width: 25,marginLeft:18}}
                                />
                            </TouchableOpacity>
                            <Text note style={{fontSize:12,textAlign:'center'}} >  Journey Date</Text>
                        </View>
                        {/*<TouchableOpacity  style={{alignItems:'center'}}*/}
                        {/*onPress={()=>this.setState({showacimage:!this.state.showacimage})} >*/}
                        {/*{this.changeACLogo()}*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity  style={{alignItems:'center'}}*/}
                        {/*onPress={()=>this.setState({shownonacimage:!this.state.shownonacimage})}>*/}
                        {/*{this.changeNonACLogo()}*/}

                        {/*</TouchableOpacity>*/}
                        <View style={{flexDirection:"row",justifyContent:'flex-start'}}>
                            <TouchableOpacity onPress={this._showDateTimePicker} style={{alignItems:'center'}}>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    mode={'date'}
                                    minimumDate={Moment().toDate()}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />

                                {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}

                                {/*<Text note style={{fontSize:16,color:'#000',textAlign:'center'}} > {*/}
                                {/*Moment(this.state.date).format('DD MMM YYYY')} </Text>*/}
                                {/*/!*<Text note style={{fontSize:16,color:'#2eacde',textAlign:'center',fontWeight:'bold'}} > {*!/*/}
                                {/*/!*Moment(this.state.date).format('h:mm A')} </Text>*!/*/}
                                {/*<Text note style={{fontSize:16,color:'#000',textAlign:'right'}} > {*/}
                                {/*Moment(this.state.date).format('  ')} </Text>*/}
                                {/*</View>*/}
                            </TouchableOpacity>

                            {/*<TouchableOpacity onPress={() => Actions.searchScreen()} style={{alignItems:'flex-end'}}>*/}
                            {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                            {/*<Image source={require('../Images/magnifier.png')} style={{height: 35, width: 35}}*/}
                            {/*/>*/}
                            {/*</View>*/}
                            {/*</TouchableOpacity>*/}

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
                        {/*<View style={{*/}
                            {/*borderBottomColor: '#917cb7',*/}
                            {/*borderBottomWidth: 1,*/}
                            {/*marginTop:10,*/}
                            {/*width: width - 10,}}>*/}
                        {/*</View>*/}
                        {/*<TouchableOpacity onPress={() => Actions.searchScreen()} style={{alignItems:'flex-end'}}>*/}
                        {/*<View style={{flexDirection:"column",justifyContent:'space-evenly'}}>*/}
                        {/*<Image source={require('../Images/magnifier.png')} style={{height: 35, width: 35}}*/}
                        {/*/>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}

                        <Button style={{height:60,width:width-10,backgroundColor: '#2eacde',
                            marginTop:10,justifyContent:'space-evenly'}}
                                onPress={() => {
                                if(!this.state.selected1 || !this.state.selected2){
                                    Toast.show(" From or To Location cannot be empty! ",Toast.LONG);
                                }
                                else if(this.state.selected1 === this.state.selected2){
                                    Toast.show(" From and To Location cannot be same! ",Toast.LONG);
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
                        {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}


                        {/*<Text note style={{fontSize:14,textAlign:'center'}} > Time</Text>*/}
                        {/*<Text note style={{fontSize:14,textAlign:'center'}} >A/C</Text>*/}
                        {/*<Text note style={{fontSize:14,textAlign:'center'}} >Non A/C</Text>*/}
                        {/*<Text note style={{fontSize:14,textAlign:'center'}} >  Date/Time</Text>*/}
                        {/*<Text note style={{fontSize:16,textAlign:'center',color:'#0c71b7',fontWeight:'bold'}} >  Search</Text>*/}



                        {/*</View>*/}

                        {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}
                        {/*/!*<Image source={require('../Images/smartranlogowhite.png')} style={{height: 200, width: null, flex: 1}}/>*!/*/}
                        {/*<Text note style={{fontSize:16,color:'#2eacdeF',textAlign:'center',fontWeight:'bold'}} > Selected Date Time: {*/}
                        {/*Moment(this.state.date).format('DD-MM-YYYY h:mm a')} </Text>*/}


                        {/*/!*<Text style={{paddingLeft:12,fontSize:18}} >My details</Text>*!/*/}
                        {/*</View>*/}


                    </Card>

                    {/*<Text note style={{fontSize:18,color:'#FFFFFF',fontWeight:'bold'}} > SmarTran-Your travel made easier ...</Text>*/}
                    {/*<Card>*/}
                    {/*<Swiper style={styles.wrapper} height={200} showsButtons={true} >*/}
                    {/*<View style={styles.slide1}>*/}
                    {/*<Image resizeMode='stretch' style={styles.image} source={require('../Images/sliderimage.jpg')}*/}
                    {/*/>*/}
                    {/*<Text style={styles.text} numberOfLines={1}>Waiting at bus stop is a thing of the past</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.slide2}>*/}
                    {/*<Image resizeMode='stretch' style={styles.image} source={require('../Images/sliderimage1.jpg')}*/}
                    {/*/>*/}
                    {/*<Text style={styles.text} numberOfLines={1}>No more indefinite wait at bus stop</Text>*/}

                    {/*</View>*/}
                    {/*<View style={styles.slide3}>*/}
                    {/*<Image resizeMode='stretch' style={styles.image} source={require('../Images/imageslide2.jpg')}*/}
                    {/*/>*/}
                    {/*<Text style={styles.text} numberOfLines={1}>Happy commute is here !</Text>*/}
                    {/*</View>*/}
                    {/*</Swiper>*/}

                    {/*</Card>*/}

                    {/*<Text note style={{fontSize:18,color:'#FFFFFF',fontWeight:'bold'}} > Favourites</Text>*/}

                    {/*<TouchableOpacity onPress={() => Actions.searchScreen()}>*/}
                    {/*<Card  styles={{width: 100,height:300,borderWidth: 3,*/}
                    {/*borderColor: '#999999', alignItems: 'center',*/}
                    {/*borderRadius: 5,*/}
                    {/*overflow: 'hidden',*/}

                    {/*elevation: 1,*/}
                    {/*padding: 10}}>*/}

                    {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}
                    {/*/!*<Image source={require('../Images/smartranlogowhite.png')} style={{height: 200, width: null, flex: 1}}/>*!/*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >Jedimetla.....</Text>*/}
                    {/*<Image source={require('../Images/arrow.png')} style = {{ width: 25, height: 25,alignItems:'center' }}/>*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >Mehdipatna...</Text>*/}

                    {/*</View>*/}

                    {/*</Card>*/}

                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={() => Actions.searchScreen()}>*/}
                    {/*<Card  styles={{width: 100,height:300,borderWidth: 3,*/}
                    {/*borderColor: '#999999', alignItems: 'center',*/}
                    {/*borderRadius: 5,*/}
                    {/*overflow: 'hidden',*/}

                    {/*elevation: 1,*/}
                    {/*padding: 10}}>*/}

                    {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >Kothaguda...</Text>*/}
                    {/*<Image source={require('../Images/arrow.png')} style = {{ width: 25, height: 25,alignItems:'center' }}/>*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >Uppal Bus....</Text>*/}

                    {/*</View>*/}



                    {/*</Card>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity onPress={() => Actions.searchScreen()}>*/}
                    {/*<Card  styles={{width: 100,height:300,borderWidth: 3,*/}
                    {/*borderColor: '#999999', alignItems: 'center',*/}
                    {/*borderRadius: 5,*/}
                    {/*overflow: 'hidden',*/}

                    {/*elevation: 1,*/}
                    {/*padding: 10}}>*/}


                    {/*<View style={{flexDirection:"row",justifyContent:'space-evenly'}}>*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >Yousufguda...</Text>*/}
                    {/*<Image source={require('../Images/arrow.png')} style = {{ width: 25, height: 25,alignItems:'center' }}/>*/}
                    {/*<Text note style={{fontSize:14,textAlign:'center',fontWeight:'bold'}} >BHEL...........</Text>*/}
                    {/**/}
                    {/*</View>*/}

                    {/*</Card>*/}
                    {/*</TouchableOpacity>*/}

                </View>


                {/*<View style={{ flex: 1 }}>*/}
                {/*<Fab*/}
                {/*active={this.state.active}*/}
                {/*direction="up"*/}
                {/*containerStyle={{ }}*/}
                {/*style={{ backgroundColor: '#2CA8DB' }}*/}
                {/*position="bottomRight"*/}
                {/*onPress={() => this.setState({ active: !this.state.active })}>*/}
                {/*<Image  source={require('../Images/menu_symbol.png')} />*/}
                {/*<Button style={{ backgroundColor: '#2CA8DB' }}>*/}
                {/*<Image  source={require('../Images/user.png')} />*/}
                {/*</Button>*/}
                {/*<Button style={{ backgroundColor: '#2CA8DB' }}>*/}
                {/*<Image  source={require('../Images/alert.png')} />*/}
                {/*</Button>*/}
                {/*<Button disabled style={{ backgroundColor: '#2CA8DB' }}>*/}
                {/*<Image  source={require('../Images/search.png')} />*/}
                {/*</Button>*/}
                {/*</Fab>*/}
                {/*</View>*/}
                {/*</ScrollView>*/}



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
    // _renderContent = (Tab: string,) => {
    //     if(this.state.selectedTab==="Search"){
    //         return (
    //             <Home/>
    //         );
    //     }
    //     else if(this.state.selectedTab==="Favourite"){
    //         return (
    //             <Favourite/>
    //         );
    //
    //     }
    //     else if(this.state.selectedTab==="Recent"){
    //         return (
    //             <Home/>
    //         );
    //     }
    // }
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
import React, { Component } from 'react';
import { Image,StyleSheet,TouchableHighlight,TouchableOpacity,
    Dimensions,ScrollView,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { Actions } from 'react-native-router-flux'; // 4.0.0-beta.31
import SmartPicker from 'react-native-smart-picker'
import DateTimePicker from 'react-native-modal-datetime-picker';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import BottomNavigation, {
    ShiftingTab
} from 'react-native-material-bottom-navigation'
import { Dialog } from 'react-native-simple-dialogs';
import { Dropdown } from 'react-native-material-dropdown';
var params;
var routelistarr = [];
var dialogarr = [];
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icoons from 'react-native-vector-icons/SimpleLineIcons';

// import Icoons from 'react-native-vector-icons/SimpleLineIcons';
// import Iccons from 'react-native-vector-icons/FontAwesome';
// import Icconss from 'react-native-vector-icons/Foundation'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const MARGIN = 40;
// import { BottomNavigation } from 'react-native-material-ui';
// var Accordion = require('react-native-accordion');
const card      = {card: {width: 100,height:300,borderWidth: 3,
        borderRadius: 3,
        borderColor: '#FFFFFF',
        padding: 10}};
const cardItem = {cardItem: {fontSize: 40}};
import Accordion from 'react-native-collapsible/Accordion';
import Moment from "moment/moment";
const ac_icon_blue = require('../Images/ac_icon_blue.png');
const ac_icon_grey = require('../Images/ac_icon_grey.png');
const nonac_icon_blue = require('../Images/nonac_icon_blue.png');
const nonac_icon_grey = require('../Images/nonac_icon_grey.png');
var rupesstitile;
var  SECTIONS;
var RouteTimings;

export default class SearchScreen extends Component {


    constructor(props) {
        super(props);
        // this.state = {
        //     selected: "At",
        //
        // };
        // this.state ={
        //     showacimage:false
        // };
        // this.state ={
        //     shownonacimage:false
        // };
        // this.state ={
        //     showtextsource:true
        // };

        // this.state = {
        //     count: 0
        // };
        this.state ={
            activeTab: 'home',
            selectedvalue:'',
            isDateTimePickerVisible: false,
            uniqueValue:1,
            text: '',
            showacview: true,
            shownonacview: true,
            count: 1,
            date: this.props.tripdte,
            routetimeindex: 0,
            firstbusfare:0,
            secondbusfare:0,
            totalfare: 0,
            dialogindex: 0,
            bustype:'All Buses',
        };

        this.onChangeTextPress=this.onChangeTextPress.bind(this);
        // this._renderHeader = this._renderHeader.bind(this);
        // this._renderContent=this._renderContent.bind(this)
    }

    state = {}

    openDialog(show) {
        this.setState({ showDialog: show });

    // switch(sectionnumber) {
    //     case 0:
    //         this.setState({ routetimeindex: 0 });
    //         this.setState({ firstbusfare: RouteTimings[0].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[0].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[0].FirstBusFare + RouteTimings[0].SecondBusFare});
    //         this.setState({ showDialog: true });
    //         break;
    //     case 1:
    //         this.setState({ routetimeindex: 1 });
    //         this.setState({ firstbusfare: RouteTimings[1].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[1].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[1].FirstBusFare + RouteTimings[1].SecondBusFare});
    //         this.setState({ showDialog: true });
    //         break;
    //     case 2:
    //         this.setState({ routetimeindex: 2 });
    //         this.setState({ firstbusfare: RouteTimings[2].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[2].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[2].FirstBusFare + RouteTimings[2].SecondBusFare});
    //         this.setState({ showDialog: true });
    //         break;
    //     case 3:
    //         this.setState({ routetimeindex: 3 });
    //         this.setState({ firstbusfare: RouteTimings[3].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[3].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[3].FirstBusFare + RouteTimings[3].SecondBusFare});
    //         this.setState({ showDialog: true });
    //         break;
    //     case 4:
    //         this.setState({ routetimeindex: 4 });
    //         this.setState({ firstbusfare: RouteTimings[4].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[4].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[4].FirstBusFare + RouteTimings[4].SecondBusFare});
    //         this.setState({ showDialog: true });
    //         break;
    //     default:
    //         this.setState({ routetimeindex: 0 });
    //         this.setState({ firstbusfare: RouteTimings[0].FirstBusFare });
    //         this.setState({ secondbusfare: RouteTimings[0].SecondBusFare });
    //         this.setState({totalfare: RouteTimings[0].FirstBusFare + RouteTimings[0].SecondBusFare});
    //         this.setState({ showDialog: false });
    //         break;
    // }
    }

    forceRemount=() =>{
        this.setState(({uniqueValue})=>({
            uniqueValue:uniqueValue+1
        }));
    }

    // state = {
    //     activeTab: 'home'
    // };

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


    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />

    )


    _handleTabPress(pressedKey) {
        switch (pressedKey) {
            case 'home':
                Actions.homeScreen();
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
    renderTab = ({ tab, isActive }) => (
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    increment = () => {
        let currentcount = this.state.count;
        this.setState({
            count: currentcount + 1,
            totalfare: (this.state.firstbusfare + this.state.secondbusfare) * (currentcount + 1),
        });
    }

    decrement = () => {
        let currentcount = this.state.count;
        this.setState({
            count: (currentcount > 1) ? (currentcount - 1) : 1,
            totalfare: (this.state.firstbusfare + this.state.secondbusfare) * ((currentcount > 1) ? (currentcount - 1) : 1),
        });
    }


    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.setState({
            date :  date
        });
        // params.tripdte = this.state.date;
        this._hideDateTimePicker();
    };

    onChangeTextPress(value){

        // this.setState({selectedvalue: value});
        this.setState({bustype: value});
        // switch(value) {
        //     case 'All Buses':
        //         this.setState({bustype: value});
        //         break;
        //     case 'A/C Buses':
        //         this.setState({bustype: value});
        //         break;
        //     case 'Non A/C Buses':
        //         this.setState({bustype: value});
        //         break;
        //     default:
        //         this.setState({bustype: value});
        //         break;
        // }
    }
    render() {
        params = {};
        params = {
            fromLoc:this.props.fromLoc,
            toLoc:this.props.toLoc,
            tripdte:this.state.date,
            totalfare:this.state.totalfare,
            count:this.state.count,
        };
        rupesstitile=[

            {
                "price":"72/-"

            },
            {
                "price":"68/-"

            },
            {
                "price":"70/-"

            },
            {
                "price":"64/-"


            },
            {
                "price":"72/-"
            },

        ];

        RouteTimings = [
            {
                acroute: true,
                FirstBusNumber: '625M',
                FirstArrivalTime:'5:51 PM',
                FirstDestinationTime:'7:00 PM',
                FirstOriginName: (this.props.fromLoc),
                FirstDestinationName:(this.props.toLoc),
                FirstBusFare:72,
                SecondBusFare: 0,

            },
            {
                acroute: false,
                FirstBusNumber: '635A',
                FirstArrivalTime:'5:45 PM',
                FirstDestinationTime:'6:46 PM',
                FirstOriginName: (this.props.fromLoc),
                FirstDestinationName:'LAKDIKAPUL',
                FirstBusFare:33,
                SecondBusNumber: '639A',
                SecondArrivalTime:'6:52 PM',
                SecondDestinationTime:'7:00 PM',
                SecondDestinationName:(this.props.toLoc),
                SecondBusFare:35,

            },
            {
                acroute: false,
                FirstBusNumber: '645T',
                FirstArrivalTime:'5:45 PM',
                FirstDestinationTime:'6:46 PM',
                FirstOriginName: (this.props.fromLoc),
                FirstDestinationName:'LAKDIKAPUL',
                FirstBusFare:34,
                SecondBusNumber: '648K',
                SecondArrivalTime:'6:52 PM',
                SecondDestinationTime:'7:00 PM',
                SecondDestinationName:(this.props.toLoc),
                SecondBusFare:36,
            },
            {
                acroute: true,
                FirstBusNumber: '650N',
                FirstArrivalTime:'5:55 PM',
                FirstDestinationTime:'6:56 PM',
                FirstOriginName: (this.props.fromLoc),
                FirstDestinationName:'LAKDIKAPUL',
                FirstBusFare:30,
                SecondBusNumber: '652H',
                SecondArrivalTime:'7:01 PM',
                SecondDestinationTime:'7:04 PM',
                SecondDestinationName:(this.props.toLoc),
                SecondBusFare:34,
            },
            {
                acroute: true,
                FirstBusNumber: '625M',
                FirstArrivalTime:'5:56 PM',
                FirstDestinationTime:'7:03 PM',
                FirstOriginName: (this.props.fromLoc),
                FirstDestinationName:(this.props.toLoc),
                FirstBusFare:72,
                SecondBusFare: 0,
            },
        ];


        let data = [{
            value: 'All Buses',
        }, {
            value: 'A/C Buses',
        }, {
            value: 'Non A/C Buses',
        }];

        dialogarr = RouteTimings.map((currentroutetiming, index) => {

              if(this.state.dialogindex === index){

            return (
        <Dialog
            visible={this.state.showDialog}
            title="Bus Route Details"
            onTouchOutside={() => {this.openDialog(false)}}
            contentStyle={{ justifyContent: 'center', alignItems: 'center' ,width:'100%' }}
            animationType="fade">
            <View style={{flexDirection:"column",justifyContent:'space-evenly',marginLeft:10,marginRight:10}}>

                {/*first view - firstarrivaltime, start image, firstoriginname*/}
                <View style={{flexDirection: "row"}}>
                    <Text style={{flex: 2}}>{RouteTimings[this.state.dialogindex].FirstArrivalTime}</Text>
                    <Image source={require('../Images/pin_icon.png')} style={{flex: 1, width: 10, height: 50}}/>
                    <Text style={{flex: 3}}>{
                        (RouteTimings[this.state.dialogindex].FirstOriginName.length > 11) ?
                            (RouteTimings[this.state.dialogindex].FirstOriginName.substring(0,10)) + '...' :
                            (RouteTimings[this.state.dialogindex].FirstOriginName)
                    }</Text>
                </View>

                {/*second view - ., middle image, firstbusnumber*/}
                <View style={{flexDirection: "row"}}>
                    <Text  style={{flex: 2, color:'#FFFFFF'}}>.</Text>
                    <Image source={require('../Images/line_icon.png')} style={{flex:1,width: 8, height: 50}}/>
                    <Text  style={{flex: 3}}>{RouteTimings[this.state.dialogindex].FirstBusNumber}</Text>
                </View>

                {/*third view - firstdestinationtime, stop image, firstdestinationname*/}
                <View style={{flexDirection: "row"}}>
                    <Text  style={{flex: 2}}>{RouteTimings[this.state.dialogindex].FirstDestinationTime}</Text>
                    <Image source={require('../Images/pin.png')} style={{flex:1,width: 10, height: 50}}/>
                    <Text  style={{flex: 3}}>{
                        (RouteTimings[this.state.dialogindex].FirstDestinationName.length > 11) ?
                            (RouteTimings[this.state.dialogindex].FirstDestinationName.substring(0,10)) + '...' :
                            (RouteTimings[this.state.dialogindex].FirstDestinationName)
                    }</Text>
                </View>

                {/*when secondbusfare > 0, fourth view - secondarrivaltime, start image, . with color white*/}
                {(RouteTimings[this.state.dialogindex].SecondBusFare > 0) &&
                <View style={{flexDirection: "row"}}>
                    <Text style={{flex: 2}}>{RouteTimings[this.state.dialogindex].SecondArrivalTime}</Text>
                    <Image source={require('../Images/pin_icon.png')} style={{flex: 1, width: 10, height: 50}}/>
                    <Text  style={{flex: 3, color:'#FFFFFF'}}>..............</Text>
                </View>
                }
                {/*when secondbusfare > 0, fifth view - ., middle image, secondbusnumber*/}
                {(RouteTimings[this.state.dialogindex].SecondBusFare > 0) &&
                <View style={{flexDirection: "row"}}>
                    <Text  style={{flex: 2, color:'#FFFFFF'}}>.</Text>
                    <Image source={require('../Images/line_icon.png')} style={{flex: 1, width: 8, height: 50}}/>
                    <Text style={{flex: 3}}>{RouteTimings[this.state.dialogindex].SecondBusNumber}</Text>
                </View>
                }
                {/*when secondbusfare > 0, sixth view - seconddestinationtime, stop image, seconddestinationname*/}
                {(RouteTimings[this.state.dialogindex].SecondBusFare > 0) &&
                <View style={{flexDirection: "row"}}>
                    <Text style={{flex: 2}}>{RouteTimings[this.state.dialogindex].SecondDestinationTime}</Text>
                    <Image source={require('../Images/pin.png')} style={{flex: 1, width: 10, height: 50}}/>
                    <Text style={{flex: 3}}>{
                        (RouteTimings[this.state.dialogindex].SecondDestinationName.length > 11) ?
                            (RouteTimings[this.state.dialogindex].SecondDestinationName.substring(0,10)) + '...' :
                            (RouteTimings[this.state.dialogindex].SecondDestinationName)
                    }</Text>
                </View>
                }
                {/*seventh view - increment/decrement, BUY, CLOSE*/}
                <View style={{flexDirection:'row',marginTop:10}}>
                    <Text  style={{flex: 1.4, color:'#FFFFFF'}}>.</Text>
                    <View style={{flex: 2,flexDirection:'row',justifyContent:'space-around',borderColor:'#2eacde',borderWidth:1,borderRadius:1
                        ,marginLeft:5,marginRight:2,marginBottom:15}}>
                        <Button transparent style={{height: 18,width:width-880,backgroundColor: '#FFFFFF',
                        }}
                                onPress={this.decrement}>
                            <Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde'
                                ,textAlign:'center'}}>-</Text>
                        </Button>
                        <Text note style={{ fontSize: 16, textAlign: 'center'}}>{this.state.count}</Text>
                        {/*{this.state.count}*/}
                        <Button transparent style={{height: 18,width:width-880,backgroundColor: '#FFFFFF',
                        }}
                                onPress={this.increment}>
                            <Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde'
                                ,textAlign:'center'}}>+</Text>
                        </Button>
                    </View>
                    <Text  style={{flex: 2, color:'#FFFFFF'}}>.</Text>
                </View>
                <Button style={{height:50,width:width-80,backgroundColor: '#2eacde',
                    marginTop:5,marginBottom:15,justifyContent:'space-evenly'}}
                        onPress={() => {(this.openDialog(false)),
                                Actions.paymentScreen(params)}} >
                    {/*onPress={() => Actions.paymentScreen(params)}>*/}
                    <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                        <Image source={require('../Images/rupees_symbol.png')} style = {{ width: 25,
                            height: 25,alignItems:'center'}}/>
                        <Text style={{fontWeight: "bold",fontSize:16,color:'#FFFFFF'
                            ,textAlign:'center',paddingLeft:10}}>BUY</Text>
                        <Text style={{fontWeight: "bold",fontSize:16,color:'#FFFFFF'
                            ,textAlign:'right',paddingLeft:70}}>&#8377;{this.state.totalfare}/-</Text>
                    </View>
                </Button>
                <Button transparent style={{height: 25,width:width-880,backgroundColor: '#FFFFFF',marginBottom:10
                }}
                        onPress={() => {(this.openDialog(false))}} >
                    <Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde',flex:2
                        ,textAlign:'center'}}>Close</Text>
                </Button>
            </View>

        </Dialog>
            )};
    });

        routelistarr = RouteTimings.map((currentroutetiming, index) => {

            if((this.state.bustype==='All Buses') || ((this.state.bustype==='A/C Buses') &&(currentroutetiming.acroute))
                ||((this.state.bustype==='Non A/C Buses') && (!currentroutetiming.acroute))) {
                return (
                    <View>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                dialogindex: index,
                                totalfare: (currentroutetiming.FirstBusFare) + (currentroutetiming.SecondBusFare),
                                firstbusfare: currentroutetiming.FirstBusFare,
                                secondbusfare: currentroutetiming.SecondBusFare
                            }),
                                (this.openDialog(true))
                        }}>
                            <View style={{flexDirection: "row", justifyContent: 'flex-start', marginTop: 5}}>
                                <View style={{flexDirection: "column", justifyContent: 'space-evenly'}}>
                                    <Image source={require('../Images/live_icon.png')}
                                           style={{width: 20, height: 20, paddingLeft: 5}}/>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#000',
                                        textAlign: 'left',
                                        marginLeft: 2,
                                    }}>{currentroutetiming.FirstArrivalTime}</Text>
                                </View>

                                <View style={{
                                    flexDirection: "column",
                                    justifyContent: 'space-evenly',
                                    marginLeft: 40,
                                    marginTop: 8
                                }}>

                                    {(currentroutetiming.acroute) &&
                                    <Icons type='FontAwesome5' name='bus-alt' size={12} color="#2eacde"/>
                                    }
                                    {(!currentroutetiming.acroute) &&
                                    <Icons type='FontAwesome5' name='bus-alt' size={12} color="grey"/>
                                    }
                                    <Text note style={{
                                        fontSize: 12, color: '#000', textAlign: 'center', marginTop: 2, marginBottom: 2,
                                        flex: 5
                                    }}>{currentroutetiming.FirstBusNumber}</Text>
                                </View>

                                {(currentroutetiming.SecondBusFare > 0) &&
                                <View style={{
                                    flexDirection: "column",
                                    justifyContent: 'space-evenly',
                                    marginLeft: 18,
                                    marginTop: 8
                                }}>
                                    {(currentroutetiming.acroute) &&
                                    <Icons type='FontAwesome5' name='bus-alt' size={12} color="#2eacde"/>
                                    }
                                    {(!currentroutetiming.acroute) &&
                                    <Icons type='FontAwesome5' name='bus-alt' size={12} color="grey"/>
                                    }

                                    <Text note style={{
                                        color: '#000',
                                        fontSize: 12, textAlign: 'center', marginTop: 2, marginBottom: 2
                                    }}>{currentroutetiming.SecondBusNumber}</Text>
                                </View>
                                }

                                {(currentroutetiming.SecondBusFare === 0) &&
                                <View style={{flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: 45}}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#000',
                                        textAlign: 'right',
                                        marginLeft: 120,
                                        marginRight: 2
                                    }}>&#8377;{(currentroutetiming.FirstBusFare) + (currentroutetiming.SecondBusFare)}/-</Text>
                                </View>
                                }

                                {(currentroutetiming.SecondBusFare > 0) &&
                                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#000',
                                        textAlign: 'right',
                                        marginLeft: 115,
                                        marginRight: 2
                                    }}>&#8377;{(currentroutetiming.FirstBusFare) + (currentroutetiming.SecondBusFare)}/-</Text>
                                </View>
                                }

                            </View>
                            {/*}*/}
                        </TouchableOpacity>

                    </View>
                );
            }
            });

        return (

            <View style={styles.container}>
                {/*<ScrollView >*/}
                <View style={[styles.headerview]}>
                    {/*<Container style={[styles.headerview]}>*/}
                    {/*<Content>*/}
                    <View style={{flexDirection:"row",backgroundColor:'#0c71b7',paddingRight:10,
                        paddingLeft:10,}}>
                        <TouchableOpacity onPress={() => Actions.homeScreen(params)} >
                            <Icon type='MaterialIcons' name='arrow-back' size={30} color="#FFFFFF"/>
                        </TouchableOpacity>
                        <Text note style={{marginTop:5,fontSize:16,textAlign:'center',color:'#FFFFFF', flex:5}} >Journey Options</Text>
                        {/*<Text note style={{marginTop:5,fontSize:12,textAlign:'right',color:'#FFFFFF', flex:1}} > </Text>*/}
                        {/*<Button rounded style={{height: 25,backgroundColor: '#2eacde',marginBottom:10*/}
                        {/*}}*/}
                                {/*onPress={() => this.setState({shownonacview: false, showacview: true})} >*/}
                            {/*<Iccons type='FontAwesome' color="#FFFFFF" name={'snowflake-o'} size={20}  />*/}
                            {/*/!*<Text style={{fontWeight: "bold",fontSize:16,color:'#FFFFFF',flex:2*!/*/}
                                {/*/!*,textAlign:'center'}}>AC</Text>*!/*/}
                        {/*</Button>*/}
                        {/*<Button rounded style={{height: 25,backgroundColor: '#2eacde',marginBottom:10*/}
                        {/*}}*/}
                                {/*onPress={() => this.setState({shownonacview: true, showacview: false})} >*/}
                            {/*<Icoons type='SimpleLineIcons' color="#FFFFFF" name={'ban'} size={20} />*/}
                            {/*/!*<Text style={{fontWeight: "bold",fontSize:16,color:'#FFFFFF',flex:2*!/*/}
                                {/*/!*,textAlign:'center'}}>Non/AC</Text>*!/*/}
                        {/*</Button>*/}
                        {/*<Button rounded style={{height: 25,backgroundColor: '#2eacde',marginBottom:10*/}
                        {/*}}*/}
                                {/*onPress={() => this.setState({shownonacview: true, showacview: true})} >*/}
                            {/*<Icon type='MaterialIcons' color="#FFFFFF" name={'done-all'} size={20}/>*/}
                            {/*/!*<Text style={{fontWeight: "bold",fontSize:16,color:'#FFFFFF',flex:2*!/*/}
                                {/*/!*,textAlign:'center'}}>All</Text>*!/*/}
                        {/*</Button>*/}
                        {/*,
                                Actions.searchScreen(params)*/}
                        <TouchableOpacity onPress={() => Actions.searchScreen(params)}>
                            <Icoons type='SimpleLineIcons' name='refresh' size={24} color="#FFFFFF"/>
                        </TouchableOpacity>

                    </View>

                    <View style={{flexDirection:"row",backgroundColor:'#0c71b7',paddingRight:5,
                        paddingLeft:5}}>
                        <TouchableOpacity  onPress={this._showDateTimePicker}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:'flex-start',alignItems:'flex-start'}}>
                            <Image source={require('../Images/calendar_icon.png')} style={{height: 25, width: 25,marginTop:10}}
                            />
                        <Text note style={{fontSize:16,textAlign:'left',marginRight:10,color:'#FFFFFF',marginTop:10}} > {
                            Moment(this.state.date).format('DD MMM').toUpperCase()} </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1,marginTop:10,justifyContent:'flex-end',alignItems:'flex-end'}}>
                            {/*<View style={{height: 64}} />*/}
                            <Dropdown
                                value={'All Buses'}
                                baseColor={'#FFFFFF'}
                                textColor={'#FFFFFF'}
                                selectedItemColor={'#2eacde'}
                                itemColor={'#000'}
                                fontSize={13}
                                itemPadding={8}
                                dropdownPosition={0}
                                // pickerStyle={{paddingLeft:200}}
                                containerStyle={{borderWidth:1, borderColor:'#FFFFFF', width:130,height:30,borderRadius:20,paddingTop:2,paddingLeft:width*0.04}}
                                rippleCentered={true}
                                overlayStyle={{position:'absolute',marginLeft:220,marginTop:87}}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                dropdownOffset={top= 0}
                                data={data}
                                // valueExtractor={({value})=> value}
                                onChangeText={(value)=>{this.onChangeTextPress(value)}}
                            />
                        </View>

                        {/*onPress={() => Actions.homeScreen(params)}*/}
                        {/*<TouchableOpacity style={{marginTop:10}} onPress={() => this.setState({dummy: 1})}>*/}
                            {/*<Icoons type='SimpleLineIcons' name='refresh' size={24} color="#FFFFFF"/>*/}
                        {/*</TouchableOpacity>*/}
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

                    <View style={{flexDirection:"row",justifyContent:'flex-start',backgroundColor:'#FFFFFF', marginRight:2,
                        marginLeft:2,borderRadius:2, marginBottom:10,marginTop:5}}>
                            <View style={{flexDirection:"column",justifyContent:'flex-start',marginBottom:5}}>
                                {/*<Image source={require('../Images/smartranlogo.png')} style={{height: 200, width: null, flex: 1}}/>*/}
                                <Text style={{justifyContent:'flex-start',fontSize:15,color:'#000',marginTop:5,marginLeft: 5}} >From
                                </Text>

                                <Text style={{justifyContent:'flex-start',fontSize:15,color:'#000',marginTop:5,marginLeft: 5}} >To
                                </Text>
                                </View>

                        <View style={{flexDirection:"row",justifyContent:'flex-start',marginBottom:5}}>
                            <View styl={{flexDirection:"column",justifyContent:'flex-start'}}>
                                <Text style={{justifyContent:'flex-start',fontSize:15,color:'#000',marginTop:5}} > : {this.props.fromLoc}
                                </Text>

                                <Text style={{justifyContent:'flex-start',fontSize:15,color:'#000',marginTop:5}} > : {this.props.toLoc}
                                </Text>
                            </View>
                       </View>

                    </View>
                        <Card>
                            {routelistarr}
                            {dialogarr}
                        </Card>


                    {/*<View  style={{flexDirection:'row',justifyContent:'center'}} >*/}
                        {/*<Text note style={{fontSize:14,textAlign:'center',color:'#FFFFFF'}} >Number of passengers</Text>*/}
                        {/*<View style={{flexDirection:'row',justifyContent:'flex-end',borderColor:'#2eacde',borderWidth:1,borderRadius:1*/}
                            {/*,marginLeft:75,marginRight:2,marginBottom:5,backgroundColor:'#FFFFFF'}}>*/}

                            {/*<Button transparent style={{height: 18,width:width-880,backgroundColor: '#FFFFFF',*/}
                            {/*}}*/}
                                    {/*onPress={this.decrement}>*/}
                                {/*<Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde'*/}
                                    {/*,textAlign:'center'}}>-</Text>*/}
                            {/*</Button>*/}
                            {/*<Text note style={{ fontSize: 16, textAlign: 'center'}}>{this.state.count}</Text>*/}
                            {/*/!*{this.state.count}*!/*/}
                            {/*<Button transparent style={{height: 18,width:width-880,backgroundColor: '#FFFFFF',*/}
                            {/*}}*/}
                                    {/*onPress={this.increment}>*/}
                                {/*<Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde'*/}
                                    {/*,textAlign:'center'}}>+</Text>*/}
                            {/*</Button>*/}
                        {/*</View>*/}
                        {/*</View>*/}

                        {/*<ScrollView>*/}
                        {/*<Accordion*/}
                            {/*sections={SECTIONS}*/}
                            {/*renderHeader={this._renderHeader}*/}
                            {/*renderContent={this._renderContent}*/}
                        {/*>*/}

                        {/*</Accordion>*/}
                    {/*</ScrollView>*/}

                </View>

                <View style={[styles.footer]}>
                    <BottomNavigation
                        tabs={this.tabs}
                        activeTab={this.state.activeTab}
                        onTabPress={newTab => {this.setState({ activeTab: newTab.key }),this._handleTabPress(newTab.key)}}
                        renderTab={this.renderTab}
                        // useLayoutAnimation
                    />
                    {/*<BottomNavigation active={'home'} hidden={false} >*/}
                    {/*<BottomNavigation.Action*/}
                    {/*key="home"*/}
                    {/*// icon={<Image source={require('../Images/home_icon.png')} color="#2eacde" name="Search" style={{ width: 20, height: 20 }} />}*/}
                    {/*label="Home"*/}
                    {/*icon = {<Icoons type='SimpleLineIcons' name='home' size={24} color="#2eacde"/>}*/}
                    {/*// icon = {{ type:'MaterialIcons',name:'home'}}*/}
                    {/*// iconColor:"#2CA8DB"*/}
                    {/*// onLoad={() => this.setState({ active: 'search' })}*/}
                    {/*onPress={() => this.setState({ active: 'home' })}*/}
                    {/*// onPress={()=>this.setState({showasearchimage:!this.state.showasearchimage})}*/}
                    {/*// {this.changebottomLogo()}*/}
                    {/*/>*/}
                    {/*<BottomNavigation.Action*/}
                    {/*key="track"*/}
                    {/*// icon={<Image source={require('../Images/route.png')}color="#669999" name="trips" style={{ width: 20, height: 20 }} />}*/}
                    {/*icon = {<Icons type='FontAwesome5' name='route' size={24} color="#2eacde"/>}*/}
                    {/*label="Track"*/}
                    {/*onPress={() => this.setState({ active: 'track' },Actions.tripScreen())}*/}
                    {/*/>*/}
                    {/*<BottomNavigation.Action*/}
                    {/*key="history"*/}
                    {/*// icon={<Image source={require('../Images/ticket.png')} color="#669999" name="History" style={{ width: 20, height: 20 }} />}*/}
                    {/*icon = {<Icconss type='Foundation' name='ticket' size={24} color="#2eacde"/>}*/}
                    {/*label="History"*/}
                    {/*onPress={() => this.setState({ active: 'history' },Actions.ticketScreen())}*/}
                    {/*/>*/}
                    {/*<BottomNavigation.Action*/}
                    {/*key="more"*/}
                    {/*// icon={<Image source={require('../Images/menuicon.png')} color="#669999" name="More" style={{ width: 20, height: 20 }} />}*/}
                    {/*icon = {<Icoons type='SimpleLineIcons' name='menu' size={24} color="#2eacde"/>}*/}
                    {/*label="More"*/}
                    {/*onPress={() => this.setState({ active: 'more' })}*/}
                    {/*// onPress={() => {this._drawer.open()}}*/}
                    {/*/>*/}
                    {/*</BottomNavigation>*/}
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
        backgroundColor:'#4d6bcb',
    },
    headerview: {
        // height: 250,
        //borderRadius:25,
        // borderWidth:5,
        // borderColor:'#2EACDE',
        position: 'absolute',
        paddingRight:5,
        paddingLeft:5,
        paddingTop:15,
        backgroundColor:'#4d6bcb',
        left: 0,
        right: 0,
        top:0,
        bottom:0,

    },
    content1: {
        backgroundColor:'#4d6bcb',
        marginTop: 140,

    },
    footer: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: '#8BC34A'
    },
    box: {

        backgroundColor: '#4d6bcb',
        color:'#4d6bcb',
        // marginTop: 10
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
        backgroundColor: '#FFFFFF',
        // padding: 0,

        // borderTopEndRadius:5,
        // borderWidth:1,
        flex: 1,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        width: width - 20,
        borderColor:'#4d6bcb',
        // borderBottomColor:'#FFFFFF',
        marginBottom:0,
        marginRight:5,
        marginLeft:5,
    },
    headerText: {
        // textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color:'#000',
        textAlign:'left'
    },
    headerTexttitle:{
        // textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color:'#000',
        textAlign:'center',
        justifyContent:'flex-start'
    },
    content: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginRight:5,
        marginLeft:5,
        textAlign:'right'
    },
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
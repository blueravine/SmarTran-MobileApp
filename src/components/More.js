import React, { Component } from 'react';
import { Image,StyleSheet,TouchableHighlight,TouchableOpacity,ImageBackground,
    Dimensions,ScrollView,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { Actions } from 'react-native-router-flux'; // 4.0.0-beta.31
import SmartPicker from 'react-native-smart-picker'
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import BottomNavigation, {
    ShiftingTab
} from 'react-native-material-bottom-navigation'

var params;
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icoons from 'react-native-vector-icons/SimpleLineIcons';
import Iccons from 'react-native-vector-icons/FontAwesome';
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

export default class More extends Component {


    constructor() {
        super();
        this.state = {
            selected: "At",

        };

        this.state ={
            showacview: true,
            shownonacview: true,
        };

        this.state= {
            activeTab: 'more',
        };

        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent=this._renderContent.bind(this)
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
                Actions.ticketScreen();
                break;
            case 'more':
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

    _renderHeader(section) {
        return (
            <View style={styles.headermoretitle}>

                {(section.title === 'Profile') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start', marginTop:5,marginBottom:10}}>
                    <View style={{marginLeft:10}}>
                    <Iccons type='FontAwesome' name={'user-circle'} size={20} color={'#2eacde'}/>
                    </View>
                    <Text style={{marginLeft:10}}>{section.title}</Text>
                </View>
                }
                {(section.title === 'Settings (App Version 0.01)') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start',marginTop:5,marginBottom:10}}>
                    <View style={{marginLeft:10}}>
                    <Icoons type='SimpleLineIcons' name={'settings'} size={20} color={'#2eacde'} />
                    </View>
                    <Text style={{marginLeft:10}}>{section.title}</Text>
                </View>
                }

                {(section.title === 'Help and Feedback') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start',marginTop:5,marginBottom:10}}>
                    <View style={{marginLeft:10}}>
                    <Icon type='MaterialIcons' name={'help-outline'} size={20} color={'#2eacde'} />
                    </View>
                    <Text style={{marginLeft:10}}>{section.title}</Text>
                </View>
                }

            </View>
        );
    }

    _renderContent(section) {
        return (
            <View style={styles.contentmore}>

                {(section.title === 'Profile') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start', marginTop:5}}>
                    <Text>{section.content}</Text>

                </View>
                }
                {(section.title === 'Settings (App Version 0.01)') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start'}}>
                    <Text>{section.content}</Text>
                </View>
                }

                {(section.title === 'Help and Feedback') &&
                <View style={{flexDirection: "row", justifyContent: 'flex-start'}}>
                    <Text>{section.content}</Text>
                </View>
                }

            </View>
        );
    }

    render() {
        // params = {};
        // params = {
        //     fromLoc:this.props.fromLoc,
        //     toLoc:this.props.toLoc,
        //     tripdte:this.props.tripdte,
        // };
        const SECTIONS = [
            {
                title:'Profile',
                content:'Users Profile',
            },
            {
                title:'Settings (App Version 0.01)',
                content:'This the updated version of the app 0.01',

            },
            {
                title:'Help and Feedback',
                content:'Help and Feedback',
            },
        ];



        return (

            <View style={styles.container}>
                {/*<ScrollView >*/}
                <View style={[styles.headerview]}>
                    {/*<Container style={[styles.headerview]}>*/}
                    {/*<Content>*/}
                    <View style={{flexDirection:"row",backgroundColor:'#0c71b7',paddingRight:10,
                        paddingLeft:10,}}>
                        <TouchableOpacity onPress={() => Actions.homeScreen()} >
                            <Icon type='MaterialIcons' name='arrow-back' size={30} color="#FFFFFF"/>
                        </TouchableOpacity>
                        <Text note style={{marginTop:5,fontSize:16,textAlign:'center',color:'#FFFFFF', flex:5}} >Profile Details</Text>
                        <Text note style={{marginTop:5,fontSize:12,textAlign:'right',color:'#FFFFFF', flex:1}} > </Text>
                    </View>
                    <ScrollView>
                        <Card >
                            <ImageBackground source={require('../Images/profilebackground.png')}
                                   style={styles.headercardbackground}>
                                <View style={styles.headermore}>
                            <View style={styles.profilepicWrap}>
                                <Image source={require('../Images/student.png')}
                                       style={styles.profilepic}/>
                            </View>

                            <Text note style={styles.myname} >John Doe</Text>
                                </View>
                            </ImageBackground>
                            {/*<Text note style={{marginTop:5,fontSize:12,textAlign:'right',color:'#FFFFFF', flex:1}} > </Text>*/}
                        </Card>
                        {/*<ScrollView>*/}
                        <Accordion
                            sections={SECTIONS}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        >

                        </Accordion>
                    </ScrollView>

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
        backgroundColor:'#0c71b7',
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
        backgroundColor:'#0c71b7',
        left: 0,
        right: 0,
        top:0,
        bottom:0,

    },
    footer: {
        height: 50,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: '#8BC34A'
    },
    headermoretitle: {
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
        borderColor:'#0c71b7',
        // borderBottomColor:'#FFFFFF',
        marginBottom:0,
        marginRight:5,
        marginLeft:5,
    },
    contentmore: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginRight:5,
        marginLeft:5,
        textAlign:'right'
    },

    headercardbackground:{
        flex:8,
        width:null,
        alignSelf:'stretch',

    },
    headermore:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        backgroundColor:'rgba(0,0,0,0.5)',

    },
    profilepicWrap:{
        width:180,
        height:180,
        borderRadius:100,
        borderColor:'rgba(0,0,0,0.4)',
        borderWidth:16,

    },
    profilepic:{
        flex:1,
        width:null,
        alignSelf:'stretch',
        borderRadius:100,
        borderColor:'#FFFFFF',
        borderWidth:4,

    },
    myname:{
        marginTop:20,
        fontSize:16,
        color:'#FFFFFF',
        fontWeight:'bold',

    },
});
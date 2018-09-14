import React, { Component } from 'react';
import { Image,StyleSheet,TouchableOpacity,AsyncStorage,
    Dimensions,ScrollView,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem,Radio, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import Toast from 'react-native-simple-toast';
import { Actions } from 'react-native-router-flux'; // 4.0.0-beta.31
import Icon from 'react-native-vector-icons/MaterialIcons';
import SmartPicker from 'react-native-smart-picker'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const MARGIN = 40;
import { BottomNavigation } from 'react-native-material-ui';
import RadioGroup from 'react-native-radio-buttons-group';
import { Dialog } from 'react-native-simple-dialogs';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
const card      = {card: {width: 100,height:300,borderWidth: 3,
        borderRadius: 3,
        borderColor: '#FFFFFF',
        padding: 10}};
const cardItem = {cardItem: {fontSize: 40}};
// LocationData = [
//             this.props.fromLoc=FromLoc,
//             this.props.toLoc=ToLoc,
//             this.props.tripdte=Tripdte,
//         ];

import Accordion from 'react-native-collapsible/Accordion';
import Moment from "moment/moment";



const SECTIONS = [
    {
        title: 'Credit Card',
        content:   'Card Number',
        content1:  'MM',
        content2:  'YY',
        content3:  'CVV',
        content4:  'Account Holder Name  '
    },
    {
        title: 'Debit Card',
        content:   'Card Number',
        content1:  'MM',
        content2:  'YY',
        content3:  'CVV',
        content4:  'Account Holder Name  '
    },
    {
        title: 'Wallets',
        content:   '  Paytm\n\n',
        content1:  '  Mobikwik\n\n',
        content2:  '  Freecharge\n'
    },
];
var radio_props;
var params;
var temptickets;
var payticket;
export default class PaymentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "At",

        };
        this.state={
            value:"",
            };

    }

    state = {}

    openDialog(show) {
        this.setState({ showDialog: show })
    }
    _onPressHandle = () => {
        this.setState({value: !this.state.value})
    }

    _renderHeader(section) {
        // radio_props = [
        //     {label: section.title, value: 0 }
        // ];
        return (
            <View style={styles.header}>
                <View style={{flexDirection:"row"}}>
                    {/*<Image source={require('../Images/circleicon.png')} style={{height: 25,marginLeft:15,width: 25,marginTop:20,justifyContent:'flex-start'}}/>*/}


                           <TouchableOpacity>
                    <Text style={styles.headerText}>{section.title}</Text>
                           </TouchableOpacity>
                </View>
                {/*<View style={{flexDirection:"column"}}>*/}
                    {/*<Text style={styles.headerText}>{section.title}</Text>*/}
                {/*</View>*/}
            </View>
        );
    }
    _renderContent(section) {
        return (
            <View style={styles.content}>

                    {(section.title === 'Credit Card') &&
                    <View style={{flexDirection: "column"}}>
                        <Text>Please enter card information below:</Text>
                        <View style={{flexDirection: "row", width:200}}>
                            <TextField label={section.content}
                            containerStyle={{width:150}}/>
                            <TextField label={section.content1}
                                       containerStyle={{width:30,marginLeft:20}}/>
                            <TextField label={section.content2}
                                       containerStyle={{width:30,marginLeft:20}}/>
                            <TextField label={section.content3}
                                       containerStyle={{width:30,marginLeft:20}}/>
                        </View>
                        <TextField label={section.content4}/>
                    </View>
                    }
                    {(section.title === 'Debit Card') &&
                    <View style={{flexDirection: "column"}}>
                        <Text>Please enter card information below:</Text>
                        <View style={{flexDirection: "row", width:200}}>
                            <TextField label={section.content}
                                       containerStyle={{width:150}}/>
                            <TextField label={section.content1}
                                       containerStyle={{width:30,marginLeft:20}}/>
                            <TextField label={section.content2}
                                       containerStyle={{width:30,marginLeft:20}}/>
                            <TextField label={section.content3}
                                       containerStyle={{width:30,marginLeft:20}}/>
                        </View>
                        <TextField label={section.content4}/>
                    </View>
                    }
                    {(section.title === 'Wallets') &&
                    <View style={{flexDirection: "row"}}>
                        <View style={{flexDirection: "column"}}>
                            <TouchableOpacity >
                                <Text>{section.content}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text>{section.content1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text>{section.content2}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection:"column",marginLeft:15}}>
                            <TouchableOpacity  >
                                <Image source={require('../Images/paytm.png')} style={{height: 30, width: 30,
                                    color:'#FFFFFF'}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity  >
                                <Image source={require('../Images/mobikwik.png')} style={{height: 30, width: 30,
                                    color:'#FFFFFF',marginTop:10}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity  >
                                <Image source={require('../Images/freecharge.png')} style={{height: 30, width: 30,
                                    color:'#FFFFFF',marginTop:15}}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                    }
                </View>
        );
    }

    saveContacts() {
        try {

            AsyncStorage.getItem('ticket')
                .then((ticket) => {
                    payticket = ticket ? JSON.parse(ticket) : [];
                    // Toast.show("tickets " +c ,Toast.LONG);
                    payticket.push(temptickets);
                    AsyncStorage.setItem('ticket', JSON.stringify(payticket));
                });

        }catch(error) {
            alert(error)
        }
    }

    render() {
         params = {};
        params = {
            fromLoc:this.props.fromLoc,
            toLoc:this.props.toLoc,
            tripdte:this.props.tripdte,
            totalfare:this.props.totalfare,
            count:this.props.count,
        };

        temptickets = {
            "Authority":"TSRTC",
            "Date":Moment(this.props.tripdte).format('DD/MM/YYYY'),
            "Ticket Number":"1001000000001",
            "Price":this.props.totalfare,
            "Number of Riders":this.props.count,
            "From":this.props.fromLoc,
            "To":this.props.toLoc,
            "Route(s)":"650N,625H",

        };

        return (

            <View style={styles.container}>
                {/*<ScrollView>*/}
                <View style={[styles.headerview]}>
                    {/*<Container >*/}
                        {/*<Content>*/}
                    <View style={{flexDirection:"row",backgroundColor:'#0c71b7',paddingRight:10,
                        paddingLeft:10,}}>
                        <TouchableOpacity onPress={() => Actions.searchScreen(params)} >
                            {/*<Image source={require('../Images/back_arrow.png')} style={{height: 30, width: 30,*/}
                                {/*color:'#FFFFFF',marginTop:5, flex:1}}*/}
                            {/*/>*/}
                            <Icon type='MaterialIcons' name='arrow-back' size={30} color="#FFFFFF"/>
                        </TouchableOpacity>
                        <Text note style={{marginTop:5,fontSize:16,textAlign:'center',color:'#FFFFFF', flex:5}} >Payment Details </Text>
                        <Text note style={{marginTop:5,fontSize:12,textAlign:'right',color:'#FFFFFF', flex:1}} > </Text>


                    </View>
                    <View style={{flexDirection:"row",backgroundColor:'#0c71b7',paddingRight:5,
                        paddingLeft:5}}>
                        <Text note style={{fontSize:16,textAlign:'left',color:'#FFFFFF'}} > {
                            Moment(this.props.tripdte).format('DD MMM').toUpperCase()} </Text>

                        <Text note style={{textAlign:'right',fontSize:16,color:'#FFFFFF',fontWeight:'bold',flex:1
                        }} > &#8377;{this.props.totalfare}/-
                        </Text>
                        {/*onPress={() => Actions.homeScreen(params)}*/}
                        {/*<TouchableOpacity style={{marginTop:10}} onPress={() => this.setState({dummy: 1})}>*/}
                        {/*<Icoons type='SimpleLineIcons' name='refresh' size={24} color="#FFFFFF"/>*/}
                        {/*</TouchableOpacity>*/}
                    </View>

                    {/*<ScrollView>*/}
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

                        <Accordion
                            sections={SECTIONS}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />

                        <View style={{flexDirection:"row"}}>
                            {/*<Text note style={{textAlign:'left',marginBottom:10,fontSize:40,color:'#2eacde',fontWeight:'bold',marginTop:20,*/}
                            {/*}} > &#8377;45/-*/}
                            {/*</Text>*/}

                            <Button style={{height:50,width:width-10,backgroundColor: '#2eacde',
                                marginTop:30,justifyContent:'space-evenly'}}
                                    onPress={() => {(this.openDialog(true)),this.saveContacts()}} >

                                {/*onPress={() => Actions.ticketScreen(params)}*/}
                                <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                    {/*<Image source={require('../Images/search_magnifie.png')} style = {{ width: 25,*/}
                                        {/*height: 25,alignItems:'center'}}/>*/}
                                    <Text style={{fontWeight: "bold",fontSize:14,color:'#FFFFFF'
                                        ,textAlign:'center',paddingLeft:10}}>Pay securely</Text>
                                </View>
                            </Button>
                            {/*<Button rounded style={{marginLeft:50,marginTop:20,height:28,backgroundColor: '#2eacde',justifyContent: 'flex-end',}}*/}
                                    {/*onPress={() => Actions.ticketScreen()}>*/}
                                {/*/!*<Image source={require('../Images/location.png')} style = {{ width: 25, height: 25,paddingLeft:5 }}/>*!/*/}
                                {/*<Text style={{fontWeight: "bold",fontSize:18}}>Pay securely</Text>*/}
                            {/*</Button>*/}
                        </View>

                    </Card>

                    <Dialog
                        visible={this.state.showDialog}
                        title="Ticket Details"
                        onTouchOutside={() => this.openDialog(false)}
                        contentStyle={{ justifyContent: 'center', alignItems: 'center', }}
                        animationType="fade">
                        <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                            <View style={{flexDirection:"column",justifyContent:'space-evenly'}}>
                                <Text note style={{marginTop:20,color:'#000',fontSize:14,justifyContent:'flex-start'
                                }} >Authority
                                </Text>
                                <Text note style={{marginTop:5,fontSize:14,color:'#000',justifyContent:'flex-start'
                                }} >Date
                                </Text>
                                <Text note style={{fontSize:14,marginTop:5,color:'#000',justifyContent:'flex-start'
                                }} >Ticket Number
                                </Text>
                                <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-start'
                                }} >Price
                                </Text>
                                <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-start'
                                }} >Number of Riders
                                </Text>
                                <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-start'
                                }} >From
                                </Text>
                                <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-start'
                                }} >To
                                </Text>
                                <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-start'
                                }} >Route(s)
                                </Text>


                            </View>
                            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                                <View style={{flexDirection:"column",justifyContent:'space-evenly'}}>

                                    <Text note style={{marginTop:20,fontSize:14,color:'#000',justifyContent:'flex-end'
                                    }} >: TSRTC
                                    </Text>
                                    <Text note style={{fontSize:14,color:'#000',justifyContent:'flex-end',marginTop:5,
                                    }} >: {Moment(this.props.tripdte).format('DD/MM/YYYY ')}
                                    </Text>

                                    <Text note style={{fontSize:14,color:'#000',justifyContent:'flex-end',marginTop:5,
                                    }} >: 100100000001
                                    </Text>
                                    <Text note style={{color:'#000',fontSize:14,marginTop:5,
                                    }} >: &#8377;{this.props.totalfare}/-
                                    </Text>
                                    <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-end'
                                    }} >: {this.props.count}
                                    </Text>
                                    <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-end'
                                    }} >: {this.props.fromLoc}
                                    </Text>
                                    <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-end'
                                    }} >: {this.props.toLoc}
                                    </Text>
                                    <Text note style={{fontSize:14,color:'#000',marginTop:5,justifyContent:'flex-end'
                                    }} >: 650N, 652H
                                    </Text>
                                </View>
                            </View>

                        </View>

                        <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                            <Image source={require('../Images/qr_code.png')} style={{marginTop:20,height: 80, width: 80,alignItems:'center'}}/>
                        </View>
                        <Text note style={{textAlign:'center',color:'#000',marginTop:10,marginBottom:20,fontSize:14,fontStyle:'italic',justifyContent: 'flex-start'
                        }} >Valid for one trip on {Moment(this.props.tripdte).format('DD/MM/YYYY')} only
                        </Text>
                        <Button transparent style={{height: 25,width:width-880,backgroundColor: '#FFFFFF',marginBottom:10
                        }}
                                onPress={() => {(this.openDialog(false)),Actions.homeScreen()}} >
                            <Text style={{fontWeight: "bold",fontSize:16,color:'#2eacde',flex:2
                                ,textAlign:'center'}}>Close</Text>
                        </Button>

                        {/*<Button onPress={() => this.openDialog(false)}  title="CLOSE" />*/}
                    </Dialog>
                </View>
                {/*</ScrollView>*/}

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
        // borderColor:'#2eacde',
        position: 'absolute',
        paddingRight:5,
        paddingLeft:5,
        paddingTop:15,
        backgroundColor:'#4d6bcb',
        left: 0,
        right: 0,
        // bottom:0,
        // top:0,


    },
    header: {
        backgroundColor: '#FFFFFF',
        padding: 10,

        // borderTopEndRadius:5,
        // borderWidth:1,
        flex: 1,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        borderTopColor: 'black',
        borderTopWidth: 0.8,
        width: width - 20,
        borderColor:'#4d6bcb',
        // borderBottomColor:'#FFFFFF',
        marginBottom:0,
        marginRight:5,
        marginLeft:5,
    },
    content1: {
        // backgroundColor:'#FFFFFF',
        marginTop: 90,

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
        // color:'#FFFFFF',
        marginBottom: 5,
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
    // header: {
    //     backgroundColor: '#FFFFFF',
    //     padding: 5,
    //     borderTopEndRadius:5,
    //     borderWidth:2,
    //     borderColor:'#2eacde',
    //     marginBottom:8,
    //     marginRight:5,
    //     marginLeft:5,
    // },
    headerText: {
        // textAlign: 'center',
        fontSize: 16,
        // fontWeight: '500',
        color:'#000',
        marginTop:20,
        justifyContent:'flex-end'
    },
    content: {
        marginTop:0,
        padding: 20,
        backgroundColor: '#FFFFFF',
        color:'#669999',
        marginRight:5,
        marginLeft:5,
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
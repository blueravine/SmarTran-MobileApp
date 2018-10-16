import React, { Component } from 'react';
import { Image,StyleSheet,TouchableHighlight,TouchableOpacity,ImageBackground,BackHandler,TextInput,PixelRatio,
    Dimensions,ScrollView,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { Actions } from 'react-native-router-flux'; // 4.0.0-beta.31
import SmartPicker from 'react-native-smart-picker'
import Iconns from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import Icoon from 'react-native-vector-icons/MaterialIcons';
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import BottomNavigation, {
    ShiftingTab
} from 'react-native-material-bottom-navigation'
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
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
var paramsmobile={tempnumber:''};

export default class More extends Component {


    constructor() {
        super();

        this.state= {
            activeTab: 'more',
            avatarSource: null
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


    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />

    )


    _handleTabPress(pressedKey) {
        switch (pressedKey) {
            case 'home':
                Actions.homeScreen();
                break;
            case 'favourite':
                Actions.homeScreen();
                // {this.buttonPress}
                this.setState({viewSection:!this.state.viewSection});
                // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                // {this.renderBottomComponent()}
                break;
            case 'track':
                Actions.tripScreen();
                // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
                break;
            case 'ticket':
                Actions.ticketScreen();
                BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton = () => {
        Actions.homeScreen(params);
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

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }


    render() {
        paramsmobile = {
            tempnumber:this.props.tempnumber,
        };
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
                    <ScrollView ref={ (c) => {this.scroll = c}} >
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
                    {/*<ScrollView>*/}
                        {/*<Card >*/}
                            {/*/!*<ImageBackground source={require('../Images/profilebackground.png')}*!/*/}
                            {/*<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>*/}
                                {/*<View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>*/}
                                    {/*{ this.state.avatarSource === null ? <Text>Select a Photo</Text> :*/}
                                        {/*<Image style={styles.avatar} source={this.state.avatarSource} />*/}
                                    {/*}*/}
                                {/*</View>*/}
                            {/*</TouchableOpacity>*/}
                            {/*/!*<Text note style={{marginTop:5,fontSize:12,textAlign:'right',color:'#FFFFFF', flex:1}} > </Text>*!/*/}
                        {/*</Card>*/}
                        {/*<ScrollView>*/}
                        {/*<Accordion*/}
                            {/*sections={SECTIONS}*/}
                            {/*renderHeader={this._renderHeader}*/}
                            {/*renderContent={this._renderContent}*/}
                        {/*>*/}
                        <Card style={{ borderRightWidth:10,borderBottomRightRadius:10,borderTopRightRadius:10,borderBottomLeftRadius:10,
                            borderTopLeftRadius:10,borderLeftWidth:10,shadowColor:"#f1f1f1f1",borderColor:'#FFFFFF'}}>
                            <View style={[styles.halfHeight,{paddingLeft:25,paddingRight:25}]} >
                                {/*<View style={[{backgroundColor: '#FFFFFF',flex:1}]}>*/}
                                {/*<Image source = {require('../Images/smartranlogo.png')} style={styles.ImageStyle} />*/}
                                {/*</View>*/}
                                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                        { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                                            <Image style={styles.avatar} source={this.state.avatarSource} />
                                        }
                                    </View>
                                </TouchableOpacity>
                                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                    {/*<Image source = {require('../Images/phonecircle.png')} style = {{ width: 45, height: 45,marginTop: 78 }} />*/}
                                    <Iconns type='FontAwesome' name='whatsapp' size={22} color="#bbbfbc" style = {{marginTop: 25 }}/>
                                    <TextField label="Mobile Number"
                                               lineHeight={30}
                                        // value={this.state.picked2}
                                               editable={false}
                                               fontSize={16}
                                        // onChangeText={(itemValue) => this.setState({selected2: itemValue})}
                                               containerStyle={{height:55,width:DEVICE_WIDTH - 120,marginTop:10,marginLeft:10,marginRight:10,justifyContent:'flex-end'}}/>

                                    {/*<View style={styles.loginFormTextInputnonedit}>*/}

                                        {/*<TextInput*/}
                                            {/*placeholder="   mobile number"*/}
                                            {/*keyboardType='phone-pad'*/}
                                            {/*editable={false}*/}
                                            {/*selectTextOnFocus={false}*/}
                                            {/*placeholderTextColor="#2CA8DB"*/}
                                            {/*returnKeyType={"done"}*/}
                                            {/*selectionColor="#2CA8DB"*/}
                                            {/*underlineColorAndroid="#fafafa"*/}
                                            {/*// value={this.state.mobile}*/}
                                            {/*// onChangeText={(mobile) => this.setState({mobile})}*/}
                                            {/*maxLength={10}*/}
                                            {/*style={{justifyContent: 'flex-end',}}>*/}
                                            {/*{this.props.tempnumber}*/}
                                        {/*</TextInput>*/}
                                    {/*</View>*/}
                                </View>


                            </View>
                            <View style={styles.quarterHeight}>
                                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>


                                    <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                        {/*<Image source = {require('../Images/padlock.png')} style = {{ width: 45, height: 45,marginTop: 15 }} />*/}
                                        <Icons type='SimpleLineIcons' name='user' size={22} color="#bbbfbc" style = {{marginTop: 15 }}/>
                                        <TextField label="Name"
                                                   lineHeight={30}
                                            // value={this.state.picked2}
                                                   editable={true}
                                                   fontSize={16}
                                            // onChangeText={(itemValue) => this.setState({selected2: itemValue})}
                                                   containerStyle={{height:55,width:DEVICE_WIDTH - 120,marginTop:10,marginLeft:10,marginRight:10,justifyContent:'flex-end'}}/>

                                        {/*<View style={styles.loginFormTextInput1}>*/}

                                            {/*<TextInput*/}
                                                {/*placeholder="   Name"*/}
                                                {/*placeholderTextColor="#2CA8DB"*/}
                                                {/*underlineColorAndroid="#fafafa"*/}
                                                {/*returnKeyType={"next"}*/}
                                                {/*// value={this.state.otp}*/}
                                                {/*onChangeText={(otp) => this.setState({otp:otp})}*/}
                                                {/*selectionColor="#2CA8DB"*/}
                                                {/*maxLength={6}*/}
                                                {/*style={{justifyContent: 'flex-end',}}/>*/}
                                        {/*</View>*/}
                                    </View>

                                </View>
                                <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                                    {/*<Image source = {require('../Images/key.png')} style = {{ width: 45, height: 45,marginTop: 18 }} />*/}
                                    <Icoon type='MaterialIcons' name='email' size={22} color="#bbbfbc" style = {{marginTop: 18 }}/>
                                    <TextField label="Email-Id"
                                               lineHeight={30}
                                        // value={this.state.picked2}
                                               editable={true}
                                               fontSize={16}
                                        // onChangeText={(itemValue) => this.setState({selected2: itemValue})}
                                               containerStyle={{height:55,width:DEVICE_WIDTH - 120,marginTop:10,marginLeft:10,marginRight:10,justifyContent:'flex-end'}}/>

                                    {/*<View style={styles.loginFormTextInput1}>*/}

                                        {/*<TextInput*/}
                                            {/*placeholder="   Email-Id"*/}
                                            {/*placeholderTextColor="#2CA8DB"*/}
                                            {/*underlineColorAndroid="#fafafa"*/}
                                            {/*returnKeyType={"done"}*/}
                                            {/*// value={this.state.otp}*/}
                                            {/*onChangeText={(otp) => this.setState({otp:otp})}*/}
                                            {/*selectionColor="#2CA8DB"*/}
                                            {/*maxLength={6}*/}
                                            {/*style={{justifyContent: 'flex-end',}}/>*/}
                                        {/*/!*<TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>*!/*/}
                                            {/*/!*<Image source = { ( this.state.hidePassword ) ? require('../Images/hide.png') : require('../Images/view.png') }*!/*/}
                                                   {/*/!*style = { styles.btnImage } />*!/*/}
                                        {/*/!*</TouchableOpacity>*!/*/}
                                    {/*</View>*/}
                                </View>

                            </View>
                        </Card>

                        {/*</Accordion>*/}
                    {/*</ScrollView>*/}
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
        width:100,
        height:100,
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
        width:DEVICE_WIDTH - 120,
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
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        marginLeft:60,
        marginTop:10,
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});
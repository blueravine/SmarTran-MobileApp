import React, { Component } from 'react';
import { Image,StyleSheet,
    Dimensions,ScrollView,Alert} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Icon, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import { Actions } from 'react-native-router-flux'; // 4.0.0-beta.31
import SmartPicker from 'react-native-smart-picker'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
import { BottomNavigation } from 'react-native-material-ui';

const card      = {card: {width: 100,height:300,borderWidth: 3,
        borderRadius: 3,
        borderColor: '#FFFFFF',
        padding: 10}};
const cardItem = {cardItem: {fontSize: 40}};

export default class Recent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: "At",

        };

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={[styles.headerview]}>
                    <Container >
                        <Content>
                            <Card  styles={{width: 100,height:300,borderWidth: 3,
                                borderColor: '#FFFFFF', alignItems: 'center',
                                borderRadius: 5,
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                elevation: 1,
                                padding: 10}}>

                                <CardItem cardBody  styles={{width: 100,height:300,borderWidth: 3,
                                    borderColor: '#FFFFFF', alignItems: 'center',
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                    backgroundColor: 'white',
                                    elevation: 1,
                                    padding: 10}}>
                                    {/*<View style={{flexDirection:"row"}}>*/}
                                        {/*<Image source={require('../Images/smartranlogo.png')} style={{height: 200, width: null, flex: 1}}/>*/}
                                        <Text note style={{paddingLeft:100,paddingBottom:10,fontSize:16,fontWeight:'bold',
                                            }} >Congratulations !
                                            </Text>

                                    {/*</View>*/}


                                </CardItem>
                                <Text note style={{paddingLeft:100,fontSize:16,fontWeight:'bold',
                                    }} >Have a safe trip ! !
                                </Text>


                            </Card>

                        </Content>


                        <Content />

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



                        {/*<BottomNavigation active={this.state.active} hidden={true} >*/}
                        {/*<BottomNavigation.Action*/}
                        {/*key="search"*/}
                        {/*icon={<Image source={require('../Images/searchmagnifier.png')}color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}*/}
                        {/*label="Search"*/}
                        {/*// iconColor:"#2CA8DB"*/}
                        {/*onPress={() => this.setState({ active: 'search' })}*/}
                        {/*/>*/}
                        {/*<BottomNavigation.Action*/}
                        {/*key="favourite"*/}
                        {/*icon={<Image source={require('../Images/staricon.png')}color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}*/}
                        {/*label="Favourite"*/}
                        {/*onPress={() => this.setState({ active: 'favourite' })}*/}
                        {/*/>*/}
                        {/*<BottomNavigation.Action*/}
                        {/*key="recent"*/}
                        {/*icon={<Image source={require('../Images/recent.png')} color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}*/}
                        {/*label="Recent"*/}
                        {/*onPress={() => this.setState({ active: 'recent' })}*/}
                        {/*/>*/}
                        {/*<BottomNavigation.Action*/}
                        {/*key="more"*/}
                        {/*icon={<Image source={require('../Images/menu_symbol.png')} color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}*/}
                        {/*label="More"*/}
                        {/*onPress={() => this.setState({ active: 'more' })}*/}
                        {/*/>*/}
                        {/*</BottomNavigation>*/}


                        {/*<Footer >*/}

                        {/*<FooterTab style={{backgroundColor: '#15669b'}}>*/}

                        {/*<Button vertical active style={{backgroundColor: '#2CA8DB',height:55}}*/}
                        {/*onPress={() => this._renderContent(Home) } >*/}
                        {/*<Image  source={require('../Images/searchmagnifier.png')} />*/}
                        {/*<Text>Search</Text>*/}
                        {/*</Button>*/}
                        {/*<Button vertical onPress={() => this._renderContent(Favourite)}*/}
                        {/*onPress={() => this._renderContent(Favourite) }>*/}
                        {/*<Image  source={require('../Images/staricon.png')} />*/}
                        {/*<Text>Favourite</Text>*/}
                        {/*</Button>*/}
                        {/*<Button vertical onPress={() => this._renderContent(Favourite)}>*/}
                        {/*<Image  source={require('../Images/recent.png')} />*/}
                        {/*<Text>Recent</Text>*/}
                        {/*</Button>*/}
                        {/*<Button vertical >*/}
                        {/*<Image  source={require('../Images/menu_symbol.png')} />*/}
                        {/*<Text>More</Text>*/}
                        {/*</Button>*/}
                        {/*/!*<Button vertical>*!/*/}
                        {/*/!*<Icon name="person" />*!/*/}
                        {/*/!*<Text>Alert</Text>*!/*/}
                        {/*/!*</Button>*!/*/}
                        {/*</FooterTab>*/}

                        {/*</Footer>*/}


                    </Container>
                </View>
                <ScrollView>
                    <View style={[styles.content1]}>
                        <View style={[styles.box]}>
                            {/*<Text note style={{fontSize:16}} >     Bus No           Arrival Time           Amount</Text>*/}
                            {/*<Accordion*/}
                                {/*sections={SECTIONS}*/}
                                {/*renderHeader={this._renderHeader}*/}
                                {/*renderContent={this._renderContent}*/}
                            {/*/>*/}
                        </View>

                    </View>
                </ScrollView>


                <View style={[styles.footer]}>
                    <BottomNavigation active={this.state.active} hidden={true} >
                        <BottomNavigation.Action
                            key="search"
                            icon={<Image source={require('../Images/searchmagnifier.png')}color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}
                            label="Search"
                            // iconColor:"#2CA8DB"
                            onPress={() => this.setState({ active: 'search' })}
                        />
                        <BottomNavigation.Action
                            key="favourite"
                            icon={<Image source={require('../Images/staricon.png')}color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}
                            label="Favourite"
                            onPress={() => this.setState({ active: 'favourite' })}
                        />
                        <BottomNavigation.Action
                            key="recent"
                            icon={<Image source={require('../Images/recent.png')} color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}
                            label="Recent"
                            onPress={() => this.setState({ active: 'recent' })}
                        />
                        <BottomNavigation.Action
                            key="more"
                            icon={<Image source={require('../Images/menu_symbol.png')} color="#2CA8DB" name="Shop" style={{ width: 20, height: 20 }} />}
                            label="More"
                            onPress={() => this.setState({ active: 'more' })}
                        />
                    </BottomNavigation>
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
    },
    headerview: {
        // height: 250,
        //borderRadius:25,
        // borderWidth:5,
        borderColor:'#2EACDE',
        position: 'absolute',
        paddingRight:5,
        paddingLeft:5,
        paddingTop:15,
        backgroundColor:'#E8E8E8',
        left: 0,
        right: 0,


    },
    content1: {
        backgroundColor:'#FFFFFF',
        marginTop: 100,

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

        backgroundColor: '#E8E8E8',
        color:'#FFFFFF',
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
    // header: {
    //     backgroundColor: '#FFFFFF',
    //     padding: 5,
    //     borderTopEndRadius:5,
    //     borderWidth:2,
    //     borderColor:'#2EACDE',
    //     marginBottom:8,
    //     marginRight:5,
    //     marginLeft:5,
    // },
    // headerText: {
    //     // textAlign: 'center',
    //     fontSize: 16,
    //     fontWeight: '500',
    //     color:'#0C71B7',
    // },
    // content: {
    //     padding: 20,
    //     backgroundColor: '#FFFFFF',
    //     marginRight:5,
    //     marginLeft:5,
    // },
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
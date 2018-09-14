import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Picker,DeckSwiper, Text,Item,Input,View,Fab, Button, Icon, Left, Body, Right,
    Footer, FooterTab} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import SwipeCards from 'react-native-swipe-cards';
import { Dropdown } from 'react-native-material-dropdown';
import SmartPicker from 'react-native-smart-picker'

export default class Favourite extends Component {

    render() {
        let AppComponent = null;
//Here you can add as many tabs you need

        return (
            <Container>
                {/*<Header />*/}
                <View>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    {/*<Thumbnail source={require('../Images/smartranlogo.png')} />*/}
                                    <Body>
                                    {/*<Text>NativeBase</Text>*/}
                                    <Left>
                                        <Text note>Alerts</Text>
                                    </Left>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <View style={{flexDirection:"row"}}>
                                    {/*<Image source={require('../Images/smartranlogo.png')} style={{height: 200, width: null, flex: 1}}/>*/}
                                    <Text note style={{fontSize:16,width: 300,
                                        borderWidth: 0.5,
                                        borderRadius:15,
                                        borderColor: '#2CA8DB',
                                        paddingBottom:10,
                                        paddingTop:10,
                                        marginTop: 10,
                                        marginBottom:10,
                                        marginLeft:20,
                                        paddingLeft:10,
                                        backgroundColor: '#fafafa'}} >Leaving Now at 11:10AM
                                        Gachibowli to Koti</Text>

                                </View>


                            </CardItem>
                            <CardItem>
                                <Left>
                                    {/*<Text style={{paddingRight:10}} >A/C</Text>*/}

                                    {/*<ToggleSwitch*/}
                                    {/*isOn={false}*/}
                                    {/*onColor='#2CA8DB'*/}
                                    {/*offColor='grey'*/}
                                    {/*labelStyle={{color: 'black', fontWeight: '200'}}*/}
                                    {/*size='medium'*/}
                                    {/*onToggle={isOnDefaultToggleSwitch => {*/}
                                    {/*this.setState({ isOnDefaultToggleSwitch });*/}
                                    {/*this.onToggle(isOnDefaultToggleSwitch);*/}
                                    {/*}}*/}
                                    {/*// onToggle={ (isOn) => console.log('changed to : ', isOn) }*/}
                                    {/*/>*/}
                                    {/*<Text>Non A/C</Text>*/}
                                </Left>
                                <Right>
                                    <Button rounded >
                                        <Image source={require('../Images/location.png')} style = {{ width: 25, height: 25,paddingLeft:5 }}/>
                                        <Text>Catch Ride</Text>
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>


                        }
                    />
                </View>


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
                <Footer >
                    <FooterTab style={{backgroundColor: '#15669b'}}>
                        <Button vertical active style={{backgroundColor: '#2CA8DB',height:55}}
                                >
                            <Image  source={require('../Images/searchmagnifier.png')} />
                            <Text>Search</Text>
                        </Button>
                        <Button vertical >
                            <Image  source={require('../Images/staricon.png')} />
                            <Text>Favourite</Text>
                        </Button>
                        <Button >
                            <Image  source={require('../Images/recent.png')} />
                            <Text>Recent</Text>
                        </Button>
                        <Button vertical >
                            <Image  source={require('../Images/menu_symbol.png')} />
                            <Text>More</Text>
                        </Button>
                        {/*<Button vertical>*/}
                        {/*<Icon name="person" />*/}
                        {/*<Text>Alert</Text>*/}
                        {/*</Button>*/}
                    </FooterTab>
                </Footer>

            </Container>

        );
    }
}

import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

// import SplashScreen from './SplashScreen'
import Home from './Home';
import SearchScreen from './SearchScreen';
import Registration from './Registration';
import LoginScreen from './LoginScreen';
import OTPScreen from './OTPScreen';
import Trips from './Trips'
import More from './More'
import PaymentScreen from './PaymentScreen';
import TicketScreen from './TicketScreen';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">

              {/*<Scene key="splshScreen"*/}
                     {/*component={SplashScreen}*/}
                     {/*animation='fade'*/}
                     {/*hideNavBar={true}*/}
                     {/*initial={true}*/}
              {/*/>*/}

            {/*<Scene key="registerScreen"*/}
	          {/*component={Registration}*/}
	        	{/*animation='fade'*/}
	          {/*hideNavBar={true}*/}
	          {/*initial={true}*/}
            {/*/>*/}
            {/*<Scene key="loginScreen"*/}
	          {/*component={LoginScreen}*/}
	          {/*animation='fade'*/}
	          {/*hideNavBar={true}*/}
            {/*/>*/}
			{/*<Scene key="otpScreen"*/}
				 {/*component={OTPScreen}*/}
				 {/*animation='fade'*/}
				 {/*hideNavBar={true}*/}
			{/*/>*/}

			<Scene key="homeScreen"
				 component={Home}
				 animation='fade'
				 hideNavBar={true}
			/>
              <Scene key="tripScreen"
                     component={Trips}
                     animation='fade'
                     hideNavBar={true}
              />
			<Scene key="searchScreen"
				 component={SearchScreen}
				 animation='fade'
				 hideNavBar={true}
			/>
			<Scene key='paymentScreen'
				 component={PaymentScreen}
				 animation='fade'
				 hideNavBar={true}/>

              <Scene key='ticketScreen'
                     component={TicketScreen}
                     animation='fade'
                     hideNavBar={true}/>
              <Scene key="moreScreen"
                     component={More}
                     animation='fade'
                     hideNavBar={true}
              />
	      </Scene>




	    </Router>
	  );
	}
}
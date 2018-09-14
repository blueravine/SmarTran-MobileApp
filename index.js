/** @format */

import {AppRegistry} from 'react-native';
import App from './src/components/Main';
//Registration,Main,SearchScreen

import {name as appName} from './app.json';
type Props = {};

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);


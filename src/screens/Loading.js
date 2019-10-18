import React from 'react';
import {View, Text} from 'react-native';

import Login from './Login';

export default class Loading extends React.Component {
    static defaultNavigationOptions = ({ navigation }) => {
        return {
          title: 'wassup'
        };
      };
    state = {
        number: Math.floor(Math.random() * 22)
    }
    render() {
        return this.state.number > 6 ? this.props.navigation.navigate('SecondTier') : 
         (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Login navigation={this.props.navigation}/>    
            </View>
        )
    }
}
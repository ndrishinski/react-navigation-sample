import React from 'react';
import {View, Text} from 'react-native';

export default class Users extends React.Component {
    static navigationOptions = {
      title: 'wassup'
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={() => this.props.navigation.openDrawer()}>Users Page</Text>
            </View>
        )
    }
}
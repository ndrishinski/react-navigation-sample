import React from 'react';
import {View, Text} from 'react-native';

export default class Messages extends React.Component {
    static navigationOptions = {
        title: "messages"
    }
    render() {
        console.log('propsfrom messages', this.props);
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Messages Page</Text>
            </View>
        )
    }
}
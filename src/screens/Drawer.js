import React from 'react';
import {View, Text} from 'react-native';

export default class Drawer extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Label'
    }

    render() {
        console.log('propsfrom Drawer', this.props);
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text>Drawer Page</Text>
            </View>
        )
    }
}
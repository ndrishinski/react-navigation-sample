import React from 'react';
import {View, Text} from 'react-native';

export default class CustomerSupport extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return  {
            title: 'My Devices',
            headerLeft:(
                // <IconButton icon='menu' onPress={ navigation.toggleDrawer }/>
                <Text onPress={() => navigation.openDrawer()} style={{paddingLeft: 4}}>Open Drawer</Text>
            ),
        }
      }
    render() {
        console.log('props from customersupport', this.props);
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text>CustomerSupport Page</Text>
            </View>
        )
    }
}
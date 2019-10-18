import React from 'react';
import {View, Text} from 'react-native';

import * as firebase from 'firebase';

export default class Messages extends React.Component {
  static navigationOptions = {
    title: 'messages',
  };

  state = {
    messages: []
  }

  componentDidMount() {
    // gets data and listens for changes
    let result = [];
    var ref = firebase.database().ref('overall/users/-LrVM95eP6J4MXWncxW8/messages')
    ref.once('value', (snapShot) => {
      this.setState({messages: Object.values(snapShot.val())})
    })
  
  }

  handlePress () {
    // push gives unique id 
    // set doesn't
    // update wont delete other stuff in there
    let userId = '-LrVM95eP6J4MXWncxW8';
    var messagesRef = firebase.database().ref('overall/users/' + userId + '/messages');

    messagesRef
      .push({to: 'Justine', message: 'you like?'})
      .then(res => {console.log('success', res)})
      .catch(err => console.log(err));
  }

  handlePress2 () {
    var ref = firebase.database().ref('overall/admins')
    ref.push({name: 'Johnny', lastName: 'Smith'})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  readHandlePress2() {
    var ref = firebase.database().ref('overall/admins/-LrVqWnb14GH7umMu4H6/messages')
    ref.set({_id: '123456789', message: 'Howdy partner', to: 'Jimmy Johns'})
  }

  render() {
    console.log('state', this.state.messages)
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text onPress={() => this.handlePress()}>Messages Page</Text>
        <Text style={{margin: 40}} onPress={() => this.handlePress2()}>Press for admins</Text>
        <Text style={{margin: 40}} onPress={() => this.readHandlePress2()}>Press for Read Admins</Text>
        <View style={{backgroundColor: 'lightGrey', height: 300, width: 300}}>
        </View>
      </View>
    );
  }
}

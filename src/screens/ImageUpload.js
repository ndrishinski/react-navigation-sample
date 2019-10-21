import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase'
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'

export default class RNF extends Component {
  constructor(props) {
   super(props)
   this.state = {
     loading: false,
     dp: null,
     url: '',
    }
  }

  // see https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Install.md

  hiddenFunc(image) {
    this.setState({ loading: true })
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    // //const { uid } = this.state.user
    // const uid = `${Math.floor(Math.random() * 650)}`
    const uid = 'newguy'
    const imagePath = image.path

      let uploadBlob = null

      const imageRef = firebase.storage().ref(uid).child(new Date().getTime() + "dp.jpg")
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          console.log('copy this', imageRef.getDownloadURL())
          return imageRef.getDownloadURL()
        })
        .then((url) => {

          let userData = {}
          //userData[dpNo] = url
          //firebase.database().ref('users').child(uid).update({ ...userData})

          let obj = {}
          obj["loading"] = false
          obj["dp"] = url
          this.setState(obj)

        })
        .catch((error) => {
          console.log(error)
        })
  }

  componentDidMount() {
    // get user image or see #70, save url to db
    let ref = firebase.storage().ref('12345').child('dp.jpg')
    ref.getDownloadURL()
    .then(res => {
      this.setState({url: res})
    })
  }

  openPicker(){
    
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      this.hiddenFunc(image)
    })
    .catch((error) => {
      console.log(error)
    })
}

addManyPhotos() {
  ImagePicker.openPicker({
    multiple: true
  }).then(images => {
    console.log('images', images);
    images.map(item => this.hiddenFunc(item))
  });
}

addSinglePhoto() {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    this.hiddenFunc(image)
  });
}

launchCamera() {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    this.hiddenFunc(image);
  });
}

  render() {
    const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
         style={{width: 100, height: 100, margin: 5}}
         source={{uri: this.state.dp}}
       /></TouchableOpacity>) : (<Button
      onPress={ () => this.openPicker() }
      title={ "Change Picture" }
    />)

    const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
      <View style={{flexDirection: "row"}}>
        { dpr }
      </View>
    </View>)

    return (
      <View style={styles.container}>
        {/* { dps } */}
        <View>
          <View>
          <Button
            onPress={ () => this.addManyPhotos() }
            title={ "Add Many Photos" }
          />
          <Button
            onPress={ () => this.addSinglePhoto() }
            title={ "Add single photo" }
          />
          <Button
            onPress={ () => this.launchCamera() }
            title={ "Take a photo" }
          />
          </View>
          {this.state.url ? 
          <Image source={{uri: this.state.url}} style={{height: 100, width: 100}} /> 
        : null}
        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/fir-realtime-db-4eadb.appspot.com/o/12345%2Fdp.jpg?alt=media&token=d6cd6073-2919-4c44-9c51-8e5279b48fe9"}} style={{height: 100, width: 100}} />
          <Text>Placeholder</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNF', () => RNF);
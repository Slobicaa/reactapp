import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Camera, Permissions } from 'expo';
import axios from 'axios';

export default class Cameraa extends React.Component {
  state = {
    hasCameraPermission: null, 
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  uploadImage(img) {
    axios({
      method: "post",
      url: `http://192.168.43.138:8081/MyFileService/files3/slika`,
      data: {
        fileContent: img.base64,
        contentType: "picture/jpg",
        fileName: img.name

      }
    })
  }
  
  async snapPhoto() {       
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, pictureSize:"320x240",
       exif: true};
       //await this.camera.getAvailablePictureSizesAsync("4:3").then(a => console.log(a))

       await this.camera.takePictureAsync(options).then(photo => {
        photo.name = `${Math.round(Math.random()*100000)}.jpg`
          photo.exif.Orientation = 1; 
        
          this.props.addImg(photo);  
          this.uploadImage(photo)
           })  
     }
    }
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
            
            <Camera style={{ flex: 1 }} type={this.state.type} ref={ (ref) => {this.camera = ref} }>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Rotiraj{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snapPhoto.bind(this)} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Slikaj{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {this.props.closeCamera()}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Povratak{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          
        </View>
      );
    }
  }
}
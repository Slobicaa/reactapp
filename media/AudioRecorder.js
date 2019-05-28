import React from 'react';
import { Button, Text, Header, Body, Icon, Title, Spinner } from 'native-base';
import { Camera, Permissions, FileSystem } from 'expo';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Layout from './Layout';
import delay from 'delay';
import shortid from 'shortid';
import axios from 'axios'
//import RNFetchBlob from 'react-native-fetch-blob'
const printChronometer = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remseconds = seconds % 60;
  return '' + (minutes < 10 ? '0' : '') + minutes + ':' + (remseconds < 10 ? '0' : '') + remseconds;
};

export default class AudioRecorder extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    recording: false,
    duration: 0,
  };

  async componentWillMount() {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasCameraPermission: cameraStatus === 'granted' && audioStatus === 'granted' });
  }
 getBase64(file){
   let reader = new FileReader();
   fetch("GET", file)
   .then(file => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("res" + reader.result);
    }
    reader.onerror = error => {
      console.log("err" + error);
    }
   }
    
   )
   
 }
  async startRecording() {
    if (!this.camera) {
      return;
    }
    const options = { quality: "480p", maxDuration: 60}

    await this.setState(state => ({ ...state, recording: true }));
    const record = await this.camera.recordAsync();
    console.log(record);
    //this.props.addVideo(record)
    //const data = new FormData()
    // data.append('document', {
    //     uri: record.uri,
    //     name:  `${Math.round(Math.random()*100000)}.mp4`,
    //     type: 'application/base64'
    // })
      this.getBase64(record.uri)
  }

  async stopRecording() {
    if (!this.camera) {
      return;
    }

    await this.camera.stopRecording();
  }

  toggleRecording() {
    const { recording } = this.state;

    return recording ? this.stopRecording() : this.startRecording();
  }

  render() {
    const { hasCameraPermission, recording, duration } = this.state;
console.log(recording)
    if (hasCameraPermission === null) {
      return (
          <Spinner />
      );
    } else if (hasCameraPermission === false) {
      return (
          <Text>No access to camera</Text>
      )
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
            onPress={this.toggleRecording.bind(this)} >
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' ' + (recording ? 'Sačuvaj' : 'Snimi') + ' '}
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


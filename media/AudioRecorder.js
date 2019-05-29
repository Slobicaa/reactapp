import React from 'react';
import { Button, Text, Header, Body, Icon, Title, Spinner } from 'native-base';
import { FileSystem, Permissions, Audio } from 'expo';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios'

export default class AudioRecorder extends React.Component {
  state = {
    hasAudioPermission: null,
    recording: false,
    duration: 0,
  };
  
  async componentDidMount() {
    const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasAudioPermission: audioStatus === 'granted' });
  }

  async getBase64(file){
    const x = await FileSystem.readAsStringAsync(file, {encoding: FileSystem.EncodingTypes.Base64})
    return x
  }

  uploadAudio(audio) {
    axios({
      method: "post",
      url: `http://192.168.43.138:8081/MyFileService/files3/audio`,
      data: {
        fileContent: audio.base64,
        contentType: "audio/mp3",
        fileName: audio.name
  
      }
    })
  }
 
  async startRecording() {
    const recording = new Audio.Recording();
    try {
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
      this.recording = recording
      await recording.startAsync();
    } catch (error) {
      console.log("An error has occured")
    }
    await this.setState(state => ({ ...state, recording: true }));
  }

  async stopRecording() {
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      
    }
    const uri = this.recording.getURI();
    const data = {
      uri,
      name: `${Math.round(Math.random()*100000)}.3gp`
    }
    this.props.addAudio(data)
    data.base64 = await this.getBase64(data.uri)
    this.uploadAudio(data)
  }
  async componentWillUnmount(){
    try {
      await this.recording.stopAndUnloadAsync()
    } catch (error) {
      
    }
  }
  toggleRecording() {
    const { recording } = this.state;

    return recording ? this.stopRecording() : this.startRecording();
  }

  render() {
    const { hasAudioPermission, recording, duration } = this.state;
    if (hasAudioPermission === null) {
      return (
          <Spinner />
      );
    } else if (hasAudioPermission === false) {
      return (
          <Text>No access to microphone</Text>
      )
    } else {
      return (
        <View style={{ flex: 1 }}>
            
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
            onPress={this.toggleRecording.bind(this)} >
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
              {' ' + (recording ? 'Sačuvaj' : 'Snimi') + ' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              try {
                this.recording.stopAndUnloadAsync()
              } catch (error) {
                
              }
              this.props.closeMicrophone()}} >
            <Text
              style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
              {' '}Povratak{' '}
            </Text>
          </TouchableOpacity>
        </View>
      
    </View>
      );
    }
  }
}


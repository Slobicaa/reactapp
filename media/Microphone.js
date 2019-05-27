import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Audio, Permissions } from 'expo';

export default class Microphone extends React.Component {
  state = {
    hasMicrophonePermission: null,
    images: [],
    isMicrophoneOpen: false,
    duration: 0
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasMicrophonePermission: status === 'granted' });
  }

  
  async recordAudio() {       
    const recording = new Audio.Recording();
    try {
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    console.log("You are now recording!")
    this.setState({isMicrophoneOpen: false}) 
    const that = this;          
    setInterval(async function(){ await recording.getStatusAsync().then(e => that.setState({duration: Math.round(e.durationMillis/1000) }))}, 1000);
    
    } catch (error) {
    console.log("An error occurred!")
}
    }
  render() {
    const { hasMicrophonePermission } = this.state;
    if (hasMicrophonePermission === null) {
      return <View />;
    } else if (hasMicrophonePermission === false) {
      return <Text>No access to audio</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
            {this.state.isMicrophoneOpen ? 
            <View 
            style={{ flex: 1 }}
            >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Recording{' ' + this.state.duration }
                </Text>
          <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  color: 'black'
                }}
                onPress={() => {this.setState({isMicrophoneOpen: false})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Back{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  color: 'black'
                }}
                onPress={() => {this.setState({isMicrophoneOpen: true})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}stop{' '}
                </Text>
              </TouchableOpacity>
            </View>
             : 
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
                onPress={this.recordAudio.bind(this)} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Snimi zvuk{' '}
                </Text>
              </TouchableOpacity>
            </View>
        }
          
        </View>
      );
    }
  }
}
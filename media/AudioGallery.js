import React from 'react';
import SingleAudio from './SingleAudio';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Card } from '../common';
import axios from 'axios'
import AudioRecorder from './AudioRecorder';
export default class AudioGallery extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    audios: [],
    isMicrophoneOpen: false
  };
  addAudio(v){
    const x = this.state.audios
    x.push(v)
    this.setState({audios: x, isMicrophoneOpen:false})
  }
  closeMicrophone() {
    this.setState({isMicrophoneOpen: false})
  }
  deleteAudio(audio) {
    axios.delete(`http://192.168.43.138:8081/MyFileService/files/${audio.name}/`)
    const niz = this.state.audios
    const index = niz.indexOf(audio)
    delete niz[index]
    this.setState({audios: niz})
  }
  
  componentDidMount() {
    axios.get('http://192.168.43.138:8081/MyFileService/categories/audio/')
    .then(response => response.data)
    .then(data => {
        const array = []
        const promises = []
data.forEach((audio) => {
    promises.push(axios.get(audio.fileLink)
        .then(response => response.data)
        .then(res => array.push({base64: res.content, name: res.filename}))
        .catch(error => {
            console.log(error)
            
        })
    )
})
Promise.all(promises)
    .then( () => {
this.setState({audios: array})
    })

    })
}

  render() {
      const didBlurSub = this.props.navigation.addListener("willBlur", ()=> this.setState({isMicrophoneOpen:false}))
      if(this.state.isMicrophoneOpen) return <AudioRecorder closeMicrophone={this.closeMicrophone.bind(this)} addAudio={this.addAudio.bind(this)}/>
      else return (
        <View style={{ flex: 1, marginTop: 30}}>
            <ScrollView 
            
            style={{ flex: 1 }}
            >
            <Card>
                {this.state.audios.map((audio, index) => 
                <SingleAudio  key={Math.random()} data={audio} deleteAudio={this.deleteAudio.bind(this)}/>
               )}  
            </Card>
            </ScrollView>

            <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  color: 'black'
                }}
                onPress={() => {this.setState({isMicrophoneOpen: true})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Snimi audio{' '}
                </Text>
              </TouchableOpacity> 
        </View>
      );
    }

}
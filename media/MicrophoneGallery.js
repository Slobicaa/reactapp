import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from '../common';
import Camera from './Camera'
import axios from 'axios'
import Microphone from './Microphone';
export default class MicrophoneGallery extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    sounds: [],
    isMicrophoneOpen: false
  };
  addImg(img){
    const x = this.state.sounds
    x.push(img)
    this.setState({sounds: x, isMicrophoneOpen:false})
  }
  closeCamera() {
    this.setState({isMicrophoneOpen: false})
  }
  deleteImage(photo) {
    axios.delete(`http://192.168.43.138:8081/MyFileService/files/${photo.name}/`)
    const niz = this.state.sounds
    const index = niz.indexOf(photo)
    delete niz[index]
    this.setState({sounds: niz})
  }
  uploadImage() {
    axios({
      url: `http://192.168.43.138:8081/MyFileService/files/slika`,
      data: {
        
      }
    })
  }
  componentDidMount() {
    axios.get('http://192.168.43.138:8081/MyFileService/categories/slika/')
    .then(response => response.data)
    .then(data => {
        const array = []
        const promises = []
data.forEach((img) => {
    promises.push(axios.get(img.fileLink)
        .then(response => response.data)
        .then(res => array.push({base64: res.content, name: res.filename}))
        .catch(error => {
            console.log(error)
            
        })
    )
})
Promise.all(promises)
    .then( () => {
this.setState({sounds: array})
    })

    })
}

  render() {
      const didBlurSub = this.props.navigation.addListener("willBlur", ()=> this.setState({isMicrophoneOpen:false}))
      if(this.state.isMicrophoneOpen) return <Microphone />
      else return (
        <View style={{ flex: 1, marginTop: 30}}>
            <ScrollView 
            
            style={{ flex: 1 }}
            >
            <Card>
                {this.state.sounds.map((photo, index) => 
                <CardSection key={index }>
                      <Image key={index } style={{width: 200, height: 150}}
                        source={{uri: photo.uri  || "data:image/png;base64," + (photo.base64)}} /> 
                      {console.log(photo.name)}
                      <TouchableOpacity
                        onPress={ () => this.deleteImage(photo)  }
                        style={{
                          flex: 1,
                          alignSelf: 'center',
                          alignItems: 'center',
                          width: 100,
                          height: 100,
                          color: 'black'
                        }}>
                        <Text
                          style={{ fontSize: 18, marginTop: 30, color: 'black' }}>
                          {' '}Obriši{' '}
                        </Text>
                      </TouchableOpacity>

               </CardSection> )}  
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
                  {' '}Snimi zvuk{' '}
                </Text>
              </TouchableOpacity> 
          
        </View>
      );
    }

}
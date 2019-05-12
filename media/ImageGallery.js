import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Camera from './Camera'
import axios from 'axios'
export default class ImageGallery extends React.Component {

  state = {
    images: [],
    isCameraOpen: false
  };
  addImg(img){
    const x = this.state.images
    x.push(img)
    this.setState({images: x, isCameraOpen:false})
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
        .then(res => array.push({base64: res.content}))
        .catch(error => {
            console.log(error)
            
        })
    )
})
Promise.all(promises)
    .then( () => {
this.setState({images: array})
    })

    })
}

  

  render() {
      if(this.state.isCameraOpen) return <Camera addImg={this.addImg.bind(this)}/>
      else return (
        <View style={{ flex: 1 }}>
            <ScrollView 
            style={{ flex: 1 }}
            >
                {this.state.images.map((photo, index) => <Image key={index } style={{width: 150, height: 150}
                }
          source={{uri: photo.uri  || "data:image/png;base64," + (photo.base64)}} />)}
          <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  width: 100,
                  height: 100,
                  color: 'black'
                }}
                onPress={() => {this.setState({isCameraOpen: true})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Take photo{' '}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          
        </View>
      );
    }

}
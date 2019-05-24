import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from '../common';
import Camera from './Camera'
import axios from 'axios'
export default class ImageGallery extends React.Component {

  static navigationOptions = {
    header: null,
  };

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
        <View style={{ flex: 1, marginTop: 30}}>
            <ScrollView 
            
            style={{ flex: 1 }}
            >
            <Card>
                {this.state.images.map((photo, index) => 
                <CardSection key={index }>
                      <Image key={index } style={{width: 200, height: 150}}
                        source={{uri: photo.uri  || "data:image/png;base64," + (photo.base64)}} /> 
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
                onPress={() => {this.setState({isCameraOpen: true})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Slikaj{' '}
                </Text>
              </TouchableOpacity> 
          
        </View>
      );
    }

}
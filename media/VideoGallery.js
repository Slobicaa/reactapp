import React, { Component } from 'react';
import SingleVideo from './SingleVideo';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, Card, CardSection, Input, Spinner} from '../common';
import Camera from './Camera'
import axios from 'axios'
import VideoRecorder from './VideoRecoder';
export default class VideoGallery extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    videos: [],
    isCameraOpen: false
  };
  addVideo(v){
    const x = this.state.videos
    x.push(v)
    this.setState({videos: x, isCameraOpen:false})
  }
  closeCamera() {
    this.setState({isCameraOpen: false})
  }
  deleteVideo(video) {
    axios.delete(`http://192.168.43.138:8081/MyFileService/files/${video.name}/`)
    const niz = this.state.videos
    const index = niz.indexOf(video)
    delete niz[index]
    this.setState({videos: niz})
  }
 
  componentDidMount() {
    axios.get('http://192.168.43.138:8081/MyFileService/categories/video/')
    .then(response => response.data)
    .then(data => {
        const array = []
        const promises = []
data.forEach((video) => {
    promises.push(axios.get(video.fileLink)
        .then(response => response.data)
        .then(res => array.push({base64: res.content, name: res.filename}))
        .catch(error => {
            console.log(error)
            
        })
    )
})
Promise.all(promises)
    .then( () => {
this.setState({videos: array})
    })

    })
}

  render() {
      const didBlurSub = this.props.navigation.addListener("willBlur", ()=> this.setState({isCameraOpen:false}))
      if(this.state.isCameraOpen) return <VideoRecorder closeCamera={this.closeCamera.bind(this)} addVideo={this.addVideo.bind(this)}/>
      else return (
        <View style={{ flex: 1, marginTop: 30}}>
            <ScrollView 
            
            style={{ flex: 1 }}
            >
            <Card>
                {this.state.videos.map((video, index) => 
                
                      <SingleVideo key={Math.random()} data={video} deleteVideo={this.deleteVideo.bind(this)}/>

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
                onPress={() => {this.setState({isCameraOpen: true})}} >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                  {' '}Snimi video{' '}
                </Text>
              </TouchableOpacity> 
          
        </View>
      );
    }

}
import React from 'react'
import { Video } from 'expo';
import { Card, CardSection } from '../common';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export default class SingleAudio extends React.Component {
    state= {
        isPlaying: false,
        buttonText: "Pokreni"
    }
    playOrPause(){
        this.setState( prevState => ({
            isPlaying: prevState.isPlaying ? false : true,
            buttonText: prevState.isPlaying ? "Pokreni" : "Zaustavi"
        }) )
    }
    render(){
        data = this.props.data
        return(
      <Card key={Math.random()} style={{flexDirection:'row', padding: 20, justifyContent:'space-between'}}>
        <CardSection style={{flexDirection:'column'}}> 
        <Text>{data.name}</Text>
        <Image style={{width: 150, height: 100}}
                        source= {{uri:"https://img.icons8.com/metro/420/speaker.png"}} />
        
        </CardSection>
        <Video
          source={{uri: data.uri  || "data:video/mp4;base64," + (data.base64)}}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay = {this.state.isPlaying}
          isLooping
          style={{ width: 0, height: 0 }}
        />
        
        <View>
        <TouchableOpacity
            onPress={ () => this.playOrPause()  }
            style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                //width: '100%',
                //height: 30,
                color: 'black'
            }}>
            <Text
                style={{ fontSize: 18, color: 'black' }}>
                {' ' + this.state.buttonText +' '}
            </Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity
        onPress={ () => this.props.deleteAudio(this.props.data)  }
        style={{
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            //width: '100%',
            //height: 30,
            color: 'black'
        }}>
        <Text
            style={{ fontSize: 18,  color: 'black' }}>
            {' '}Obriši{' '}
        </Text>
        </TouchableOpacity>
        </View>
      </Card>
        )
    }
}
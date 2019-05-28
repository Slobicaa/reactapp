import React from 'react'
import { Constants, Video } from 'expo';
import { Button, Card, CardSection, Input, Spinner} from '../common';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

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
      <Card key={Math.random()} style={{flexDirection:'row', justifyContent:'space-between'}}>
       {/* <CardSection> */}
        <Video
          source={{uri: data.uri  || "data:video/mp4;base64," + (data.base64)}}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay = {this.state.isPlaying}
          isLooping
          style={{ width: 250, height: 170 }}
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
       {/* </CardSection> */}
      </Card>
        )
    }
}
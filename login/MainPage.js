import React from 'react'
import { Button, Card, CardSection } from './common';
import { Text, View } from 'react-native';
//import Camera from './Camera';
navigationOptions = {
    title: 'Welcome',
  };
class MainPage extends React.Component {
    static navigationOptions = {
      title: 'Main Page',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View>
            <Card>
                <CardSection>
                    <Button onPress={() => {navigate("Picture")}} text = "Slika" />
                </CardSection>
                <CardSection>
                    <Button onPress={() => {navigate("Audio")}} text = "Аudio" />
                </CardSection>
                <CardSection>
                    <Button onPress={() => {navigate("Video")}} text = "Video" />
                </CardSection>

            </Card>
            
            
        </View>
       // <Camera/>
        
      );
      }  
    


}
export {MainPage};
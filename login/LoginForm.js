import React, { Component } from 'react';
import { Text, ImageBackground } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner} from '../common';

class LoginForm extends Component {
  constructor(props){
    super(props)
  }
    state = { email: 'vesovics@gmail.com', password: 'Proba123', error: '', loading: false };
    componentDidMount() {
      firebase.initializeApp({
          apiKey: 'AIzaSyCBCYdpSGxIUjPjNOXZcRuxK2WgN6bRPjg',
          authDomain: 'authentication-892af.firebaseapp.com',
          databaseURL: 'https://authentication-892af.firebaseio.com',
          projectId: 'authentication-892af',
          storageBucket: 'authentication-892af.appspot.com',
          messagingSenderId: '1098752011624'
       });  
    }
    onButtonPress() {
      const { email, password } = this.state;
      this.setState({ error: '', loading: true });
      const { loginCompleted } = this.props
       firebase.auth().signInWithEmailAndPassword(email, password)
         .then( () => loginCompleted() )
         .catch(() => {
           firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(() => loginCompleted())
             .catch(this.onLoginFail.bind(this));
         });
    }

    onLoginFail() {
      if (this.state.email == '')
        this.setState({ error: 'Niste uneli email', loading: false });
      else if (this.state.password == '')
        this.setState({ error: 'Niste uneli lozinku', loading: false});
      else
        this.setState({ error: 'Authentication Failed.', loading: false });
    }
    
    onLoginSuccess() {
      console.log("sucess");
      console.log(this.props.navigation);
      this.props.navigation.navigate("Main");
      this.setState({loading:false})
    }

    renderButton() {
      if (this.state.loading) {
        return <Spinner size = "small"/>;
      }

      return (
        <Button onPress={this.onButtonPress.bind(this)} text = "Uloguj se" />
        
      );
    }

    render() {
        return (
        <ImageBackground source = {require('../assets/images/pocetna.jpg')} style={{width: '100%', height: '100%'}}>
          <Card>
              <CardSection>
                <Input
                  placeholder = "user@gmail.com"
                  placeholderTextColor = "rgba(0,0,0,0.5)"
                  label = "Email" 
                  value = {this.state.email}
                  onChangeText={email => this.setState({ email })}
                  backgroundColor="transparent"
                />
              </CardSection>

              <CardSection>
                  <Input
                    secureTextEntry
                    placeholder = "abcdefg"
                    label = "Lozinka"
                    value = {this.state.password}
                    onChangeText = {password => this.setState({ password})}
                  />
              </CardSection>

              <Text style = {styles.errorTextStyle}>
                {this.state.error}
              </Text>

              <CardSection>
                {this.renderButton()}     
              </CardSection>
          </Card>
          </ImageBackground>
        );
    }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
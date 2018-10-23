import React, { Component } from "react";
import { Image, Dimensions, TouchableOpacity, Alert, TextInput } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser, login } from "../../actions/user";
import Spinner from 'react-native-loading-spinner-overlay';
import styles from "./styles";
import {URLclass} from '../lib/';

const background = require("../../../images/shadow.png");
const loginBtn = require("../../../images/btn_login@3x.png");
const signupBtn = require('../../../images/btn_signup@3x.png');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visible: false
    };
    // this.renderInput = this.renderInput.bind(this);
  }

  setUser(name) {
    this.props.setUser(name);
  }
  clickLoginBtn() {
    var login_url = URLclass.url + 'login'

    if (this.state.email == "" || this.state.password == "") {
      Alert.alert("Please enter the fields.")
    } else {

      fetch(login_url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
          })
      })

      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success == true) {
          this.setState({visible:false})
          this.props.login(responseData)
          this.props.navigation.navigate("Home")
        } else {
          var self=this
          self.setState({visible:false})

          setTimeout(function(){
            Alert.alert(responseData.error)
          }, 500);            

        }
      })

     this.setState({visible:true})
    // this.props.navigation.navigate("Home")
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            
          <Spinner visible={this.state.visible} overlayColor='rgba(0,0,0,0.3)' />

            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item regular style={{marginLeft: deviceWidth/12, marginRight: deviceWidth/12, marginBottom: deviceHeight/40}}>
                  <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={{height:deviceHeight/15, width:deviceWidth*10/12, paddingLeft:deviceWidth/30}} placeholder='Email' keyboardType = 'email-address' autoCapitalize = 'none' onChangeText={email => this.setState({ email })} />
                </Item>

                <Item regular style={{marginLeft: deviceWidth/12, marginRight: deviceWidth/12}}>
                  <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={{height:deviceHeight/15, width:deviceWidth*10/12, paddingLeft:deviceWidth/30}} placeholder='Password' secureTextEntry onChangeText={password => this.setState({ password })} />
                </Item>

                <TouchableOpacity onPress={() => this.clickLoginBtn()}>
                  <Image source={loginBtn} style={styles.loginBtnStyle} />
                </TouchableOpacity>

              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
    login: data => dispatch(login(data))
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  data: state.user.data
});
export default connect(mapStateToProps, bindAction)(Login);

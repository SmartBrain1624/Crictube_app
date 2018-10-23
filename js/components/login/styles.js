
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginBtnStyle: {
    marginTop: deviceHeight / 30,
    marginLeft: deviceWidth/12,
    marginRight: deviceWidth/12,
    width: deviceWidth*5/6,
    height: deviceWidth*5*270/6/1740,
    alignSelf: 'center'
  },
  signupBtnStyle: {
    marginTop: deviceHeight / 30,
    marginLeft: deviceWidth/12,
    marginRight: deviceWidth/12,
    width: deviceWidth*5/6,
    height: deviceWidth*5*270/6/1740,
    alignSelf: 'center'
  },
};

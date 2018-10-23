
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {
  headerLeft: {
    flex: 1
  },
  headerRight:{
    flex: 1
  },
  headerBody: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center'
    // backgroundColor: '#777',
  },
  tabContainer: {
    width: deviceWidth/5*3,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // backgroundColor: '#FBFAFA',
  },
  tabView: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'green',
    // marginRight: 5,
  },
  tabItem: {
    // fontSize: 10,
    marginTop: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  underlineActive: {
    position: 'absolute',
    alignItems: 'center',
    width: deviceWidth/12,
    height: 3,
    backgroundColor: '#FFFFFF',
    marginTop: 45,
  },
  textStyle: {
    color: '#7d7f89',
    fontSize: 15,
    fontWeight: '600',

  },
  videoPlayBtn: {
    position: 'absolute',
    width: deviceWidth,
    height:deviceWidth/2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayIcon:{
    width: deviceWidth/6,
    height: deviceWidth/6,
    borderRadius: 50,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderColor: '#676767',
    borderWidth: 1,
  },
  movieItemTitle: {
    position: 'absolute',
    top: 5,
    left: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  movieItemDuration: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    fontStyle: 'italic',
  },
  container: {
    backgroundColor: '#FBFAFA',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
};

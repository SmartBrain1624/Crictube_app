
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default{
  backgroundVideo: {
    backgroundColor: '#FBFAFA',
    width: deviceWidth,
    height: deviceHeight/3,
  },
  container: {
    backgroundColor: '#FBFAFA',
    width: deviceWidth,
    height: deviceHeight/3,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 3,
    backgroundColor: '#dd0000',
  },
  innerProgressRemaining: {
    height: 3,
    backgroundColor: '#fff',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 8,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  commentHeader: {
  	flex:1,
  	marginLeft: 10,
  	marginTop: 20,
  	marginBottom: 20,

  },
  commentHeaderText: {
  	color: '#acacac',
  	position: 'absolute',
  	backgroundColor: '#e9e9ef',
  	marginTop: -5,
  	fontWeight: 'bold',
  },
  commentHeaderLine: {
  	height: 1,
  	backgroundColor: '#acacac',
  	marginTop: 10,
  },
  relatedVideoImage: {

  },
  relatedVideoDuration: {
    position:'absolute',
    right: 10,
    bottom: 5,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth/15,
    height: deviceWidth/15,
    overflow: 'hidden',
  },
  valueBottomText: {
    color: '#7d7f89',
    fontSize: 14,
    fontWeight: '600',
  },
  valueText: {
    color: '#7d7f89',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 1
  },
  userIcon: {
  	// backgroundColor:'#454443',
  	width: deviceWidth/10*1.5,
  	height: deviceWidth/10*1.5,
  	borderRadius: 30,
  },
  recommendHeaderText: {
  	marginTop: deviceWidth/110,
  	color: '#acacac',
  	fontWeight: 'bold',
  },
  recommendBodyText: {
  	fontSize: 18,
    color: '#454545',
    fontWeight: 'bold',
  },
  footerStyle: {
  	paddingLeft: 10,
  	paddingTop: deviceWidth/40,
  	backgroundColor: '#e9e9ef',
  },
  inputStyle: {
  	backgroundColor: '#e0e0e0',
  	borderRadius: 30,
    fontWeight: 'bold',
  	paddingLeft: 5,
  	fontSize: 15,
  },
  input_wrapper: {
  	backgroundColor: '#000',
  	borderRadius: 20,
  	width: 50,
  	height: 10,
  },
  footerIconWrapper: {
  	width: deviceWidth/10,
  	height: deviceWidth/10,
  	borderRadius: 30,
  	backgroundColor: '#aaabaf',
  	paddingTop: deviceWidth/50,
  	alignItems:'center',
  	marginRight: deviceWidth/80,

  },	
  footerIconStyle: {
  	// backgroundColor: '#aaabaf',
  	width: deviceWidth/17,
  	height: deviceWidth/17,
  	// borderRadius: 30,
  }
};

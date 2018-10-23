'use strict';

import React, { Component } from "react";
import { TouchableOpacity, Dimensions, View, ViewPropTypes, Image, Alert , TextInput} from "react-native";
import { URLclass } from '../lib/';
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  Input,
  Left,
  Right,
  Body,
  Tabs,
  Tab,
} from "native-base";
import { MovieInfo, MovieComment, AddMovieComment } from "../../actions/user";
// import { Switch } from 'react-native-switch';
import Spinner from 'react-native-loading-spinner-overlay';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import ToggleSwitch from 'toggle-switch-react-native';
import styles from './styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class BlankPage2 extends React.Component {
  static navigationOptions = {
    header: null
  };

  
  constructor(props) {
    
    super(props);
    this.state = {
      visible: false,
      movie_id: '0',
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      url: '',
      title: '',
      duration: 0.0,
      currentTime: 0.0,
      paused: false,
      comment_name: '',
      comment_text: '',
      movies_list: [
        {
          image: require("../../../images/image2.png"),
          duration: '10:56',
          text: 'When maa falls ill | The Timeliners',
          visits: 191,
        },
        {
          image: require("../../../images/image2.png"),
          duration: '5:05',
          text: "When Your Roomiee's Parents Visit You | The Timeliners",
          visits: 191,
        },
        {
          image: require("../../../images/image2.png"),
          duration: '5:05',
          text: "When Your Roomiee's Parents Visit You | The Timeliners",
          visits: 191,
        },
        {
          image: require("../../../images/image2.png"),
          duration: '10:56',
          text: 'When maa falls ill | The Timeliners',
          visits: 191,
        },
      ],
      comment_list: [
        {
          name: 'Ali',
          time: '10',
          text: 'video he kha pr',
          recommend: '5'
        },
        {
          name: 'Jamura',
          time: '6',
          text: 'kutti kutti',
          recommend: '3'
        },
      ]
    };
    this.clickSendBtn=this.clickSendBtn.bind(this);
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : 0;
    {this.setState({movie_id: itemId})}
    // {this.get_movie(itemId)}
  }
  get_movie(movie_id){
    var url=URLclass.url + 'get_movie/' + movie_id;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Token': this.props.login_data.token
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('responseData===', responseData)
      if (responseData.success == true) {
        this.setState({visible:false})
        this.setState({url: responseData.movie.url});
        this.setState({title: responseData.movie.title});
        this.setState({duration: responseData.movie.duration});
        this.setState({comment_list: responseData.movie_comment});
        this.props.MovieInfo(responseData.movie);
        this.props.MovieComment(responseData.movie_comment);

      } else {
        var self=this
        self.setState({visible:false})
        setTimeout(function(){
          Alert.alert(responseData.errorMessage)
        }, 500);

      }
    })
    this.setState({visible:true})
  }

  clickSendBtn() {
    console.log('movie_id===', this.state.movie_id)
    var send_url = URLclass.url + 'add_comment';

    if (this.state.comment_name == "" || this.state.comment_text == "") {
      Alert.alert("Please enter the Component fields.")
    } else {

      fetch(send_url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              // 'Access-Token': this.props.login_data.token,
          },
          body: JSON.stringify({
              movie_id: this.state.movie_id,
              name: this.state.comment_name,
              text: this.state.comment_text,
          })
      })

      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.success == true) {
          this.setState({visible:false})
          var temp = {
            name: this.state.comment_name,
            time: '0',
            text: this.state.comment_text,
            recommend: 0,
          }
          // var temp_array = this.state.comment_list;
          // temp_array.push(temp)
          // this.setState({comment_list: temp_array})
          this.props.AddMovieComment(temp);
          console.log('comment_list=======', this.props.comment_list);
          this.setState({comment_name: ''})
          this.setState({comment_text: ''})
          // this.props.login(responseData)
          // this.props.navigation.navigate("Home")
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
  showLatest_movies() {
    var i=-1;
    return this.state.movies_list.map((data) => {
      i++;
      return (
        <Child_related_movies key={i} itemData={data} index={i} selectMovie={this.Do_Select_Movie} />
      )
    })
  }

  showLatest_comments() {
    var i=-1;
    return this.props.comment_list.map((data) => {
      i++;
      return (
        <Child_latest_comments key={i} itemData={data} index={i} selectComment={this.Do_Select_Movie} />
      )
    })
  }

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    // <VideoPlayer
        // source={{ uri: this.props.movie_info.url }}
        // style={styles.fullscre}
        // navigator={ this.props.navigator }
    // />
    return (
      <Container>
        <Spinner visible={this.state.visible} overlayColor='rgba(0,0,0,0.3)' />
        <Content>
          <View>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.fullScreen}
                onPress={() => this.setState({ paused: !this.state.paused })}
              >
                <Video
                  ref={(ref: Video) => { this.video = ref }}
                  /* For ExoPlayer */
                  // source={{ uri: this.props.movie_info.url }}
                  source={require('./oceans.mp4')}
                  style={styles.fullScreen}
                  rate={this.state.rate}
                  paused={this.state.paused}
                  volume={this.state.volume}
                  muted={this.state.muted}
                  resizeMode={this.state.resizeMode}
                  onLoad={this.onLoad}
                  onProgress={this.onProgress}
                  onEnd={this.onEnd}
                  onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                  onAudioFocusChanged={this.onAudioFocusChanged}
                  repeat={false}
                />
              </TouchableOpacity>

              <View style={styles.controls}>
                

                <View style={styles.trackingControls}>
                  <View style={styles.progress}>
                    <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                    <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{margin:10}}>
              <Text style={{color:'black', fontSize:17, fontWeight:'600'}}>{this.props.movie_info.title}</Text>
            </View>
            <View style={{margin:10, marginTop:-5}}>
              <Text style={{color:'#515151', fontSize:12, fontWeight:'600'}}>#{this.props.movie_info.description}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin: deviceHeight/50, alignItems:'center'}}>
              <View style={{ alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/view_icon.png")} style={{width:deviceWidth/15, height:deviceWidth/15*0.66, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>{this.props.movie_info.view_number}</Text>
              </View>
              <View style={{alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/heart_icon.png")} style={{width:deviceWidth/18, height:deviceWidth/18*0.91, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>{this.props.movie_info.like_number}</Text>
              </View>
              <View style={{alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/chat_icon.png")} style={{width:deviceWidth/16, height:deviceWidth/16*0.93, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>{this.props.movie_info.chat_number}</Text>
              </View>
              <View style={{ alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/phone_icon.png")} style={{width:deviceWidth/19, height:deviceWidth/19, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>218k</Text>
              </View>
              <View style={{alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/facebook_icon.png")} style={{width:deviceWidth/18, height:deviceWidth/18, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>218k</Text>
              </View>
              <View style={{alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/share_icon.png")} style={{width:deviceWidth/16, height:deviceWidth/16*0.81, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>218k</Text>
              </View>
              <View style={{ alignItems:'center'}}>
                <View style={styles.iconWrapper}>
                  <Image source={require("../../../images/download_icon.png")} style={{width:deviceWidth/18, height:deviceWidth/18*1.03, marginRight:5}} />
                </View>
                <Text style={styles.valueBottomText}>218k</Text>
              </View>
            </View>
          </View>

          <View style={{backgroundColor:'#acacac', height:1, marginBottom:deviceHeight/30}} />

          <View style={{flexDirection:'row', justifyContent:'space-between', margin:10}}>
            <Text style={{color: '#aaa', fontWeight: 'bold', fontSize: 16}}>RELATED VIDEOS</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={{marginRight:5,color: '#454545',fontWeight: 'bold'}}>Autoplay</Text>
              <ToggleSwitch
                  isOn={false}
                  onColor='green'
                  offColor='#acacac'
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size='small'
                  onToggle={ (isOn) => console.log('changed to : ', isOn) }
              />
            </View>
          </View>

          {this.showLatest_movies()}
          <View style={styles.commentHeader}>
            <View style={styles.commentHeaderLine}/>
            <Text style={styles.commentHeaderText}>Latest Comments </Text>
          </View>
          {this.showLatest_comments()}
        </Content>
        <Footer style={styles.footerStyle}>
          <View style={{width: deviceWidth/20*5, height: deviceWidth/10*1.1, marginRight: deviceWidth/80}}>
            <Input style={styles.inputStyle} value={this.state.comment_name} placeholder={'Type Name'} onChangeText={name => this.setState({comment_name: name })} />
          </View>
          <View style={{width: deviceWidth/20*9, height: deviceWidth/10*1.1}}>
            <Input style={styles.inputStyle} value={this.state.comment_text} placeholder={'Write Comment Here'} onChangeText={text => this.setState({ comment_text: text })} />
          </View>
          <View style={{flexDirection: 'row',width: deviceWidth/20*5, height: deviceWidth/10*1.2, marginLeft: 5}}>
            <TouchableOpacity style={styles.footerIconWrapper} onPress={() => this.clickSendBtn()}>
              <Image source={require("../../../images/send.png")} style={styles.footerIconStyle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerIconWrapper}>
              <Image source={require("../../../images/share.png")} style={styles.footerIconStyle} />
            </TouchableOpacity>
          </View>
        </Footer>
      </Container>
    );
  }
}

// export default BlankPage2;

function bindAction(dispatch) {
  return {
    MovieInfo: data => dispatch(MovieInfo(data)),
    MovieComment: data => dispatch(MovieComment(data)),
    AddMovieComment: data => dispatch(AddMovieComment(data)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  login_data: state.user.login_data,
  movie_info: state.user.movie_info,
  comment_list: state.user.comment_list,
});
export default connect(mapStateToProps, bindAction)(BlankPage2);

class Child_related_movies extends Component {
  constructor(props) {
      super(props);
  }

  testFunction(i) {
    this.props.selectComment(i)
  }

  render() {
    return (
      <View style={{flexDirection:'row', margin:10}}>
        <TouchableOpacity style={styles.relatedVideoImage}>
          <Image source={this.props.itemData.image} style={{width:deviceWidth/2.5, height:deviceWidth/2/2, marginRight:5}} />
          <Text style={styles.relatedVideoDuration}>
            {this.props.itemData.duration}
          </Text>
        </TouchableOpacity>
        <View style={{width:deviceWidth/2, marginLeft:10}}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#222'}}>{this.props.itemData.text}</Text>
          <View style={{flexDirection:'row'}}>
            <Image source={require("../../../images/view_icon.png")} style={{width:deviceWidth/15, height:deviceWidth/15*0.66, marginRight:5, marginTop:3}} />
            <Text style={styles.valueText}>{this.props.itemData.visits}k</Text>
          </View>
        </View>


        <View style={{backgroundColor:'#acacac', height:1, marginBottom:5}} />
      </View>
    );
  }
} 
class Child_latest_comments extends Component {
  constructor(props) {
      super(props);
  }

  testFunction(i) {
    this.props.selectMovie(i)
  }

  render() {
    return (
      <View style={{flexDirection:'row', margin:10}}>
        <TouchableOpacity>
          <Image source={require("../../../images/user1.png")} style={styles.userIcon} />
        </TouchableOpacity>
        <View style={{width:deviceWidth/10*6, marginLeft: 10}}>
          <Text style={styles.recommendHeaderText}>{this.props.itemData.name} . {this.props.itemData.time} h</Text>
          <Text style={styles.recommendBodyText}>{this.props.itemData.text}</Text>
        </View>
        <View style={{width:deviceWidth/10*2.5, flexDirection:'row',alignItems: 'center'}}>
          <Image source={require("../../../images/recommend.png")} style={{width:deviceWidth/10, height:deviceWidth/10, marginRight:5}} />
          <Text>{this.props.itemData.recommend}</Text>
        </View>

        <View style={{backgroundColor:'#acacac', height:1, marginBottom:5}} />
      </View>
    );
  }
} 
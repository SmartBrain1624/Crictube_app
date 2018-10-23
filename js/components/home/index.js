import React, { Component } from "react";
import { TouchableOpacity, Dimensions, View, Image, Alert } from "react-native";
import { connect } from "react-redux";
import { URLclass } from '../lib/';
import BlankPage from '../blankPage';
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { StackNavigator, DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right, Tab, Tabs,
} from "native-base";
import { setUser, MovieList } from "../../actions/user";

import Spinner from 'react-native-loading-spinner-overlay';
import { Grid, Row } from "react-native-easy-grid";
import { setIndex } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      movies_list: [
        {
          id: 1,
          image: require("../../../images/image.png"),
          title: 'Movie Title1',
          duration: "00:59",
          view_number:657,
          like_number: 654,
          chat_number: 254,
          share_number: 127
        },
        {
          id: 2,
          image: require("../../../images/image2.png"),
          title: 'Movie Title2',
          duration: "02:13",
          view_number:657,
          like_number: 654,
          chat_number: 254,
          share_number: 127
        },
        {
          id: 3,
          image: require("../../../images/image3.png"),
          title: 'Movie Title3',
          duration: "00:59",
          view_number:657,
          like_number: 654,
          chat_number: 254,
          share_number: 127
        },
        {
          id: 4,
          image: require("../../../images/image.png"),
          title: 'Movie Title4',
          duration: "00:59",
          view_number:657,
          like_number: 654,
          chat_number: 254,
          share_number: 127
        }
      ],
      tabIndex: 1,
    };
    this.Do_Select_Movie=this.Do_Select_Movie.bind(this);
  }

  componentWillMount() {
    if (this.props.movie_list.length == 0) {
      // {this.api_temp()}  
    }
  }
  api_temp () {
    var url=URLclass.url + 'get_all_movies';
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Token': this.props.login_data.token
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('responseData===', responseData)
      if (responseData.success == true) {
        this.setState({visible:false})
        this.props.MovieList(responseData.movie_list)
        this.setState({movies_list: responseData.movie_list});
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

  Do_Select_Movie(_counterFromChild) {
    var url=URLclass.url + 'increase_view_number/' + _counterFromChild;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Access-Token': this.props.login_data.token
        }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success == true) {
      } else {
      }
    })
    this.props.navigation.navigate("MovieDetail", {itemId: _counterFromChild})
  }

  showLatest_movies() {
    var i=-1;
    // return this.props.movie_list.map((data) => {
    return this.state.movies_list.map((data) => {
      i++;
      return (
        <Child_latest key={i} itemData={data} index={data.id} selectMovie={this.Do_Select_Movie} />
      )
    })
  }

  showLatest() {
    if (this.state.tabIndex == 1) {
      return(
        this.showLatest_movies()
      )
    }
  }

  render() {
    console.log(DrawNav, "786785786");
    return (
      <Container style={styles.container}>
        <Spinner visible={this.state.visible} overlayColor='rgba(0,0,0,0.3)' />
        <Header style={{backgroundColor:'#00cc75'}}>
          <Left style={styles.headerLeft}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Left>

          <Body style={styles.headerBody}>
            <View style={styles.tabContainer}>
              <View >
                <TouchableOpacity style={styles.tabView} onPress={()=> this.setState({tabIndex: 1})}>
                  <Text style={styles.tabItem}>
                    Latest
                  </Text>
                  {this.state.tabIndex == 1 ? <View style={styles.underlineActive} /> : null}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.tabView} onPress={()=> this.setState({tabIndex: 2})}>
                  <Text style={styles.tabItem}>
                    Trending
                  </Text>
                  {this.state.tabIndex == 2 ? <View style={styles.underlineActive} /> : null}
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.tabView} onPress={()=> this.setState({tabIndex: 3})}>
                  <Text style={styles.tabItem}>
                    Special
                  </Text>
                  {this.state.tabIndex == 3 ? <View style={styles.underlineActive} /> : null}
                </TouchableOpacity>
              </View>
            </View>
          </Body>

          <Right style={styles.headerRight}>
            <Button
              transparent
            >
              <Icon active name="search" />
            </Button>
          </Right>

        </Header>
        <Content>
          {this.showLatest()}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    MovieList: data => dispatch(MovieList(data)),
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  login_data: state.user.login_data,
  movie_list: state.user.movie_list,
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const HomeStack = StackNavigator({
  Latest: {screen: HomeSwagger},
  Trending: {screen: BlankPage},
  Special: {screen: BlankPage},
});
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeStack },
    MovieDetail: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;



class Child_latest extends Component {
  constructor(props) {
      super(props);
  }

  testFunction(i) {
    this.props.selectMovie(i)
  }

  render() {
    return (
      <View>
        <View style={{backgroundColor:'#eeeeee', height: deviceWidth/60}} />
        <TouchableOpacity onPress={() => this.testFunction(this.props.index)}>
          <Image source={require("../../../images/image.png")} style={{width:deviceWidth, height:deviceWidth/2, marginRight:5}} />
          <View style={styles.videoPlayBtn}>
            <View style={styles.videoPlayIcon}>
              <Image source={require("../../../images/play3.png")} style={{width: deviceWidth/6, height: deviceWidth/6}} />
            </View>
          </View>
          <Text style={styles.movieItemTitle}>
            {this.props.itemData.title}
          </Text>
          <Text style={styles.movieItemDuration}>
            {this.props.itemData.duration}
          </Text>
        </TouchableOpacity>

        <View style={{flex: 1, flexDirection:'row', justifyContent:'space-between', margin: deviceHeight/50}}>
          <View style={{flexDirection:'row', alignItems:'center', width: deviceWidth/10*3}}>
            <Image source={require("../../../images/view_icon.png")} style={{width:deviceWidth/15, height:deviceWidth/15*0.66, marginRight:5}} />
            <Text style={styles.textStyle}>{this.props.itemData.view_number}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width: deviceWidth/10*2}}>
            <Image source={require("../../../images/heart_icon.png")} style={{width:deviceWidth/18, height:deviceWidth/18*0.91, marginRight:5}} />
            <Text style={styles.textStyle}>{this.props.itemData.like_number}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width: deviceWidth/10*2}}>
            <Image source={require("../../../images/chat_icon.png")} style={{width:deviceWidth/16, height:deviceWidth/16*0.93, marginRight:5}} />
            <Text style={styles.textStyle}>{this.props.itemData.chat_number}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width: deviceWidth/10*2}}>
            <Image source={require("../../../images/share_icon.png")} style={{width:deviceWidth/16, height:deviceWidth/16*0.81, marginRight:5}} />
            <Text style={styles.textStyle}>{this.props.itemData.share_number}</Text>
          </View>
        </View>
      </View>
    );
  }
} 
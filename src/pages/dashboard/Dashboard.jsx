import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: this.$router.params.name,
      loginLog: []
    }
  }
  componentDidMount() {
    Taro.request({
      url: 'http://localhost:8080/student/dashboard?name='+this.state.username,
    }).then(res=>{
      for (var i = 0; i < res.data.data.length; i++) {
        var date = res.data.data[i].logintime.split("T")[0];
        var time = res.data.data[i].logintime.split("T")[1];
        this.state.loginLog.push(date + " " + time.substr(0, 8));
        this.setState({
          loginLog: this.state.loginLog
        })
      }
    })
  }

  render() {
    return (
      <View>
        <View>{this.state.username}</View>
        <View>历史登录记录</View>
        <View>{this.state.loginLog.map((item, index) => {
          return <View key={index}>
            <Text>{item}</Text>
          </View>
        })
      }</View>
      </View>
    );
  }
}

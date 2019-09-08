import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  };

  constructor() {
    super(...arguments);
    this.state = {
      username: '',
      password: ''
    }
  }

  setUsername(e) {
    this.setState({
      username: e.detail.value
    })
  }

  setPassword(e) {
    this.setState({
      password: e.detail.value
    })
  }


  login() {
    Taro.request({
      url: 'http://localhost:8080/student/login',
      header: {
        'content-type': 'application/json'
      },
      method:"POST",
      data: {
        'username':this.state.username,
        'password':this.state.password
      }
    }).then(res=>{
      if (res.data.status === "success") { // 登录成功
        alert(res.data.data);
        Taro.navigateTo({
          url: '/pages/dashboard/dashboard' + "?name=" + this.state.username
        })
      } else { // 登录失败
        alert(res.data.data.errMsg)
      }
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>登录啦~</Text>
        <Input onInput={this.setUsername.bind(this)} placeholder={"请输入你的名字"} value={this.state.username}/>
        <Text />
        <Input onInput={this.setPassword.bind(this)} placeholder={"请输入你的密码"} value={this.state.password}/>
        <Button size={"mini"}  onClick={this.login.bind(this)}>登录</Button>
      </View>
    )
  }
}

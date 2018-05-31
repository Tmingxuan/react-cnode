import React, { Component } from 'react'
import axios from 'axios'
class User extends Component {
  state = {
    userInfo: null
  }
  componentDidMount() {
    const { username } = this.props.match.params
    const uri = `https://cnodejs.org/api/v1/user/${username}`
    axios
      .get(uri)
      .then(res => {
        this.setState({
          userInfo: res.data.data
        })
      })
      .catch(err => {
        this.setState({
          userInfo: 'nouser'
        })
      })
  }

  render() {
    const { userInfo } = this.state
    const userContent = !userInfo ? (
      '请稍等'
    ) : userInfo === 'nouser' ? (
      '用户名不存在'
    ) : (
      <div>{userInfo.loginname}</div>
    )
    return <div>{userContent}</div>
  }
}

export default User

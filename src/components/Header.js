import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
class Header extends Component {
  state = {
    text: '9948d556-1825-416f-934f-b3ce046403e3',
    userInfo: null
  }
  componentDidMount() {
    const accesstoken = sessionStorage.accesstoken
    if (accesstoken) {
      const uri = 'https://cnodejs.org/api/v1/accesstoken'
      axios.post(uri, { accesstoken: accesstoken }).then(res => {
        this.setState({ userInfo: res.data })
      })
    }
  }
  handelInput = e => {
    this.setState({
      text: e.target.value
    })
  }
  handelLogin = () => {
    const { text } = this.state
    if (text.trim()) {
      const uri = 'https://cnodejs.org/api/v1/accesstoken'
      axios
        .post(uri, { accesstoken: text })
        .then(res => {
          console.log(res.data)
          sessionStorage.accesstoken = text
          sessionStorage.loginname = res.data.loginname
          this.setState({
            text: '',
            userInfo: res.data
          })
        })
        .catch(err => {
          alert('密码错误')
        })
    }
  }
  handelLogout = () => {
    this.setState({
      userInfo: null
    })
    sessionStorage.removeItem('accesstoken')
    sessionStorage.removeItem('loginname')
  }
  render() {
    const { text, userInfo } = this.state
    return (
      <Head>
        <Link to="/">
          <img
            style={{ width: '150px', marginLeft: '20px' }}
            src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg"
            alt=""
          />
        </Link>
        {userInfo ? (
          <div>
            <img style={{ width: '50px' }} src={userInfo.avatar_url} alt="" />
            <span onClick={this.handelLogout}>退出</span>
            <Link to="/topic/create">发布话题</Link>
          </div>
        ) : (
          <div>
            <input type="text" value={text} onChange={this.handelInput} />
            <span onClick={this.handelLogin}>登录</span>
          </div>
        )}
      </Head>
    )
  }
}

export default Header

const Head = styled.header`
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`

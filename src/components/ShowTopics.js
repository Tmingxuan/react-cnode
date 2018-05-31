import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class ShowTopics extends Component {
  state = {
    topics: []
  }
  getTopics = tab => {
    const uri = `https://cnodejs.org/api/v1/topics?tab=${tab}`
    axios.get(uri).then(res => {
      this.setState({ topics: res.data.data })
    })
  }
  componentDidMount() {
    const { tab } = this.props
    this.getTopics(tab)
  }
  // 组件将要 改变 props 的时候 下面的生命周期函数将会被触发 ××× 在这个函数内 nextProps 是将要被更新的 props
  componentWillReceiveProps(nextProps) {
    const { tab } = nextProps
    this.getTopics(tab)
  }

  getTab = tab => {
    switch (tab) {
      case 'ask':
        return '问答'
      case 'share':
        return '分享'
      case 'job':
        return '招聘'
      default:
        return null
    }
  }
  render() {
    const { topics } = this.state
    console.log(topics)
    const goodStyle = { color: '#fff', backgroundColor: '#80bd01' }
    const badStyle = { color: '#000', backgroundColor: '#ccc' }
    const topicList =
      topics.length === 0
        ? '请稍等'
        : topics.map(topic => (
            <List key={topic.id}>
              <Link to={`/user/${topic.author.loginname}`}>
                <img src={topic.author.avatar_url} alt="" />
              </Link>
              <div style={{ width: '70px', textAlign: 'center' }}>
                <span title="回复数">{topic.reply_count}</span>
                <span>/</span>
                <span title="浏览量">{topic.visit_count}</span>
              </div>
              <Btn style={topic.top || topic.good ? goodStyle : badStyle}>
                {topic.top
                  ? '置顶'
                  : topic.good
                    ? '精华'
                    : this.getTab(topic.tab)}
              </Btn>
              <h3>
                <Link
                  to={{
                    pathname: `/topic/${topic.id}`
                    // state: topics.find(t => t.id === topic.id)
                  }}
                >
                  {topic.title}
                </Link>
              </h3>
            </List>
          ))
    return <Wrapper>{topicList}</Wrapper>
  }
}

export default ShowTopics

const Wrapper = styled.div`
  background-color: #f7f6f6;
  border-radius: 10px;
  margin-top: 15px;
`
const List = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  h3 {
    margin: 0;
    font-weight: normal;
    font-size: 16px;
    margin: 0 10px;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span {
    font-size: 14px;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  h3 a {
    color: #000;
  }
  h3 a:visited {
    color: #ccc;
  }
  h3 a:hover {
    text-decoration: underline;
  }
`

const Btn = styled.span`
  font-size: 14px;
  flex-shrink: 0;
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  color: #fff;
  margin-left: 5px;
`

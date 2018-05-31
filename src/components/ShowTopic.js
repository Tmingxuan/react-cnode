import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
class ShowTopic extends Component {
  state = {
    topic: null,
    collects: [],
    is_collect: false,
    comment: ''
  }
  getTopic = () => {
    const { id } = this.props.match.params
    const { accesstoken } = sessionStorage
    const params = accesstoken ? `?accesstoken=${accesstoken}` : ''
    const uri = `https://cnodejs.org/api/v1/topic/${id}${params}`
    axios.get(uri).then(res => {
      this.setState({
        topic: res.data.data,
        is_collect: accesstoken ? res.data.data.is_collect : false
      })
    })
  }
  componentDidMount() {
    this.getTopic()
    // const { loginname } = sessionStorage
    // const uri1 = `https://cnodejs.org/api/v1/topic_collect/${loginname}`
    // axios.get(uri1).then(res => {
    //   this.setState({
    //     collects: res.data.data
    //   })
    // })
  }
  handelCollect = topic_id => {
    // const { collects } = this.state
    // if (collects.find(t => t.id === topic_id)) {
    //   const uri = `https://cnodejs.org/api/v1/topic_collect/de_collect`
    //   axios
    //     .post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
    //     .then(res => {
    //       this.setState({
    //         collects: collects.filter(t => t.id !== topic_id)
    //       })
    //     })
    // } else {
    //   alert('none')
    //   const uri = `https://cnodejs.org/api/v1/topic_collect/collect `
    //   axios
    //     .post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
    //     .then(res => {
    //       console.log(res.data)
    //       const { loginname } = sessionStorage
    //       const uri1 = `https://cnodejs.org/api/v1/topic_collect/${loginname}`
    //       axios.get(uri1).then(res => {
    //         this.setState({
    //           collects: res.data.data
    //         })
    //       })
    //     })
    // }
    if (sessionStorage.accesstoken) {
      const { is_collect } = this.state
      const uriLast = is_collect ? 'de_collect' : 'collect'
      const uri = `https://cnodejs.org/api/v1/topic_collect/${uriLast}`
      axios
        .post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
        .then(res => {
          this.setState({
            is_collect: !is_collect
          })
        })
      // if (is_collect) {
      //   const uri = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
      //   axios
      //     .post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
      //     .then(res => {
      //       this.setState({
      //         is_collect: false
      //       })
      //     })
      // } else {
      //   const uri = 'https://cnodejs.org/api/v1/topic_collect/collect'
      //   axios
      //     .post(uri, { accesstoken: sessionStorage.accesstoken, topic_id })
      //     .then(res => {
      //       this.setState({
      //         is_collect: true
      //       })
      //     })
      // }
    }
  }

  handelComment = e => {
    this.setState({
      comment: e.target.value
    })
  }
  addComment = id => {
    const { comment } = this.state
    const uri = `https://cnodejs.org/api/v1/topic/${id}/replies`
    axios
      .post(uri, { accesstoken: sessionStorage.accesstoken, content: comment })
      .then(res => {
        this.setState({
          comment: ''
        })
        this.getTopic()
      })
  }
  handelUp = id => {
    const uri = `https://cnodejs.org/api/v1/reply/${id}/ups`
    axios.post(uri, { accesstoken: sessionStorage.accesstoken }).then(res => {
      this.getTopic()
    })
  }
  render() {
    const { topic, collects, is_collect, comment } = this.state
    console.log(topic)
    const content = !topic ? (
      '请稍等'
    ) : (
      <div>
        {topic.top ? (
          <button>置顶</button>
        ) : topic.good ? (
          <button>精华</button>
        ) : (
          ''
        )}
        <h2>{topic.title}</h2>
        <p>
          ·作者{topic.author.loginname} ·浏览量{topic.visit_count}
        </p>
        {/* <button onClick={() => this.handelCollect(topic.id)}>
          {collects.find(t => t.id === topic.id) ? '取消收藏' : '收藏'}
        </button> */}
        <button onClick={() => this.handelCollect(topic.id)}>
          {is_collect ? '取消收藏' : '收藏'}
        </button>
        <hr />
        <Content dangerouslySetInnerHTML={{ __html: topic.content }} />
      </div>
    )
    const replayList = !topic ? (
      '请稍等'
    ) : (
      <div>
        {topic.replies.length === 0
          ? '评论为空'
          : topic.replies.map(reply => (
              <div key={reply.id}>
                <Link to={`/user/${reply.author.loginname}`}>
                  <img
                    style={{ width: '30px' }}
                    src={reply.author.avatar_url}
                    alt=""
                  />
                </Link>
                <span>{reply.author.loginname}</span>
                <p dangerouslySetInnerHTML={{ __html: reply.content }} />
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handelUp(reply.id)}
                >
                  赞{reply.ups.length}
                </span>
              </div>
            ))}
      </div>
    )
    return (
      <div>
        {content}
        <div>
          <div>回复</div>
          {replayList}
        </div>
        {sessionStorage.accesstoken ? (
          <div>
            <h4>添加回复</h4>
            <textarea value={comment} onChange={this.handelComment} />
            <button onClick={() => this.addComment(topic.id)}>回复</button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default ShowTopic

const Content = styled.div`
  img {
    width: 80%;
  }
  p {
    line-height: 30px;
  }
`

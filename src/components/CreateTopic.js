import React, { Component } from 'react'
import axios from 'axios'
class CreateTopic extends Component {
  state = {
    title: '',
    content: ''
  }
  handelChange = (text, e) => {
    this.setState({
      [text]: e.target.value
    })
  }
  handelSubmit = () => {
    const { title, content } = this.state
    if (title.trim().length >= 7 && content.trim()) {
      const contentObj = {
        accesstoken: sessionStorage.accesstoken,
        title,
        content,
        tab: 'dev'
      }
      const uri = 'https://cnodejs.org/api/v1/topics'
      axios.post(uri, contentObj).then(res => {
        this.setState({
          title: '',
          content: ''
        })
        this.props.history.push(`/topic/${res.data.topic_id}`)
      })
    } else {
      alert('输入不正确')
    }
  }
  render() {
    const { title, content } = this.state
    console.log('title---', title, 'content---', content)
    return (
      <div>
        <input
          type="text"
          value={title}
          onChange={e => this.handelChange('title', e)}
        />
        <textarea
          value={content}
          onChange={e => this.handelChange('content', e)}
        />
        <button onClick={this.handelSubmit}>提交</button>
      </div>
    )
  }
}

export default CreateTopic

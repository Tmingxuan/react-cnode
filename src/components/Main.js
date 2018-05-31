import React, { Component } from 'react'
import styled from 'styled-components'
import ShowTopics from './ShowTopics'
class Main extends Component {
  state = {
    tab: 'all'
  }
  handelTab = tab => {
    console.log(tab)
    this.setState({
      tab: tab
    })
  }
  render() {
    const tabs = [
      { tab: 'all', tabText: '全部' },
      { tab: 'good', tabText: '精华' },
      { tab: 'share', tabText: '分享' },
      { tab: 'ask', tabText: '问答' },
      { tab: 'job', tabText: '招聘' }
    ]

    const tabList = tabs.map((tab, index) => (
      <Li key={index}>
        <Btn
          style={
            this.state.tab === tab.tab
              ? {
                  backgroundColor: '#80bd01',
                  color: '#fff'
                }
              : {}
          }
          onClick={() => this.handelTab(tab.tab)}
        >
          {tab.tabText}
        </Btn>
      </Li>
    ))
    const { tab } = this.state
    return (
      <Wrapper>
        <nav>
          <List>{tabList}</List>
        </nav>
        <ShowTopics tab={tab} />
      </Wrapper>
    )
  }
}

export default Main

const Wrapper = styled.section`
  background-color: #ccc;
  padding: 10px 20px;
`
const List = styled.ul`
  margin: 0;
  padding: 10px;
  list-style: none;
  background-color: #eee;
  display: flex;
  border-radius: 5px;
`
const Li = styled.li`
  line-height: 30px;
  font-size: 14px;
  margin: 0 20px;
`
const Btn = styled.span`
  padding: 2px 4px;
  border-radius: 3px;
  cursor: pointer;
`

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Main from './Main'
import ShowTopic from './ShowTopic'
import User from './User'
import CreateTopic from './CreateTopic'
import Error from './Error'
class Section extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/topic/create" component={CreateTopic} />
          <Route path="/topic/:id" component={ShowTopic} />
          <Route path="/user/:username" component={User} />
          <Route path="/404" component={Error} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
    )
  }
}

export default Section

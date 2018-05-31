import React, { Component } from 'react'
import Header from './Header'
import Section from './Section'
import Footer from './Footer'
import { BrowserRouter as Router } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Section />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

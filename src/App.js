import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import CounselorIndex from './components/Counselors/CounselorIndex'
import CounselorCreate from './components/Counselors/CounselorCreate'
import CounselorUpdate from './components/Counselors/CounselorUpdate'
import CounselorShow from './components/Counselors/CounselorShow'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // This will be used on sign in
  setUser = user => this.setState({ user })

  // clearUser will set the `user` state to null
  // This will be used on sign out
  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    // Removed message alert object from state based on an ID value
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // Displays a message alert
  msgAlert = ({ heading, message, variant }) => {
    // Create a unique ID for the message alert
    const id = uuid()
    // Adds the message alert object to the current array of message alerts
    // stored on `App`'s stat
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">

          {/* Unauthenticated Sign Up Route: */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          {/* Unauthenticated Sign In Route: */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          {/* Authenticated Sign Out Route */}
          <AuthenticatedRoute exact path='/sign-out' user={this.state.user} render={() => (
            <SignOut msgAlert={this.msgAlert} user={this.state.user} clearUser={this.clearUser} />
          )} />

          {/* Authenticated Change Password Route: */}
          <AuthenticatedRoute exact path='/change-password' user={this.state.user} render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={this.state.user} />
          )} />

          {/* Authenticated Counselor Show Route: */}
          <AuthenticatedRoute exact path='/show-counselor/:counselorId' user={this.state.user} render={({ match }) => (
            <CounselorShow msgAlert={this.msgAlert} user={this.state.user} match={match} />
          )}/>

          {/* Authenticated Counselor Index Route: */}
          <AuthenticatedRoute path='/counselors' user={this.state.user} render={() => (
            <CounselorIndex
              msgAlert={this.msgAlert}
              user={this.state.user}
            />
          )}/>

          {/* Authenticated Counselor Create Route: */}
          <AuthenticatedRoute exact path='/create-counselors' user={this.state.user} render={() => (
            <CounselorCreate
              msgAlert={this.msgAlert}
              user={this.state.user}
            />
          )}/>

          {/* Authenticated Counselor Update Route: */}
          <AuthenticatedRoute path='/update-counselor/:counselorId/' user={this.state.user} render={({ match }) => (
            <CounselorUpdate msgAlert={this.msgAlert} user={this.state.user} match={match}/>
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App

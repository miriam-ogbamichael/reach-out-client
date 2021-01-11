import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { createCounselors } from '../../api/counselors'

import CounselorForm from '../CounselorForm/CounselorForm'

class CounselorCreate extends Component {
  constructor () {
    super()

    this.state = {
      counselor: {
        name: '',
        location: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert } = this.props

    createCounselors(this.state.counselor, user)
      .then(res => {
        this.setState({ createdId: res.data.counselor._id })
      })
      .then(() => {
        msgAlert({
          heading: 'Create Counselor Success',
          variant: 'success',
          message: 'You have created your own counselor, visit the "View Counselors" page to see them!'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Create Counselor Failed',
          variant: 'danger',
          message: 'Create Counselor is not displayed due to error: ' + err.message
        })
      })
  }

  handleChange = event => {
    this.setState({ counselor: { ...this.state.counselor, [event.target.name]: event.target.value } })
  }

  render () {
    const { counselor, createdId } = this.state

    let counselorJsx

    if (createdId) {
      counselorJsx = <Redirect to={`/create-counselors/${createdId}`}/>
    } else {
      counselorJsx = (
        <div>
          <h3>Create a Counselor</h3>
          <CounselorForm
            counselor={counselor}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      )
    }

    return (
      counselorJsx
    )
  }
}

export default withRouter(CounselorCreate)

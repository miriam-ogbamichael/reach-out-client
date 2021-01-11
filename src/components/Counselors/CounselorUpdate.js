import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { showCounselor, updateCounselor } from '../../api/counselors'

import CounselorForm from '../CounselorForm/CounselorForm'

class CounselorUpdate extends Component {
  constructor () {
    super()

    this.state = {
      counselor: {
        name: '',
        location: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    showCounselor(match.params.counselorId, user)
      .then(res => {
        this.setState({ counselor: res.data.counselor })
      })
      .then(() => {
        msgAlert({
          heading: 'Update Counselor Success',
          variant: 'success',
          message: 'Update this counselor here!'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Counselor Failed',
          variant: 'danger',
          message: 'Update counselor is not displayed due to error: ' + err.message
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props

    updateCounselor(match.params.counselorId, this.state.counselor, user)
      .then(res => {
        this.setState({ updated: true })
      })
      .then(() => {
        msgAlert({
          heading: 'Update Counslor Success',
          variant: 'success',
          message: 'Check out your update on the "View Counselors" Page.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Counselor Failed',
          variant: 'danger',
          message: 'Counselor was not updated due to error: ' + err.message
        })
      })
  }

  handleChange = event => {
    this.setState({ counselor: { ...this.state.counselor, [event.target.name]: event.target.value } })
  }

  render () {
    const { counselor, updated } = this.state

    let counselorJsx

    if (!counselor) {
      counselorJsx = 'Loading...'
    } else if (updated) {
      counselorJsx = <Redirect to={'/counselors/'}/>
    } else {
      counselorJsx = (
        <div>
          <h3>Counselor Update Page</h3>
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

export default withRouter(CounselorUpdate)

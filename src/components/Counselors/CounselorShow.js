import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { deleteCounselor, showCounselor } from '../../api/counselors'

class CounselorShow extends Component {
  constructor () {
    super()

    this.state = {
      counselor: null
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
          heading: 'Show Counselor Success',
          variant: 'success',
          message: 'Checkout this counselor!'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show Counselor Failed',
          variant: 'danger',
          message: 'Counselor is not displayed due to error: ' + err.message
        })
      })
  }

  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    deleteCounselor(match.params.counselorId, user)
      .then(() => {
        msgAlert({
          heading: 'Counselor Deleted Successfully!',
          variant: 'success',
          message: 'Nice work, you did it!'
        })
      })
      .then(() => this.setState({ deleted: true }))
      .catch((err) => {
        msgAlert({
          heading: 'Counselor Delete Failed',
          variant: 'danger',
          message: 'Failed with error: ' + err.message
        })
      })
  }

  render () {
    const { counselor, deleted } = this.state

    let counselorJsx

    if (!counselor) {
      counselorJsx = 'Loading...'
    } else if (deleted) {
      counselorJsx = <Redirect to={'/counselors/'}/>
    } else {
      counselorJsx = (
        <div>
          <h2>View Counselor</h2>
          <h3>Name: {counselor.name}</h3>
          <h4>Location: {counselor.location}</h4>
          <Button onClick={this.handleDelete}>Delete Counselor</Button>
          <Link to={`/update-counselor/${counselor.id}/`}><Button>Update Counselor</Button></Link>
        </div>
      )
    }

    return (
      counselorJsx
    )
  }
}

export default CounselorShow

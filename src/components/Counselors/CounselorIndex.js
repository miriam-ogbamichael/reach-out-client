import React, { Component, Fragment } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import { indexCounselors } from '../../api/counselors'

class CounselorIndex extends Component {
  constructor () {
    super()
    this.state = {
      counselorArray: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexCounselors(user)
      .then(res => {
        console.log(res)
        this.setState({ counselorArray: res.data.counselors })
      })
      .then(() => {
        msgAlert({
          heading: 'Counselor Index Success!',
          message: 'Check out this list of counselors!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Counselor Index Failed',
          message: 'Failed with error: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.counselorArray) {
      return (
        'Loading...'
      )
    } else if (this.state.counselorArray.length === 0) {
      return (
        'No counselors to display :('
      )
    } else {
      return (
        <Row>
          <Card
            style={{
              width: '18rem',
              margin: 'auto',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
            {this.state.counselorArray.map(counselor => (
              <Fragment key={counselor.id}>
                <Card.Body>
                  <Card.Title>{counselor.name}</Card.Title>
                  <Card.Text>{counselor.location}</Card.Text>
                  <Link to={`/show-counselor/${counselor.id}/`}><ButtonToolbar className="justify-content-center">View Counselor</ButtonToolbar></Link>
                  <Link to={`/update-counselor/${counselor.id}/`}><ButtonToolbar className="justify-content-center">Update Counselor</ButtonToolbar></Link>
                </Card.Body>
              </Fragment>
            ))}
          </Card>
        </Row>
      )
    }
  }
}

export default CounselorIndex

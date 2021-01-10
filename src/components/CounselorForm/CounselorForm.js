import React from 'react'

const CounselorForm = ({ counselor, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="First & Last Name"
      name="name"
      value={counselor.name || ''}
      onChange={handleChange}
    />

    <label>Location</label>
    <input
      placeholder="City & State"
      name="location"
      value={counselor.location || ''}
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
  </form>
)

export default CounselorForm

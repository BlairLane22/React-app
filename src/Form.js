import React from 'react'

export default function Form() {

  return (
    <div className="table">
      Email: <input type="email" className="input" /><br/>
      Password: <input type="password" className="input" /><br/>
      <button>Submit</button>
    </div>
  )
}

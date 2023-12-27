import React from 'react'
import { useState } from 'react'
import EditAvatar from '../components/user/editAvatar';


function Signup() {
  const [data, setData] = useState({})
  const [avatar, setAvatar] = useState()
  function handleChange(e) {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))

  }
  return (
    <>
      <main className='flex flex-col items-center'>
        <h3 className=' text-lg'>Signup for VANLIFE</h3>
        <form className='signup-form'>
          <div className='relative my-3'>
            <EditAvatar avatar={avatar} setAvatar={setAvatar} />
          </div>
          <input
          className='signup-element'
            type="email"
            name="email"
            placeholder='Email'
            onChange={handleChange}
            value={data.email}
            required />

          <input
          className='signup-element'
            type="name"
            name="name"
            placeholder='Name'
            onChange={handleChange}
            value={data.name}
            required />

          <input
          className='signup-element'
            type="password"
            name="password"
            placeholder='Password'
            onChange={handleChange}
            value={data.password}
            required />

          <textarea
          className='signup-element'
            type="text"
            name="about"
            placeholder='About'
            onChange={handleChange}
            value={data.about}
            rows={4}
          />
          <div className='w-[40%] flex-col flex signup-select '>
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender" id='gender'
              value={data.gender}
              onChange={handleChange}
              className='w-9/10 p-2 bg-white border-2 rounded border-[#9c9c9c] mb-2'
            >
              <option value="">Please select one…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-Binary</option>
              <option value="other">Other</option>
              <option value="prefer not to answer">Perfer not to Answer</option>
            </select>
          </div>
        </form>
      </main>
    </>
  )
}

export default Signup
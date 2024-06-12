import React from 'react'
import Link from 'next/link'

function aboutus() {
  return (
    <div className=' d-flex justify-content-center cursor-pointer'>
      <Link
      href="/"
      >
      <img src='/images/aboutus/1.png'
        width="100%"
      />
      </Link>

      
    </div>
  )
}

export default aboutus

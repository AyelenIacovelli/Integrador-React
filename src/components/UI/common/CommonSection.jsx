import React from 'react'
import "../common/commonSection.css" 

const CommonSection = ({title}) => {
  return (
    <section className='common__section'>
            <h1>{title}</h1>
    </section>
  )
}

export default CommonSection
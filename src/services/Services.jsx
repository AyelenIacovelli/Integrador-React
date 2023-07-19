import React from 'react'

import "./services.css"
import { motion } from "framer-motion"


import serviceData from '../data/serviceData'

const Services = () => {
    return (
        <section className='services'>


            {
                serviceData.map((item, index) => (
                    <div key={index}>
                        <motion.div whileHover={{ scale: 1.1 }} className='service__item'>
                            <img src={item.icon} alt='foto' className='service__item-img' />
                            {/* <div> */}
                            <h3 className='service__item-title'>{item.title}</h3>
                            {/* </div> */}
                        </motion.div>
                    </div>
                ))
            }




        </section>
    )
}

export default Services
import React from 'react'

import "./services.css"
import { motion } from "framer-motion"


import serviceData from '../data/serviceData'

const Services = () => {
    return (
        <section className='services__section'>
            <div className="timer__overlay"></div>
            <div className='services__container'>

                {
                    serviceData.map((item, index) => (
                        <div key={index}>
                            <motion.div whileHover={{ scale: 1.1 }} className='service__item' style={{ backgroundImage: item.backgroundImage }}>

                                <h3 className='service__item-title'>{item.title}</h3>

                            </motion.div>
                        </div>
                    ))
                }



            </div>
        </section>
    )
}

export default Services
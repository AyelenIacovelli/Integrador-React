import React from 'react'
import "./services.css"
import { motion } from "framer-motion"
import serviceData from '../data/serviceData'

const Services = () => {
    return (
        <section className='services'>
            <div className='container' >
                {
                    serviceData.map((item, index) => (
                        <motion.div whileHover={{ scale: 1.1 }} className='service__item' key={index} >
                            <span><i class={item.icon}></i></span>
                            <div>
                                <h3>{item.title}</h3>
                            </div>
                        </motion.div>
                    ))
                }

            </div>
        </section>
    )
}

export default Services
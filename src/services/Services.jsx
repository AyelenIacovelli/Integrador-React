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
                                        <span><img src={item.icon} alt='foto' /></span>
                                        <div>
                                            <h3>{item.title}</h3>
                                        </div>
                                    </motion.div>
                                </div>
                            ))
                        }                    
                
                

            
        </section>
    )
}

export default Services
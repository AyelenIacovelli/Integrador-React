import React from 'react'

import "./services.css"
import { motion } from "framer-motion"
import {Container, Row, Col} from "reactstrap"

import serviceData from '../data/serviceData'

const Services = () => {
    return (
        <section className='services'>
            <Container>
                <Row>                    
                        {
                            serviceData.map((item, index) => (
                                <Col lg="3" md="4" key={index}>
                                    <motion.div whileHover={{ scale: 1.1 }} className='service__item'>
                                        <span><img src={item.icon} alt='foto' /></span>
                                        <div>
                                            <h3>{item.title}</h3>
                                        </div>
                                    </motion.div>
                                </Col>
                            ))
                        }                    
                </Row>
                

            </Container>
        </section>
    )
}

export default Services
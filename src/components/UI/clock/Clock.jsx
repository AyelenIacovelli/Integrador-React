import React, { useState, useEffect } from 'react'
import "../clock/clock.css"

const Clock = () => {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()

    let interval;

    const countDown = () => {
        const destination = new Date("Sep 30, 2023").getTime()
        interval = setInterval(() => {

            const now = new Date().getTime()

            const different = destination - now

            const days = Math.floor(different / (1000 * 60 * 60 * 24))

            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))

            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))

            const seconds = Math.floor(different % (1000 * 60) / (1000))

            if (destination < 0) clearInterval(interval.current)
            else {
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        })
    }

    useEffect(() => {
        countDown()
    })

    return (
        <div className='clock__wrapper'>
            <div className='clock__data'>
                <div className='clock__data-days'>
                    <h2>{days}</h2>
                </div>
                <h5>Días</h5>
            </div>
            <span>:</span>
            <div className='clock__data'>
                <div className='clock__data-hours'>
                    <h2>{hours}</h2>
                </div>
                <h5>Horas</h5>
            </div>
            <span>:</span>
            <div className='clock__data'>
                <div className='clock__data-minutes'>
                    <h2>{minutes}</h2>
                </div>
                <h5>Minutos</h5>
            </div>
            <span>:</span>
            <div className='clock__data'>
                <div className='clock__data-seconds'>
                    <h2>{seconds}</h2>
                </div>
                <h5>Segundos</h5>
            </div>
        </div>
    )
}

export default Clock
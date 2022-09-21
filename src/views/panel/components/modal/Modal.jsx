import React from 'react'
import { motion } from 'framer-motion'
import "./modal.css"

const dropIn = {
    hidden:{opacity:0},
    visible:{opacity:1,
    trasition:{
        duration:0.1
    }},
    exit: {opacity:0}
}

const Modal = ({setModalOpen,modalOpen,children}) => {
  return (
    <div onClick={()=>setModalOpen(!modalOpen)} className='backdrop d-flex justify-content-center align-items-center'>
        <motion.div onClick={(e)=> e.stopPropagation()} variants={dropIn} initial="hidden" animate="visible" exit="exit" className='m-auto rounded-2 bg-light p-5 d-flex flex-column align-items-center' style={{width: "500px",height: "500px"}}><button className='align-self-end bg-danger rounded-circle mt-4 shadow' style={{ width: "40px", height:"40px"}} onClick={()=>setModalOpen(!modalOpen)}>X</button>{children}</motion.div>
    </div>
  )
}

export default Modal
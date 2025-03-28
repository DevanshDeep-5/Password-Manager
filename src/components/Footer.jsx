import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-700 text-white flex flex-col justify-center items-center w-full gap-1'>
      
      <div className='logo font-bold text-xl'>
        <span className='text-green-500'>&lt;</span>
        Pass<span className='text-green-500'>OP/ &gt;</span>
        </div>

    <div className='flex justify-center items-center'>Created with <img className='w-7 mx-2' src="icons/heart.png" alt="love" />by Devansh Deep</div>
    </div>
  )
}

export default Footer

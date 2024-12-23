/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slider = ({ image, text }) => {
  const heading =   text.split(':')
  return (
    <div
      className='w-full bg-center bg-cover h-[32rem] rounded-xl'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full '>
        <div className='text-center bg-gray-900/70 py-8 px-8 md:w-1/2  rounded-xl'>
          <h1 className='text-3xl font-semibold text-white leading-relaxed lg:text-4xl'>
           <span className='text-primary bg-slate-950/40 font-bold px-4  rounded-md '>
            {heading[0]}</span> <br />
           <span className=''>{heading[1]}</span>
          </h1>
          
        
        </div>
      </div>
    </div>
  )
}

export default Slider

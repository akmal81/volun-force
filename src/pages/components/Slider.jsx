/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slider = ({ image, text }) => {
  const heading =   text.split(':')
  return (
    <div
      className='w-full bg-center bg-cover h-[24rem]  xl:h-[40rem] '
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-end justify-center w-full h-full '>
        <div className='text-center bg-green-900/70 py-8 px-8 md:w-1/2 mb-10  md:rounded-xl'>
          <h1 className='text-3xl font-semibold text-white leading-relaxed lg:text-4xl'>
           <span className='text-white  font-bold px-4  rounded-md '>
            {heading[0]}</span> 
            <br />
           <span className='text-2xl'>{heading[1]}</span>
          </h1>
          
        
        </div>
      </div>
    </div>
  )
}

export default Slider

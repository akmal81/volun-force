/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const Slider = ({ image, text }) => {
  const heading =   text.split(':')
  return (
    <div
      className='w-full bg-center bg-cover h-[38rem]'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='flex items-center justify-center w-full h-full '>
        <div className='text-center bg-gray-900/70 py-8 px-8 md:w-1/2  rounded-xl'>
          <h1 className='text-3xl font-semibold text-white mb-6 leading-relaxed lg:text-4xl'>
           <span className='text-primary bg-white font-bold px-4 rounded-md '>{heading[0]}</span> <br />
           <span>{heading[1]}</span>
          </h1>
          <br />
          <Link
            to='/add-job'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-primary rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
            Post Job & Hire Expert
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slider

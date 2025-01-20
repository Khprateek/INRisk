import React from 'react'

const Services = () => {
  return (
    <div className='h-[150vh] w-screen flex justify-center items-center'>
      <div className="w-[80%] h-full grid grid-cols-3 gap-5 p-5 box-border">
      {/* Left Container */}
      <div className="grid grid-rows-2 gap-5">
        {/* Left Top */}
        <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
            <img src="/stock/prediction.webp" alt="" />
          <h2 className="m-0 mb-5 text-3xl text-white p-2">Market Intelligence</h2>
          <div className="px-4">
            <span className="block text-xl opacity-90 mb-1 font-semibold">Big Data</span>
            <span className="block text-sm opacity-70">know the correct current market information before taking decision to invest.</span>
          </div>
          <button>

          </button>
        </div>
        
        {/* Left Bottom */}
        <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
            <img src="/stock/sentiment.png" alt="Sentiment" />
          <h3 className="m-0 mb-5 text-lg text-white p-2 text-center">Market Sentiment</h3>
          <div className="px-4 flex justify-between">
            <span className="block text-sm opacity-70 mb-1">Metric 1</span>
            <span className="block text-lg font-semibold">Value 1</span>
          </div>
          {/* Add more metrics as needed */}
        </div>
      </div>

      {/* Right Container */}
      <div className="col-span-2 grid grid-rows-2 gap-5">
        {/* Right Top */}
        <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
          {/* Add content */}
        </div>

        {/* Right Bottom */}
        <div className="grid grid-cols-2 gap-5">
          {/* Bottom Left */}
          <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
            {/* Add content */}
          </div>

          {/* Bottom Right */}
          <div className="grid grid-rows-2 gap-5">
            <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
              {/* Add content */}
            </div>
            <div className="bg-[rgba(25,17,51,0.8)] border border-[rgba(141,49,245,0.2)] rounded hover:bg-[rgba(50,17,100,0.8)]">
              <div className="px-4 flex justify-between">
                <span className="block text-sm opacity-70 mb-1">Metric A</span>
                <span className="block text-lg font-semibold">Value A</span>
              </div>
              <div className="px-4 flex justify-between">
                <span className="block text-sm opacity-70 mb-1">Metric B</span>
                <span className="block text-lg font-semibold">Value B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Services

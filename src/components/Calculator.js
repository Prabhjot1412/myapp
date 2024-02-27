import { useState } from "react"

const Calculator = () => {
  const [showCalendarform, setShowCalendarForm] = useState(false)
  return(
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <h1 class="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Funds Calculator</h1>

        <button className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-1 mb-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
         onClick={() => {setShowCalendarForm(!showCalendarform)}}
        >
          New Calendar
        </ button>
      </div>
      <hr />
      { showCalendarform ? <>
        abcd
      </> : null

      }
    </div>
  )
}

export default Calculator

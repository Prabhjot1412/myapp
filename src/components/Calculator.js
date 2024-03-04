import { useState } from "react"

const Calculator = () => {
  const [showCalendarform, setShowCalendarForm] = useState(false)
  const [formData, setFormData] = useState({})
  const [calculatedAmount, setCalculatedAmount] = useState(false)
  const [showCalculatedAmount, setShowCalculatedAmount] = useState(false)
  const [stepper, setStepper] = useState(1)

  const calculateAmount = () => {
    console.log(formData)
    if(!(formData["yearlyReturns"]) || !(formData["goal"]) || !(formData["timeInYears"])) {
      return
    }

    let years = document.getElementById('yearlyInput')
    let goal = document.getElementById('goal')

    if (years) {
      years.value = formData["goal"] / formData["timeInYears"]
    }

    setCalculatedAmount(formData["goal"] / formData["timeInYears"])

    if (showCalculatedAmount) {
      document.getElementById("monthlyInput").value = (formData["goal"] / formData["timeInYears"]) / 12
      document.getElementById("yearlyReturns").value = ((goal.value/100) * formData['yearlyReturns'])
      document.getElementById("monthlyReturns").value = ((goal.value/100) * formData['yearlyReturns']) / 12
    }

    setShowCalculatedAmount(true)
  }

  const handleAmountChangeYearly = (event) => {
    let amount = event.target.value

    let goal = document.getElementById('goal')
    let years = document.getElementById('years')
    let monthlyInput = document.getElementById('monthlyInput')

    setCalculatedAmount(amount*years.value)
    goal.value = amount*years.value
    setFormData({...formData, goal: goal.value})
    monthlyInput.value = amount/12
    document.getElementById('yearlyReturns').value = (goal.value/100) * formData['yearlyReturns']
    document.getElementById('monthlyReturns').value = ((goal.value/100) * formData['yearlyReturns'])/12
  }

  const handleAmountChangeMonthly = (event) => {
    let amount = event.target.value

    let goal = document.getElementById('goal')
    let years = document.getElementById('years')
    let yearlyInput = document.getElementById('yearlyInput')

    setCalculatedAmount((amount*12)*years.value)
    goal.value = (amount*12)*years.value
    setFormData({...formData, goal: goal.value})
    yearlyInput.value = amount*12
    document.getElementById('yearlyReturns').value = (goal.value/100) * formData['yearlyReturns']
    document.getElementById('monthlyReturns').value = ((goal.value/100) * formData['yearlyReturns'])/12
  }

  const handleYearlyReturnsChange = (event) => {
    let yearlyReturns = event.target.value
    let newPercentage = (yearlyReturns * 100)/formData["goal"]

    formData['yearlyReturns'] = newPercentage
    document.getElementById("yearlyReturnsPercentage").value = newPercentage
    document.getElementById('monthlyReturns').value = yearlyReturns/12
  }

  const handleMonthlyReturnsChange = (event) => {
    let monthlyReturns = event.target.value
    let newPercentage = ((monthlyReturns * 12) * 100)/formData["goal"]

    formData['yearlyReturns'] = newPercentage
    document.getElementById("yearlyReturnsPercentage").value = newPercentage
    document.getElementById('yearlyReturns').value = monthlyReturns * 12
  }

  return(
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <h1 className="mb-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">Funds Calculator</h1>

        <button className={`transition-all duration-200 ml-5 ${showCalendarform ? "bg-gray-200 text-white" : "text-gray-900 bg-white"} border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-1 mb-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}
          onClick={() => {setShowCalendarForm(!showCalendarform)}}
        >
          New Calendar
        </ button>
      </div>
      <hr />
      { showCalendarform ?
        <div>
          <div className="m-5 flex justify-center">
            <button className="mr-4"><hr className={`w-32 h-2 ${stepper >= 1 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(1)}}/></button>
            <button className="mr-4"><hr className={`w-32 h-2 ${stepper >= 2 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(2)}}/></button>
            <button><hr className={`w-32 h-2 ${stepper >= 3 ? "bg-blue-500 border-0 dark:bg-blue-700" : "bg-gray-200 border-0 dark:bg-gray-700"}`} onClick={() => {setStepper(3)}}/></button>
          </div>

          {stepper == 1 &&
            <div>
              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Years of Savings
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="years"
                  value={formData["timeInYears"]}
                  type="number"
                  placeholder="40"
                  onChange={(event) => {setFormData({...formData, timeInYears: event.target.value})}}
                />
              </div>

              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Expected goal amount
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="goal"
                  type="number"
                  placeholder="100000000"
                  onChange={(event) => {setFormData({...formData, goal: event.target.value})}}
                />
              </div>

              <div className="my-5 flex justify-between items-center">
                <label className="block text-gray-700 text-sm font-bold">
                  Expected yearly returns from savings (in %)
                </label>

                <input className="shadow appearance-none border rounded w-7/12 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="yearlyReturnsPercentage"
                  type="number"
                  placeholder="4.75"
                  onChange={(event) => {setFormData({...formData, yearlyReturns: event.target.value})}}
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={calculateAmount}
                >
                  Calculate
                </button>
              </div>

              {
                showCalculatedAmount ? 
                  <div>
                    <p> To save per year: <input id="yearlyInput" type="number" defaultValue={calculatedAmount} onChange={handleAmountChangeYearly}/></p>
                    <p> To save per Month: <input id="monthlyInput" type="number" defaultValue={calculatedAmount/12} onChange={handleAmountChangeMonthly}/></p>
                    <p> Yearly returns: <input id="yearlyReturns" type="number" defaultValue={(formData["goal"]/100)*formData["yearlyReturns"]} onChange={handleYearlyReturnsChange}/></p>
                    <p> Monthly returns: <input id="monthlyReturns" type="number" defaultValue={((formData["goal"]/100)*formData["yearlyReturns"])/12} onChange={handleMonthlyReturnsChange}/></p>
                  </div> : null
              }

              <hr />
            </div>
          }
          {stepper == 2 &&
            <div>
              <div className={`bg-cyan-100 hover:bg-cyan-200 rounded-lg mb-5 mt-2 flex`} style={{justifyContent: "space-between"}}>
                <div className="flex ml-5">
                  abcd
                </div>
              </div>
            </div>
          }
        </div> : null
      }
    </div>
  )
}

export default Calculator

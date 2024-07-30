import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [additionalDestinitationValues, setAdditionalDestinitationValues] = useState([{
    id: '1',
    value: ''
  }]);
  const [initialDestination, setInitialDestination] = useState('')
  const [vehicleType, setVehicleType] = useState('');
  const [totalExpense, setTotalExpense] = useState('')

  const addAdditionalDestination = (e: any) => {
    e.preventDefault();
    const values = [...additionalDestinitationValues];
    values.push({
      id: String(Math.random() * 0.5),
      value: e.target.value
    })
    setAdditionalDestinitationValues(values)
  }

  const saveAnotherDestination = (index: any, value: string) => {
    const destinations = additionalDestinitationValues.map((dest) => {
      if (index === dest.id) {
        dest.value = value
      }
      return dest
    })
    setAdditionalDestinitationValues(destinations);
  }

  const totalExpenseName = () => {
    let fullString = '';
    let b = ''
    additionalDestinitationValues.map((destination) => {
      fullString += '-' + destination.value
      return fullString
    }).join('-')
    b = initialDestination + fullString
    setTotalExpense(b)
  }

  useEffect(() => {
    totalExpenseName()
  }, [initialDestination, additionalDestinitationValues])

  return (
    <>
      <h1>Travel cost calculation</h1>
      <div>
        <label htmlFor="starting_point">Starting Point</label>
        <input value={initialDestination} onChange={(e) => setInitialDestination(e.target.value)} type='text' id={initialDestination} placeholder='Berlin' />
      </div>
      {additionalDestinitationValues.map((destination, index) => (
        <div key={destination.id}>
          <label htmlFor="destination">Destination</label>
          <input type='text' id={destination.id} value={destination.value} placeholder='Paris' onChange={(e) => {
            saveAnotherDestination(destination.id, e.target.value)
          }} />
        </div>
      ))}
      <div>
        <button onClick={(e) => { addAdditionalDestination(e) }}>+ Add Additional Destination</button>
      </div>
      <div>
        <label htmlFor='vehicle_type'>Vehicle Type</label>
        <select value={vehicleType} onChange={(e) => { setVehicleType(e.target.value) }}>
          <option value='Car'>
            Car
          </option>
          <option value='Train'>
            Train
          </option>
          <option value='Plain'>
            Plain
          </option>
        </select>
      </div>
      <div>
        <label htmlFor="expense_name">Expense Name</label>
        <input placeholder='Berlin - Paris' type='text' id='expense_name' value={totalExpense} />
      </div>
      <div>
        <p>Total Amount: $ {Math.random() * 1000}</p>
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </>
  )
}

export default App

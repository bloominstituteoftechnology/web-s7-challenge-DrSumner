import { isValid } from 'ipaddr.js'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const formSchema = yup.object().shape({
fullName: yup
  .string()
  .trim()
  .min(3, validationErrors.fullNameTooShort)
  .max(20, validationErrors.fullNameTooLong)
  .required()
  .matches(),

size: yup
  .string()
  .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
  .required()


})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]
const toppingsActive = []
const initialValues = { "fullName": "", "size": "", "toppings": toppingsActive }
const initialErrors = { "fullName": "", "size": "" }
export default function Form() {

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [success, setSuccess] = useState()
  const [failure, setFailure] = useState()
  const [submitActive, setSubmitActive] = useState(false)
  const [order, setOrder] = useState()
  useEffect(() => {
    formSchema.isValid(values).then(isValid => {
      setSubmitActive(isValid)
    })
  }, [values])


const handleChange = evt => {
  let {type, checked, id, value} = evt.target
  if (type === 'checkbox'){

    if(toppingsActive.includes(value)){
      const index = toppingsActive.indexOf(value)
      toppingsActive.splice(index,1)

    } else
    toppingsActive.push(value)
    
  } 
  
  else
  setValues({...values,[id]: value});
  
  if(type !== 'checkbox'){
  yup.reach(formSchema, id)
  .validate(value)
  .then(() => setErrors({...errors, [id]: '' }))
  .catch((error) => setErrors({...errors, [id]: error.errors[0]}))}

  console.log(order)
}


const handleSubmit = evt => {
  
    

  const ordervalues = values
  const toppingsinfo = toppingsActive.slice()
  setOrder(ordervalues)
  setOrder({...values, toppings: toppingsinfo})
  console.log(order)
  evt.preventDefault()
  console.log("submitting to server")
  axios.post('http://localhost:9009/api/order', values)
  .then(res => {
    setSuccess(res.data.message)
    setFailure() 
    
    })
    .catch(res => {
      setFailure(res.response.data.message)
      setSuccess()
      
  })
   
  setValues(initialValues)
}


  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{`Thank you for your order, 
      ${order.fullName}! Your ${order.size === 'S' ? 'small' : 
      `${order.size === 'M' ? 'medium' : 'large'}`} pizza with 
      ${order.toppings.length > 0 ? `${order.toppings.length} 
      ${order.toppings.length > 1 ? 'toppings' : 'topping'}` : 'no toppings'} 
      
      is on the way`}</div>}
      {failure && <div className='failure'>Something went wrong</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input onChange={handleChange} value={values.fullName} placeholder="Type full name" id="fullName" type="text" />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={handleChange} id="size" value={values.size}>
            <option value="">----Choose Size----</option>
            <option name='Small' value="S">Small</option>
            <option name='Medium' value="M">Medium</option>
            <option name='Large' value="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map( topping => {
          return(
          <label key={topping.topping_id}>
                    <input
                      onChange={handleChange}
                      id='toppings'
                      type="checkbox"
                      value={topping.topping_id}
                    />
                    {topping.text}<br />
                  </label>)
        })}
        

      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled={!submitActive} type="submit" />
    </form>
  )
}

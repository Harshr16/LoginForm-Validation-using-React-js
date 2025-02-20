import React, { useState, useEffect } from 'react'

function App() {

  const intitialValues = {
    username: "",
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(intitialValues)
  const [formErrors, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })


  }
  useEffect(() => {
    if (isSubmit) {
      setFormError(validate(formValues));  // Only validate after first submit
    }
  }, [formValues, isSubmit]);  // Runs when form values or isSubmit changes
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = validate(formValues);
    setFormError(errors);
    setIsSubmit(true);
      // Mark that user has submitted at least once
  };
  

  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

  }, [formErrors])


  const validate = (values) => {
    const errors = {}
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const regexName = /^[A-Z][a-z]+\s[A-Z][a-z]+$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    // Name validation
    if (!values.username.trim()) {
      errors.username = "Username is required";
    } else if (!regexName.test(values.username)) {
      errors.username = "Write Full Name (First Last)";
    }

    // Email validation
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Enter a valid email";
    }

    // Password validation
    if (!values.password.trim()) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must contain at least 8 characters";
    } else if (!regexPassword.test(values.password)) {
      errors.password = "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    return errors;
  }

  return (
    <>

      <div className=' flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#022F40] to-[#38AECC]  w-full'>
        <form className='border-1 px-6  py-8 rounded-xl w-[370px]  ' onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-4 text-black/80'>Login form</h1>
          <div className='ui divider opacity-50 mb-4'><hr /></div>
          <div className='ui form'>
            <div className='field'>
              <label className='text-lg text-white/80 font-medium  cursor-pointer hover:underline'>Username</label><br />
              <input
                type='text'
                name='username'
                placeholder='Username'
                className='bg-slate-300 my-1.5 p-2 w-80 rounded-md hover:scale-103 text-black border border-gray-400'
                onChange={handleChange}
                value={formValues.username}
              />
            </div>
            <p className='text-rose-900 font-bold '>{formErrors.username}</p>
            <div className='field'>
              <label className='text-lg text-white/80 font-medium  cursor-pointer hover:underline'>Email</label><br />
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='bg-slate-300 my-1.5 p-2 w-80 rounded-md border border-gray-400 text-black hover:scale-103 '
                onChange={handleChange}
                value={formValues.email}
              />
            </div>
            <p className=' text-rose-900 font-bold'>{formErrors.email}</p>
            <div className='field'>
              <label className='text-lg text-white/80 font-medium  cursor-pointer hover:underline'>Password</label><br />
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='bg-slate-300 my-1.5 p-2 w-80 rounded-md border border-gray-400 text-black hover:scale-103'
                onChange={handleChange}
                value={formValues.password}
              />
            </div>
            <p className='text-rose-900 font-bold'>{formErrors.password}</p>
            <button className="w-full mt-4 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
              Submit
            </button>

          </div>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className='mt-6 text-center border bg-green-200 rounded-2xl w-40 ml-19  '><p className=''>Signed in Successfully</p></div>
          ) : (

            <div className='mt-4 text-white/100'>
              <pre>{JSON.stringify(formValues, undefined, 2)}</pre>

            </div>
          )}
        </form>


      </div>
    </>
  )
}



export default App
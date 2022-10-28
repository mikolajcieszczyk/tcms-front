import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../api/axios'
import { ToastContainer, toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { Icon } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import NtrpFaq from '../../NtrpFaq'

export const skillsOptions = [
  { key: '1', text: 'NTRP 1.0', value: 'NTRP 1.0' },
  { key: '2', text: 'NTRP 1.5', value: 'NTRP 1.5' },
  { key: '3', text: 'NTRP 2.0', value: 'NTRP 2.0' },
  { key: '4', text: 'NTRP 2.5', value: 'NTRP 2.5' },
  { key: '5', text: 'NTRP 3.0', value: 'NTRP 3.0' },
  { key: '6', text: 'NTRP 3.5', value: 'NTRP 3.5' },
  { key: '7', text: 'NTRP 4.0', value: 'NTRP 4.0' },
  { key: '8', text: 'NTRP 4.5', value: 'NTRP 4.5' },
  { key: '9', text: 'NTRP 5.0', value: 'NTRP 5.0' },
  { key: '10', text: 'NTRP 5.5', value: 'NTRP 5.5' },
  { key: '11', text: 'NTRP 6.0', value: 'NTRP 6.0' },
  { key: '12', text: 'NTRP 6.5', value: 'NTRP 6.5' },
  { key: '13', text: 'NTRP 7.0', value: 'NTRP 7.0' },
]

export const genderOptions = [
  { key: '1', text: 'Male', value: 'Male' },
  { key: '2', text: 'Female', value: 'Female' },
  { key: '3', text: 'Other', value: 'Other' },
]

export interface IClient {
  name: string
  surname: string
  age: number | string
  email: string
  phone: string
  skills: string
  gender: string
}

interface IProps {
  id: string
}

// Create the markup
const EditClient = ({ id }: IProps): JSX.Element => {
  const [show, setShow] = useState(false)
  const [client, setClient] = useState({} as IClient)

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)
  const notifySuccess = (msg: string) =>
    toast.info(msg, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })

  const initialData: IClient = {
    name: '',
    surname: '',
    age: 0,
    email: '',
    phone: '',
    gender: '',
    skills: '',
  }

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const AddClientSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Name is required'),

    surname: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Surname is required'),
    age: Yup.number().required(),
    email: Yup.string()
      .email('Invalid email address')
      .required('E-mail is equired'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),

    gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required(),
    skills: Yup.string().required(),
  })

  const onSubmit = async (values: IClient) => {
    try {
      const request = await axios.patch(
        `http://localhost:4000/clients/update/${id}`,
        values,
      )
      console.log(request.status)

      request.status === 200 && notifySuccess('Client updated succesfully!')
      handleClose()
    } catch (error) {
      notifyError('Something went wrong')
      console.log(error)
    }
  }

  const requestData = async () => {
    try {
      const response = await axios.get(`/clients/${id}`)
      // console.log(response?.data)
      setClient(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        <i className='bi bi-pencil-fill'></i>
      </Button>
      <Modal show={show} onHide={handleClose} onShow={requestData}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <Formik
                initialValues={client}
                enableReinitialize
                validationSchema={AddClientSchema}
                onSubmit={(values) => onSubmit(values)}
              >
                {({ touched, errors, isSubmitting, values }) => (
                  <div>
                    <div className='row mb-5'>
                      <div className='col-lg-12 text-center'>
                        <h1 className='mt-5'>Edit client</h1>
                      </div>
                    </div>
                    <Form>
                      <Modal.Body>
                        <div className='form-group'>
                          <label className='mt-3 ' htmlFor='name'>
                            Name
                          </label>
                          <Field
                            type='name'
                            name='name'
                            placeholder='Enter name'
                            autocomplete='off'
                            className={` form-control
                          ${touched.name && errors.name ? 'is-invalid' : ''}`}
                          />

                          <ErrorMessage
                            component='div'
                            name='name'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='surname'>
                            Surname
                          </label>
                          <Field
                            type='surname'
                            name='surname'
                            placeholder='Enter surname'
                            autocomplete='off'
                            className={` form-control
                          ${
                            touched.surname && errors.surname
                              ? 'is-invalid'
                              : ''
                          }`}
                          />

                          <ErrorMessage
                            component='div'
                            name='surname'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='number'>
                            age
                          </label>
                          <Field
                            type='number'
                            name='age'
                            placeholder='Enter age'
                            autocomplete='off'
                            className={` form-control
                          ${touched.age && errors.age ? 'is-invalid' : ''}`}
                          />

                          <ErrorMessage
                            component='div'
                            name='age'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='email'>
                            Email
                          </label>
                          <Field
                            type='email'
                            name='email'
                            placeholder='Enter email'
                            autocomplete='off'
                            className={` form-control
                          ${touched.email && errors.email ? 'is-invalid' : ''}`}
                          />

                          <ErrorMessage
                            component='div'
                            name='email'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='phone'>
                            Phone
                          </label>
                          <Field
                            type='phone'
                            name='phone'
                            placeholder='Enter phone'
                            autocomplete='off'
                            className={` form-control
                          ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                          />

                          <ErrorMessage
                            component='div'
                            name='phone'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='gender'>
                            Gender
                          </label>
                          <Field
                            as='select'
                            type='gender'
                            name='gender'
                            placeholder='Enter gender'
                            autocomplete='off'
                            className={` form-control
                          ${
                            touched.gender && errors.gender ? 'is-invalid' : ''
                          }`}
                          >
                            {genderOptions.map((item) => {
                              return (
                                <option value={item.value}>{item.value}</option>
                              )
                            })}
                          </Field>

                          <ErrorMessage
                            component='div'
                            name='gender'
                            className='invalid-feedback'
                          />

                          <label className='mt-3 ' htmlFor='skills'>
                            Skills
                          </label>
                          <Field
                            as='select'
                            type='skills'
                            name='skills'
                            placeholder='Enter skills'
                            autocomplete='off'
                            className={` form-control
                          ${
                            touched.skills && errors.skills ? 'is-invalid' : ''
                          }`}
                          >
                            {skillsOptions.map((item) => {
                              return (
                                <option value={item.value}>{item.value}</option>
                              )
                            })}
                          </Field>
                          <NtrpFaq />

                          <ErrorMessage
                            component='div'
                            name='skills'
                            className='invalid-feedback'
                          />
                        </div>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          type='submit'
                          variant='primary'
                          onClick={() => onSubmit}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditClient

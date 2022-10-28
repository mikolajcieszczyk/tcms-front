import React, { useEffect, useState } from 'react'
import { Alert, Badge, Form, FormLabel, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { toast } from 'react-toastify'
import axios from '../../../api/axios'
import * as Yup from 'yup'
import { ErrorMessage, Field, Formik } from 'formik'

interface IBooking {
  id: number
  clientName: string | undefined
  start: Date
  end: Date
  court: any
  price: number | undefined
}

interface IEditBooking {
  clientName: string
  price: number
}

export default function AddBooking(props: any) {
  const EditBookingSchema = Yup.object().shape({
    clientName: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .max(20, 'Must be 20 characters or less')
      .required('Client name required'),

    price: Yup.string().required('Price is required'),
  })

  const initialData: IEditBooking = {
    clientName: '',
    price: 0,
  }

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

  const onSubmit = async (e: any, values?: IEditBooking) => {
    e.preventDefault()

    const dataToSend: IBooking = {
      id: props.data.id,
      clientName: values?.clientName,
      start: props.data.start,
      end: props.data.end,
      court: props.data.court,
      price: values?.price,
    }

    try {
      const request = await axios.post(
        `http://localhost:4000/bookings/add`,
        dataToSend,
      )

      request.status === 201 && notifySuccess('Booking added succesfully!')
      props.close()
    } catch (error: any) {
      notifyError(error.response.data.message)
    }
  }

  return (
    <>
      <Offcanvas
        show={props.isOpened}
        onHide={props.close}
        placement='end'
        backdrop={false}
        scroll
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h3>Add new Booking</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column justify-content-between'>
          {!Object.keys(props.data).length ? (
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          ) : (
            <div>
              <Formik
                initialValues={initialData}
                enableReinitialize
                validationSchema={EditBookingSchema}
                onSubmit={(e) => onSubmit(e)}
              >
                {({ touched, errors, isSubmitting, values }) => {
                  return (
                    <Form className='mb-3'>
                      <div className='form-group'>
                        <label className='mt-3 ' htmlFor='clientName'>
                          Client
                        </label>
                        <Field
                          type='clientName'
                          name='clientName'
                          placeholder='Enter client name'
                          autocomplete='off'
                          className={` form-control
                          ${
                            touched.clientName && errors.clientName
                              ? 'is-invalid'
                              : ''
                          }`}
                        />
                        <label className='mt-3 ' htmlFor='number'>
                          Price
                        </label>
                        <Field
                          type='number'
                          name='price'
                          placeholder='Enter price'
                          autocomplete='off'
                          className={` form-control
                          ${touched.price && errors.price ? 'is-invalid' : ''}`}
                        />

                        <ErrorMessage
                          component='div'
                          name='price'
                          className='invalid-feedback'
                        />
                      </div>
                      <div className='d-grid gap-2'>
                        <Button
                          type='submit'
                          variant='success'
                          onClick={(e) => onSubmit(e, values)}
                          disabled={!values.clientName.length ? true : false}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

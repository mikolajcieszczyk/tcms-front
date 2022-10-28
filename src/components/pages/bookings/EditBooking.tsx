import React, { useEffect, useState } from 'react'
import { Alert, Form, ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { toast } from 'react-toastify'
import axios from '../../../api/axios'
import * as Yup from 'yup'
import { ErrorMessage, Field, Formik } from 'formik'

interface IBooking {
  id: number
  clientName: string
  start: Date
  end: Date
  court: any
  price: any
}

interface IEditBooking {
  clientName: string
  price: number
}

export default function EditBooking(props: any) {
  const [data, setData] = useState<IBooking>({} as IBooking)
  const [disableDeleteBtn, setDisableDeleteBtn] = useState<boolean>(true)

  const EditBookingSchema = Yup.object().shape({
    clientName: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .max(20, 'Must be 20 characters or less')
      .required('Client name required'),

    price: Yup.string().required('Surname is required'),
  })

  const initialData: IEditBooking = {
    clientName: data.clientName,
    price: data.price,
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

  const requestData = async () => {
    try {
      const request = await axios.get(
        `http://localhost:4000/bookings/${props.id}`,
      )
      setData(request.data)
    } catch (error: any) {
      notifyError(error.response.data.message)
    }
  }

  const removeBooking = async () => {
    try {
      const request = await axios.delete(
        `http://localhost:4000/bookings/remove/${props.id}`,
      )
      request.status === 200 && notifySuccess('Client deleted succesfully!')
      props.close()
    } catch (error: any) {
      notifyError(error.response.data.message)
    }
  }

  const onSubmit = async (e: any, values?: IEditBooking) => {
    e.preventDefault()
    try {
      const request = await axios.patch(
        `http://localhost:4000/bookings/update/${props.id}`,
        values,
      )

      request.status === 200 && notifySuccess('Booking updated succesfully!')
      props.close()
    } catch (error: any) {
      notifyError(error.response.data.message)
    }
  }

  useEffect(() => {
    requestData()
    setDisableDeleteBtn(true)
  }, [])

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
            <h3>Edit Booking</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {!Object.keys(data).length ? (
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <Offcanvas.Body className='d-flex flex-column justify-content-between'>
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
                          disabled={Object.keys(errors).length ? true : false}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  )
                }}
              </Formik>

              <Alert variant='success'>
                <p>
                  In this section u can edit only name and price of the selected
                  booking. To change dates or duration u need to close this
                  popover and:
                </p>

                <ListGroup>
                  <ListGroup.Item>
                    <i className='bi bi-arrows-move mr-2 text-success'></i> drag
                    and drop event to a desirable range to change dates
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <i className='bi bi-bounding-box mr-2 text-success'></i>{' '}
                    resize event to change duration
                  </ListGroup.Item>
                </ListGroup>
              </Alert>
            </div>

            <div>
              <Offcanvas.Header>
                <Offcanvas.Title>
                  <h3>Delete Booking</h3>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Alert variant='danger'>
                <Alert.Heading className='text-center'>
                  This operation is irreversible!
                </Alert.Heading>
                <p>
                  Aww yeah, you successfully read this important alert message.
                  This example text is going to run a bit longer so that you can
                  think if you really want to delete this booking.
                </p>
                <hr />
                <p className='mb-0 d-flex justify-content-center'>
                  Are you sure u want to delete {props.name} {props.surname}?{' '}
                  <Form.Check
                    className='ml-1 pt-1'
                    inline
                    type='switch'
                    id={`delete${props.id}`}
                    onClick={() => setDisableDeleteBtn(!disableDeleteBtn)}
                    isInvalid
                  />
                </p>
              </Alert>
              <div className='d-grid gap-2'>
                <Button
                  variant='danger'
                  disabled={disableDeleteBtn}
                  onClick={removeBooking}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </>
  )
}

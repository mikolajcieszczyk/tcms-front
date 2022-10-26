import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast, ToastContainer } from 'react-toastify'
import axios from '../../../api/axios'
import Alert from 'react-bootstrap/Alert'
interface IProps {
  data: any
}

export default function DeleteClient({ data }: IProps) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    console.log(data)
    setShow(true)
  }

  const customId = 'custom-id-yes'

  const notifySuccess = (msg: string) =>
    toast.success(msg, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
      toastId: customId,
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
      toastId: customId,
    })

  const onSubmit = async () => {
    try {
      console.log(data)
      const request = await axios.delete(
        `http://localhost:4000/clients/remove/${data.id}`,
      )

      request.status === 200 && notifySuccess('Client deleted succesfully!')
      handleClose()
    } catch (error) {
      notifyError('Something went wrong')
      console.log(error)
    }
  }

  return (
    <>
      <Button onClick={handleShow} variant='danger'>
        <i className='bi bi-trash-fill'></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant='danger'>
            <Alert.Heading className='text-center'>
              This operation is irreversible!
            </Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This
              example text is going to run a bit longer so that you can think if
              you really want to delete this client.
            </p>
            <hr />
            <p className='mb-0 text-center'>
              Are you sure u want to delete {data.name} {data.surname}?{' '}
              <i className='bi bi-trash-fill'></i>
            </p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={onSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

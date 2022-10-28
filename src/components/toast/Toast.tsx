import React from 'react'
import { toast } from 'react-toastify'

interface IProps {
  msg: string
  success: boolean
  error: boolean
}

export default function Toast({ msg, success, error }: IProps) {
  const customId = 'custom-id-yes'

  const notifySuccess = (msg: string) =>
    toast.info(msg, {
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

  const renderToast = () => {
    if (msg && success) {
      return notifySuccess(msg)
    } else if (msg && error) {
      return notifyError(msg)
    }
  }

  return renderToast()
}

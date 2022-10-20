import React, { useEffect, useState } from 'react'
import { Button, Header, Modal, Popup } from 'semantic-ui-react'
import moment from 'moment'

interface IBooking {
  clientName: string
  start: Date
  end: Date
  court: any
  price: any
}

interface IProps {
  bookingDetails: IBooking
}

export default function BookingInfo({ bookingDetails }: IProps) {
  const [open, setOpen] = useState<boolean>(false)
  console.log('open: ', open)

  useEffect(() => {
    // setOpen(isOpened)
  }, [])

  const requestData = () => {
    // setOpen(true)
    console.log(bookingDetails)
    // setOpen(isOpened)
  }

  console.log(bookingDetails)

  return true
}

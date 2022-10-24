import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
  FormatInput,
  SlotInfo,
} from 'react-big-calendar'
import axios from '../../../api/axios'
import moment from 'moment'
import BookingInfo from './BookingInfo'
import { Popup, Header } from 'semantic-ui-react'

const localizer = momentLocalizer(moment)

interface IBooking {
  id: number
  clientName: string
  start: Date
  end: Date
  court: any
  price: any
}

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Court 1' },
  { resourceId: 2, resourceTitle: 'Court 2' },
  { resourceId: 3, resourceTitle: 'Court 3' },
  { resourceId: 4, resourceTitle: 'Court 4' },
]

export default function Scheduler() {
  const [events, setEvents] = useState<any[]>([])
  const [openBookingInfo, setOpenBookingInfo] = useState<boolean>(false)
  const [selectedBooking, setSelectedBooking] = useState<IBooking>(
    {} as IBooking,
  )

  const almostUniqueId = () => {
    return Math.floor(Date.now() + Math.random())
  }

  const requestData = async () => {
    try {
      const request = await axios.get(`http://localhost:4000/bookings/`)

      const responseData = () => {
        return request.data.map((item: any) => {
          const parseData = {
            id: item.id,
            title: item.clientName,
            start: moment(item.start).toDate(),
            end: moment(item.end).toDate(),
            resourceId: item.court,
            price: item.price,
          }
          return parseData
        })
      }

      responseData()

      setEvents(responseData())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    requestData()
    console.log(events)
  }, [])

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      const title = window.prompt('client name')
      const price = window.prompt('price')

      const addBooking = async () => {
        if (title && price) {
          let newEvent = {} as IBooking

          try {
            newEvent.id = newEvent.id
            newEvent.clientName = title
            newEvent.start = start
            newEvent.end = end
            newEvent.court = resourceId
            newEvent.price = parseInt(price, 10)

            const request = await axios.post(
              `http://localhost:4000/bookings/add`,
              newEvent,
            )

            console.log(request)
          } catch (error) {
            console.log(error)
          }

          setEvents((prev) => [
            ...prev,
            { almostUniqueId, start, end, title, resourceId },
          ])
        }
      }

      addBooking()
    },
    [setEvents],
  )

  const handleSelectEvent = useCallback(
    (event: {
      price: any
      title: string
      start: Date
      end: Date
      id: number
      resourceId: number
    }) => {
      const selectedEvent = {
        clientName: event.title,
        start: event.start,
        end: event.end,
        id: event.id,
        court: event.resourceId,
        price: event.price,
      }

      // console.log(selectedEvent)
      // console.log(selectedEvent.id)

      const findEventToRemove = events.find(
        (item) => item.id === selectedEvent.id,
      )
      console.log(findEventToRemove)

      // console.log(events)

      const removeBooking = async () => {
        try {
          const request = await axios.delete(
            `http://localhost:4000/bookings/remove/id${findEventToRemove.id}`,
          )
          console.log(request)
        } catch (error) {
          console.log(error)
        }
      }

      if (findEventToRemove) {
        removeBooking()
        requestData()
      } else {
        console.log('czekaj')
      }
    },
    [],
  )

  const formats = {
    eventTimeRangeFormat: (range: { start: FormatInput; end: FormatInput }) =>
      `${localizer.format(range.start, 'HH:mm')} – ${localizer.format(
        range.end,
        'HH:mm',
      )}`,
    timeGutterFormat: 'HH:mm',
  }

  return (
    <>
      <div>
        <Calendar
          formats={formats}
          culture='Poland'
          defaultDate={moment().toDate()}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor='resourceId'
          resources={resourceMap}
          resourceTitleAccessor='resourceTitle'
          step={30}
          view='day'
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={{
            day: true,
          }}
          selectable
        />
      </div>
    </>
  )
}
Scheduler.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

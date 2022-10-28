import { ComponentType, useCallback, useEffect, useState } from 'react'
import {
  Calendar,
  CalendarProps,
  dateFnsLocalizer,
  FormatInput,
  SlotInfo,
  Views,
} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'

import axios from '../../../api/axios'
import moment from 'moment'
import EditBooking from './EditBooking'
import AddBooking from './AddBooking'
import { toast } from 'react-toastify'
const locales = {
  'en-US': enUS,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface IBooking {
  id: number
  clientName: string
  start: Date
  end: Date
  court: any
  price: any
}

interface IResource {
  resourceId: number
  resourceTitle: string
}

const DnDCalendar = withDragAndDrop<IBooking, IResource>(
  Calendar as ComponentType<CalendarProps<IBooking, IResource>>,
)

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Court 1' },
  { resourceId: 2, resourceTitle: 'Court 2' },
  { resourceId: 3, resourceTitle: 'Court 3' },
  { resourceId: 4, resourceTitle: 'Court 4' },
]

export default function Scheduler() {
  const [events, setEvents] = useState<any[]>([])
  const [openEditBooking, setOpenEditBooking] = useState<boolean>(false)
  const [bookingToEditId, setBookingToEditId] = useState<number>()
  const [openAddBooking, setOpenAddBooking] = useState<boolean>(false)
  const [newBookingData, setNewBookingData] = useState({} as IBooking)

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

  const formats = {
    eventTimeRangeFormat: (range: { start: FormatInput; end: FormatInput }) =>
      `${localizer.format(range.start, 'HH:mm')} – ${localizer.format(
        range.end,
        'HH:mm',
      )}`,
    timeGutterFormat: 'HH:mm',
  }

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
    } catch (error: any) {
      notifyError(error.response.data.message)
    }
  }

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }: SlotInfo) => {
      const bookingData: IBooking = {
        id: almostUniqueId(),
        clientName: '',
        start: start,
        end: end,
        court: resourceId,
        price: 0,
      }

      setOpenAddBooking(!openAddBooking)
      setNewBookingData(bookingData)
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
      setBookingToEditId(event.id)
      setOpenEditBooking(true)
    },
    [],
  )

  const resizeEvent = useCallback(
    //@ts-ignore
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)

        const updateBooking = async () => {
          const dataToUpdate = {
            start,
            end,
          }

          try {
            const request = await axios.patch(
              `http://localhost:4000/bookings/update/${event.id}`,
              dataToUpdate,
            )
            request.status === 200 &&
              notifySuccess('Booking resized succesfully!')
          } catch (error: any) {
            notifyError(error.response.data.message)
          }
        }

        updateBooking()

        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents],
  )

  const moveEvent = useCallback(
    //@ts-ignore
    ({ event, start, end, resourceId }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)

        const updateBooking = async () => {
          const dataToUpdate = {
            start,
            end,
            court: resourceId,
          }

          try {
            const request = await axios.patch(
              `http://localhost:4000/bookings/update/${event.id}`,
              dataToUpdate,
            )

            console.log(request)

            request.status === 200 &&
              notifySuccess('Booking moved succesfully!')
          } catch (error: any) {
            notifyError(error.response.data.message)
          }
        }

        updateBooking()

        return [...filtered, { ...existing, start, end, resourceId }]
      })
    },
    [setEvents],
  )

  useEffect(() => {
    requestData()
  }, [setEvents, openAddBooking, openEditBooking])

  return (
    <>
      <DnDCalendar
        style={{ height: '700px' }}
        events={events}
        localizer={localizer}
        formats={formats}
        culture='Poland'
        defaultDate={moment().toDate()}
        defaultView={Views.DAY}
        //@ts-ignore
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resourceIdAccessor='resourceId'
        resources={resourceMap}
        resourceTitleAccessor='resourceTitle'
        step={30}
        view='day'
        onSelectSlot={handleSelectSlot}
        //@ts-ignore
        onSelectEvent={handleSelectEvent}
        views={{
          day: true,
        }}
        selectable
        resizable
      />
      {openEditBooking && (
        <EditBooking
          isOpened={openEditBooking}
          close={() => setOpenEditBooking(false)}
          id={bookingToEditId}
        />
      )}
      {openAddBooking && (
        <AddBooking
          isOpened={openAddBooking}
          close={() => setOpenAddBooking(false)}
          data={newBookingData}
        />
      )}
    </>
  )
}

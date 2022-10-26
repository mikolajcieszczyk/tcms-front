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
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const DnDCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment)

const now = new Date()

const testEvents = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Planning Meeting with Paige',
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: 'Inconvenient Conference Call',
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: 'Quote Follow-up - Tea by Tina',
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
  {
    id: 16,
    title: 'Video Record',
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: 'Dutch Song Producing',
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: 'Itaewon Halloween Meeting',
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: 'Online Coding Test',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: 'An overlapped Event',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: 'Phone Interview',
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: 'Cooking Class',
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: 'Go to the gym',
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
]

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
        <DnDCalendar
          localizer={localizer}
          events={testEvents}
          draggableAccessor={(event) => true}
          resources={resourceMap}
          views={{
            day: true,
          }}
        />
        {/* <Calendar
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
        /> */}
      </div>
    </>
  )
}
Scheduler.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar'

import moment from 'moment'
moment.locale('en-GB')

const localizer = momentLocalizer(moment)

const events = [
	{
		id: 0,
		title: 'Kowalski',
		start: moment('2022-10-03 12:00').toDate(),
		end: moment('2022-10-03 16:00').toDate(),
		resourceId: 1,
	},
	{
		id: 1,
		title: 'Cięszczyk',
		start: moment('2022-10-03 10:00').toDate(),
		end: moment('2022-10-03 12:00').toDate(),
		resourceId: 2,
	},
	{
		id: 2,
		title: 'Nowak',
		start: moment('2022-10-03 08:00').toDate(),
		end: moment('2022-10-03 10:00').toDate(),
		resourceId: 3,
	},
	{
		id: 11,
		title: 'Birthday Party',
		start: moment('2022-10-03 23:00').toDate(),
		end: moment('2022-10-03 24:00').toDate(),
		resourceId: 4,
	},
]

const resourceMap = [
	{ resourceId: 1, resourceTitle: 'Court 1' },
	{ resourceId: 2, resourceTitle: 'Court 2' },
	{ resourceId: 3, resourceTitle: 'Court 3' },
	{ resourceId: 4, resourceTitle: 'Court 4' },
]

export default function Scheduler() {
	const { defaultDate, formats, views } = useMemo(
		() => ({
			defaultDate: new Date(2015, 3, 13),
			formats: {
				timeGutterFormat: (
					date: any,
					culture: any,
					localizer: { format: (arg0: any, arg1: string, arg2: any) => any },
				) => localizer.format(date, 'hh:mm a', culture),
			},
			views: [Views.WEEK, Views.DAY],
		}),
		[],
	)
	return (
		<Fragment>
			<div className='height600'>
				<Calendar
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
					views={{
						day: true,
						month: true,
						week: true,
					}}
				/>
			</div>
		</Fragment>
	)
}
Scheduler.propTypes = {
	localizer: PropTypes.instanceOf(DateLocalizer),
}

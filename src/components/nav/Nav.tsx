import React, { useState } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default function Nav() {
	const [activeItem, setActiveItem] = useState('bio')

	return (
		<Menu fluid vertical>
			<Menu.Item
				name='Bookings'
				active={activeItem === 'bio'}
				onClick={() => setActiveItem('bio')}
			>
				Bookings
				<Icon name='gamepad' />
			</Menu.Item>
			<Menu.Item
				name='Clients'
				active={activeItem === 'pics'}
				onClick={() => setActiveItem('pics')}
			>
				Clients
				<Icon name='gamepad' />
			</Menu.Item>
			<Menu.Item
				outline
				name='Courts'
				active={activeItem === 'companies'}
				onClick={() => setActiveItem('companies')}
			>
				Courts
				<Icon name='gamepad' />
			</Menu.Item>
			<Menu.Item
				name='Stats'
				active={activeItem === 'links'}
				onClick={() => setActiveItem('links')}
			>
				Stats
				<Icon name='gamepad' />
			</Menu.Item>
		</Menu>
	)
}

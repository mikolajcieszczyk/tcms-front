import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import Nav from '../nav/Nav'

import Logo from '../../img/logo.png'

export default function PageLayout(): React.ReactElement {
	return (
		<Grid doubling columns={2}>
			<Grid.Row>
				<Grid.Column width={3}>
					<Segment>
						<img src={logo} />
					</Segment>
				</Grid.Column>
				<Grid.Column width={13}>
					<Segment textAlign='right'>user</Segment>
				</Grid.Column>
			</Grid.Row>

			<Grid.Column width={3}>
				<Nav />
			</Grid.Column>

			<Grid.Column stretched width={13}>
				<Segment>
					<h1>
						Mollit amet irure magna reprehenderit pariatur aliquip voluptate nostrud.
					</h1>
					Irure velit est cupidatat consequat cupidatat duis ea irure laborum culpa
					mollit. Sint culpa ut dolor officia culpa fugiat id esse. Occaecat fugiat ut
					nisi est enim consectetur minim esse et labore mollit. Eu enim esse eu aliquip.
					Fugiat tempor adipisicing ad sunt velit quis labore sint cupidatat reprehenderit
					anim sit esse. Et officia consequat labore cillum exercitation culpa aliqua do
					Lorem. Incididunt laboris esse voluptate pariatur incididunt duis sunt. Proident
					minim ad ea ut exercitation enim dolore consectetur voluptate aliqua. Minim
					pariatur laboris anim consectetur consectetur consectetur in ipsum. Do magna
					nostrud ea laborum id do culpa consectetur ea. Laboris consequat sit
					exercitation Lorem irure aliqua labore incididunt dolor culpa excepteur deserunt
					excepteur. Proident aliqua dolore excepteur qui exercitation incididunt culpa.
					Do in irure mollit voluptate. Anim enim nulla cillum cillum ex anim dolor duis
					officia tempor nostrud ex laborum adipisicing. Exercitation ad eu incididunt
					tempor id consequat eu duis non. Velit dolor nulla sit veniam aliquip ullamco
				</Segment>
			</Grid.Column>
		</Grid>
	)
}

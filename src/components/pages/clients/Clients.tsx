import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Label,
  Modal,
  ModalProps,
  Table,
} from 'semantic-ui-react'
import axios from '../../../api/axios'
import AddClient from './AddClient'
import EditClient from './EditClient'

export interface IClientsData {
  age: number
  email: string
  id: string
  gender: string
  name: string
  phone: number
  skills: string
  surname: string
}

export default function Clients() {
  const [clientsList, setClientsList] = useState<IClientsData[]>()
  const [view, setView] = useState('clientsList')
  const [openClientInfoModal, setOpenClientInfoModal] = useState(false)
  const getClients = async () => {
    try {
      const response = await axios.get('/clients')
      // console.log(response?.data)
      setClientsList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenClientsInfo = (e: any) => {
    setOpenClientInfoModal(!openClientInfoModal)
  }

  useEffect(() => {
    getClients()
  }, [view, clientsList])

  return (
    <Grid textAlign='center' padded>
      <Grid.Row>
        <Grid.Column>
          <Button.Group>
            <Button icon onClick={() => setView('clientsList')}>
              <Icon name='list' /> <span>List</span>
            </Button>
            <Button icon onClick={() => setView('addClient')}>
              <Icon name='add user' /> <span>Add client</span>
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>

      {view === 'clientsList' && (
        <>
          <Table striped celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Surname</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Skills</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {clientsList?.map((item, index) => {
                // console.log(item)
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.surname}</Table.Cell>
                      <Table.Cell>{item.age}</Table.Cell>
                      <Table.Cell>{item.gender}</Table.Cell>
                      <Table.Cell>{item.phone}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.skills}</Table.Cell>
                      <Table.Cell>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <EditClient id={item.id} />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  </>
                )
              })}
            </Table.Body>
          </Table>
        </>
      )}

      {view === 'addClient' && <AddClient />}
    </Grid>
  )
}

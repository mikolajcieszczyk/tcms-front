import { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import axios from '../../../api/axios'
import AddClient from './AddClient'
import EditClient from './EditClient'
import Table from 'react-bootstrap/Table'
import DeleteClient from './DeleteClient'
import NtrpFaq from '../../NtrpFaq'

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
  const [clientsList, setClientsList] = useState<IClientsData[]>(
    {} as IClientsData[],
  )
  const getClients = async () => {
    try {
      const response = await axios.get('/clients')
      setClientsList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClients()
  }, [clientsList])

  return (
    <Grid textAlign='center' padded>
      <Grid.Row>
        <Grid.Column>
          <AddClient />
        </Grid.Column>
      </Grid.Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clientsList.length &&
            clientsList.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.skills}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-evenly' }}
                  >
                    <EditClient id={item.id} />
                    <DeleteClient data={item} />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </Grid>
  )
}

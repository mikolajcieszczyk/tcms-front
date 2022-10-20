import { SubmitButton, ResetButton } from 'formik-semantic-ui-react'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  Header,
  Button,
  Icon,
  Form,
  FormGroup,
  Dimmer,
  Loader,
  Confirm,
} from 'semantic-ui-react'
import axios from '../../../api/axios'
import { IClientsData } from './Clients'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { skillsOptions } from './AddClient'

interface IProps {
  id: string
}

interface RegisterData {
  name: string | undefined
  surname: string | undefined
  age: number | undefined
  email: string | undefined
  phone: number | undefined
  skills: string | undefined
  gender: string | undefined
}

export default function EditClient({ id }: IProps) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [clientData, setClientData] = useState<IClientsData>({} as IClientsData)
  const [openQuitConfirm, setOpenQuitConfirm] = useState(false)
  const [isSaveConfirmed, setIsSaveConfirmed] = useState<boolean>(false)

  const requestData = async () => {
    setOpen(true)

    try {
      const request = await axios.get(`http://localhost:4000/clients/${id}`)

      // console.log(Object.values(request.data).length)

      if (Object.values(request.data).length !== 0) {
        setTimeout(() => {
          setClientData(request.data)
          setIsLoading(false)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const initialFormValue: RegisterData = {
    name: clientData?.name,
    surname: clientData?.surname,
    age: clientData?.age,
    email: clientData?.email,
    phone: clientData?.phone,
    gender: clientData?.gender,
    skills: clientData?.skills,
  }

  const validationScheme = Yup.object().shape({
    name: Yup.string().max(20, 'Must be 20 characters or less').required(),
    surname: Yup.string().max(30, 'Must be 30 characters or less').required(),
    age: Yup.number().min(1, 'Minimum one digit required').required(),
    email: Yup.string().email('Invalid email address').required(),
    phone: Yup.string()
      .matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/i, 'invalid phone')
      .min(8, 'Must be at least 8 digits')
      .max(15, 'Must be 15 digits or less')
      .required(),
    gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required(),
    skills: Yup.string().required(),
  })

  const onSubmit = async (values: RegisterData) => {
    console.log(values)

    try {
      const editClient = await axios.patch(`http://localhost:4000/clients/update/${id}`, values)
      // console.log(editClient)
      console.log('Data saved')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteClient = async () => {
    try {
      const clientToDelete = await axios.delete(
        `http://localhost:4000/clients/remove/${parseInt(id)}`,
      )

      console.log(clientToDelete)
    } catch (error) {
      console.log(error)
    }
  }

  const genderOptions = [
    {
      id: 'male',
      key: 'M',
      text: 'Male',
      value: 'Male',
    },
    {
      id: 'female',
      key: 'F',
      text: 'Female',
      value: 'Female',
    },
    {
      id: 'other',
      key: 'O',
      text: 'Other',
      value: 'Other',
    },
  ]

  const handleConfirm = () => {
    setOpenQuitConfirm(true)
  }

  const handleCancelConfirm = () => {
    setOpen(true)
    setOpenQuitConfirm(false)
  }

  const handleApproveConfirm = () => {
    setOpen(false)
    setOpenQuitConfirm(false)
  }

  return (
    <Modal
      onOpen={() => requestData()}
      open={open}
      trigger={
        <Button>
          <Icon name='edit' /> Edit
        </Button>
      }
      size='large'
    >
      <Modal.Content>
        <Modal.Description>
          {isLoading ? (
            <Dimmer active>
              <Loader indeterminate>Preparing Data</Loader>
            </Dimmer>
          ) : (
            <>
              <Header>
                {clientData?.name} {clientData?.surname}
              </Header>

              <Formik
                initialValues={initialFormValue}
                validationSchema={validationScheme}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  handleReset,
                  setFieldValue,
                }) => (
                  <Form size='large' onSubmit={handleSubmit}>
                    <Form.Group widths={3}>
                      <Form.Input
                        id='input-name'
                        errorPrompt
                        errorConfig={{
                          prompt: false,
                          basic: false,
                          color: 'green',
                          pointing: 'below',
                        }}
                        name='name'
                        label='Name'
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                        defaultValue={clientData?.name}
                      />
                      {touched.name && errors.name ? (
                        <div className='error-message'>{errors.name}</div>
                      ) : null}
                      <Form.Input
                        id='input-surname'
                        errorPrompt
                        errorConfig={{
                          prompt: false,
                          basic: true,
                          color: 'blue',
                        }}
                        name='surname'
                        label='Surname'
                        value={values.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.surname && errors.surname ? (
                        <div className='error-message'>{errors.surname}</div>
                      ) : null}
                      <Form.Input
                        id='input-age'
                        errorPrompt
                        errorConfig={{
                          prompt: false,
                          basic: true,
                          color: 'blue',
                        }}
                        name='age'
                        label='Age'
                        type='number'
                        defaultValue={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={{
                        //   content: 'Please enter a valid email address',
                        //   pointing: 'below',
                        // }}
                      />
                      {touched.age && errors.age ? (
                        <div className='error-message'>{errors.age}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Input
                        id='input-email'
                        errorPrompt
                        name='email'
                        label='Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email ? (
                        <div className='error-message'>{errors.email}</div>
                      ) : null}
                      <Form.Input
                        id='input-phone'
                        errorPrompt
                        name='phone'
                        label='Phone'
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.phone && errors.phone ? (
                        <div className='error-message'>{errors.phone}</div>
                      ) : null}
                    </Form.Group>
                    <Form.Group widths={2}>
                      <Form.Select
                        id='gender'
                        name='gender'
                        defaultValue={clientData?.gender}
                        label='Gender'
                        placeholder='Select gender'
                        fluid
                        selection
                        scrolling
                        options={genderOptions}
                        onChange={(_, { value }) => setFieldValue('gender', value)}
                        onBlur={handleBlur}
                      />
                      {touched.gender && errors.gender ? (
                        <div className='error-message'>{errors.gender}</div>
                      ) : null}
                      <Form.Select
                        id='skills'
                        name='skills'
                        defaultValue={clientData?.skills}
                        label='NTRP'
                        placeholder="Select Client's NTRP"
                        fluid
                        selection
                        scrolling
                        options={skillsOptions}
                        onChange={(_, { value }) => setFieldValue('skills', value)}
                        onBlur={handleBlur}
                        // error={{
                        //   content: 'Please enter a valid email address',
                        //   pointing: 'below',
                        // }}
                      />
                      {touched.skills && errors.skills ? (
                        <div className='error-message'>{errors.skills}</div>
                      ) : null}
                    </Form.Group>

                    <FormGroup>
                      <ResetButton
                        color='blue'
                        fluid
                        width={8}
                        onClick={handleReset}
                        labelPosition='left'
                        icon='save'
                        // onClick={() => handleConfirmPopup('reset')}
                      >
                        <Icon name='redo' /> Reset
                      </ResetButton>

                      <SubmitButton
                        color='green'
                        fluid
                        width={8}
                        labelPosition='left'
                        icon='save'
                        // onClick={() => handleConfirmPopup('save')}
                        disabled={Object.values(errors).length ? true : false}
                      >
                        <Icon name='save' /> Save changes
                      </SubmitButton>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
              <Button
                content='Delete Client'
                labelPosition='left'
                icon='delete'
                negative
                onClick={() => handleDeleteClient()}
              />
              <Confirm
                open={openQuitConfirm}
                onCancel={() => handleCancelConfirm()}
                onConfirm={() => handleApproveConfirm()}
                content='Are you sure you want to quit?'
              />
            </>
          )}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Close'
          labelPosition='left'
          icon='checkmark'
          onClick={() => handleConfirm()}
        />
      </Modal.Actions>
    </Modal>
  )
}

import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormikHelpers } from 'formik/dist/types'
import { FormField, FormGroup } from 'semantic-ui-react'
import {
  Checkbox,
  Form,
  Input,
  Radio,
  ResetButton,
  Select,
  SubmitButton,
} from 'formik-semantic-ui-react'
import { StyledForm, StyledInput } from './AddClient.styled'
import axios from '../../../api/axios'

interface RegisterData {
  name: string
  surname: string
  age: number
  email: string
  phone: string
  skills: string
  gender: string
}

interface Props<Values> {
  onSubmit?: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>
  isSubmitting?: boolean
}

export const skillsOptions = [
  { key: '1', text: 'NTRP 1.0', value: 'NTRP 1.0' },
  { key: '2', text: 'NTRP 1.5', value: 'NTRP 1.5' },
  { key: '3', text: 'NTRP 2.0', value: 'NTRP 2.0' },
  { key: '4', text: 'NTRP 2.5', value: 'NTRP 2.5' },
  { key: '5', text: 'NTRP 3.0', value: 'NTRP 3.0' },
  { key: '6', text: 'NTRP 3.5', value: 'NTRP 3.5' },
  { key: '7', text: 'NTRP 4.0', value: 'NTRP 4.0' },
  { key: '8', text: 'NTRP 4.5', value: 'NTRP 4.5' },
  { key: '9', text: 'NTRP 5.0', value: 'NTRP 5.0' },
  { key: '10', text: 'NTRP 5.5', value: 'NTRP 5.5' },
  { key: '11', text: 'NTRP 6.0', value: 'NTRP 6.0' },
  { key: '12', text: 'NTRP 6.5', value: 'NTRP 6.5' },
  { key: '13', text: 'NTRP 7.0', value: 'NTRP 7.0' },
]

const AddClient = (props: Props<RegisterData>) => {
  const initialFormValue: RegisterData = {
    name: '',
    surname: '',
    age: 0,
    email: '',
    phone: '',
    gender: '',
    skills: '',
  }

  const validationScheme = Yup.object({
    name: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    surname: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
    age: Yup.number().required(),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string()
      .matches(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/i, 'invalid phone')
      .min(8, 'Must be at least 8 digits')
      .max(15, 'Must be 15 digits or less')
      .required('Required'),

    gender: Yup.string().oneOf(['Male', 'Female', 'Other']).required(),
    skills: Yup.string().required(),
  })

  const onSubmit = async (values: RegisterData) => {
    console.log(values)

    try {
      const addNewClient = await axios.post('/clients/add', values)
      console.log(addNewClient)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValue}
        validationSchema={validationScheme}
        onSubmit={onSubmit}
      >
        <StyledForm size='large' inverted>
          <StyledInput
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
            placeholder='Name'
          />
          <StyledInput
            id='input-surname'
            errorPrompt
            errorConfig={{
              prompt: false,
              basic: true,
              color: 'blue',
            }}
            name='surname'
            label='Surname'
            placeholder='Surname'
          />
          <StyledInput
            id='input-age'
            errorPrompt
            errorConfig={{
              prompt: false,
              basic: true,
              color: 'blue',
            }}
            name='age'
            label='Age'
            placeholder='Age'
            type='number'
          />
          <StyledInput
            id='input-email'
            errorPrompt
            name='email'
            label='Email'
            placeholder='Email'
          />
          <StyledInput
            id='input-phone'
            errorPrompt
            name='phone'
            label='Phone'
            placeholder='Phone'
          />

          <FormField>
            <label>Gender</label>
            <FormGroup inline>
              <Radio id='radio-gender-male' name='gender' label='Male' value='Male' />
              <Radio id='radio-gender-female' name='gender' label='Female' value='Female' />
              <Radio
                id='radio-gender-other'
                errorPrompt
                name='gender'
                label='Other'
                value='Other'
              />
            </FormGroup>
          </FormField>
          <Select
            id='select-skills'
            label='NTRP'
            errorPrompt
            name='skills'
            selectOnBlur={false}
            clearable
            placeholder="Select Client's NTRP"
            options={skillsOptions}
          />
          <FormGroup unstackable>
            <SubmitButton primary fluid width={8}>
              Submit
            </SubmitButton>
            <ResetButton color='green' fluid width={8}>
              Reset
            </ResetButton>
          </FormGroup>
        </StyledForm>
      </Formik>
    </div>
  )
}

export default AddClient

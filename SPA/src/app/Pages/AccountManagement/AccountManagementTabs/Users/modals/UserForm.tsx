export enum FormType {
    Create = 'CREATE',
    Update = 'UPDATE'
}
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import ApolloClientSingleton from '../../../../../utils/ApolloClientSingleton'
import { gql } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/reducers/rootReducer'
import { useState } from 'react'
import MotusSelectBox from '../../../../CommonComponents/MotusSelectBox'

interface UserFormProps {
    formType: FormType
    submitButtonLabel?: string
}

const createUserSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    roles: Yup.array().of(Yup.string()).required('At least one role is required'),
    image: Yup.string()
})

const updateUserSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    roles: Yup.array().of(Yup.string()).required('At least one role is required'),
    image: Yup.string()
})

export default function UserForm({ formType, submitButtonLabel = 'Save' }: Readonly<UserFormProps>) {
    const user = useSelector((state: RootState) => state.userReducer.selectedUser)

    const initialValues = {
        id: user?.id || '',
        fullname: user?.fullname || '',
        email: user?.email || '',
        password: '', // For security reasons, passwords are not preloaded
        roles: user?.roles || [],
        image: user?.image || ''
    }

    const isCreateForm = formType === FormType.Create

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={isCreateForm ? createUserSchema : updateUserSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('Form Data:', values, isCreateForm)
                // Here, you would call your GraphQL mutation based on the form type
                if (isCreateForm) {
                    console.log('Creating user...')
                    await createUser(values)
                } else {
                    console.log('Updating user...')
                    await updateUser(values)
                }
                setSubmitting(false)
            }}>
            {({ handleSubmit, errors, touched, setFieldValue }) => {
                const handleFileSelect = file => {
                    // Convert file to base64 string
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                        setFieldValue('image', reader.result)
                    }
                }
                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-12">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Profile Image</Form.Label>
                                    <img src={initialValues.image} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                                    <Button onClick={() => document.getElementById('fileUploader').click()}>Edit</Button>
                                    <input id="fileUploader" type="file" onChange={e => handleFileSelect(e.target.files[0])} style={{ display: 'none' }} />
                                    <ErrorMessage name="image" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Field name="fullname" type="text" className={`form-control ${touched.fullname && errors.fullname ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="fullname" component="div" className="invalid-feedback" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Field name="email" type="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Roles</Form.Label>
                                    <Field
                                        name="roles"
                                        as={MotusSelectBox}
                                        isMultiSelect={true}
                                        closeMenuOnSelect={true}
                                        options={roleOptions}
                                        className={`form-control ${touched.roles && errors.roles ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="roles" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit">{submitButtonLabel}</Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

async function createUser(values) {
    const response = await ApolloClientSingleton.getInstance().query({
        query: gql`
            mutation CreateUser($input: CreateUserInput!) {
                createUser(input: $input) {
                    status
                    hasErrors
                    errors
                    entity {
                        id
                        createdBy
                        createdAt
                        updatedBy
                        updatedAt
                        deletedBy
                        deletedAt
                    }
                }
            }
        `,
        variables: {
            input: {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                roles: values.roles,
                image: values.image
            }
        }
    })
    return response.data.createUser
}

async function updateUser(values) {
    // Call the update user mutation
    const response = await ApolloClientSingleton.getInstance().query({
        query: gql`
            mutation UpdateUser($input: UpdateUserInput!) {
                updateUser(input: $input) {
                    status
                    hasErrors
                    errors
                    entity {
                        id
                        createdBy
                        createdAt
                        updatedBy
                        updatedAt
                        deletedBy
                        deletedAt
                    }
                }
            }
        `,
        variables: {
            input: {
                id: values.id,
                fullname: values.fullname,
                email: values.email,
                roles: values.roles,
                image: values.image
            }
        }
    })
    return response.data.updateUser
}

function FileUploader({ onFileSelect }) {
    const [file, setFile] = useState('') // state for storing actual image

    // handles file upload event
    const handleFileInput = e => {
        setFile(e.target.files[0])
        onFileSelect(e.target.files[0])
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} />
        </div>
    )
}

const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' }
    // Diğer roller buraya eklenebilir
]

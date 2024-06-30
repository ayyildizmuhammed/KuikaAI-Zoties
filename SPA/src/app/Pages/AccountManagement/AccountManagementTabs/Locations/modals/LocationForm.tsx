import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import { useIntl } from 'react-intl'

// Define the validation schema
const locationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    image: Yup.string().required('Image is required')
})

const LocationForm = ({ formType, onClose, selectedLocation }) => {
    const intl = useIntl()

    // Define initial form values
    const initialValues =
        formType === 'UPDATE' && selectedLocation
            ? {
                  name: selectedLocation.name,
                  address: selectedLocation.address,
                  image: selectedLocation.image
              }
            : {
                  name: '',
                  address: '',
                  image: ''
              }

    const executeMutation = async values => {
        // Placeholder for the actual mutation logic
        console.log('Submitting values:', values)
        // Here you would typically use ApolloClient to run your mutation, like:
        // await ApolloClientSingleton.getInstance().mutate({ mutation: YOUR_GRAPHQL_MUTATION, variables: values });

        // Simulate a server response delay
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Function to handle file selection and convert to base64
    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFieldValue('image', reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={locationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                await executeMutation(values)
                setSubmitting(false)
                resetForm()
                onClose() // Close the modal on successful submission
            }}>
            {formik => (
                <FormikForm>
                    <Form.Group className="mb-3">
                        <Form.Label>{intl.formatMessage({ id: 'NAME' })}</Form.Label>
                        <Field name="name" type="text" className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} />
                        <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{intl.formatMessage({ id: 'ADDRESS' })}</Form.Label>
                        <Field name="address" type="text" className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`} />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>{intl.formatMessage({ id: 'IMAGE' })}</Form.Label>
                        <input
                            id="file"
                            name="image"
                            type="file"
                            onChange={event => handleFileChange(event, formik.setFieldValue)}
                            className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                        />
                        <ErrorMessage name="image" component="div" className="invalid-feedback" />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={onClose} className="me-2">
                            {intl.formatMessage({ id: 'CANCEL' })}
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            {formType === 'CREATE' ? intl.formatMessage({ id: 'CREATE' }) : intl.formatMessage({ id: 'UPDATE' })}
                        </Button>
                    </div>
                </FormikForm>
            )}
        </Formik>
    )
}

export default LocationForm

import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import { addLocation } from '../../../redux/reducers/locationReducer'
import Location from '../../../modules/dal/models/Location'

// Yup validasyon şeması
const locationSchema = Yup.object().shape({
    name: Yup.string().required('Location name is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string()
    // numberOfCameras: Yup.number().required('Number of cameras is required').positive().integer(),
    // numberOfStaff: Yup.number().required('Number of staff is required').positive().integer(),
    // status: Yup.string().required('Status is required'),
    // imageUrl: Yup.string().url('Invalid URL').required('Image URL is required')
})

interface EditLocationFormProps {
    location: Location | null
    submitButtonLabel?: string
}

export default function EditLocationForm({ location, submitButtonLabel = 'Save' }: Readonly<EditLocationFormProps>) {
    const dispatch = useDispatch()

    const initialValues = {
        name: location?.name || '',
        address: location?.address || '',
        image: location?.image || ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={locationSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log('Form Data:', values)

                if (location) {
                    // Edit location
                } else {
                    const newLocation = new Location({ name: values.name, address: values.address, image: values.image })
                    dispatch(addLocation(newLocation))
                }
                setSubmitting(false)
            }}>
            {({ handleSubmit, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    {/* Form alanları buraya eklenecek. Örnek olarak: */}
                    <Row className="mb-12">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Location Name</Form.Label>
                                <Field name="name" type="text" className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </Form.Group>
                        </Col>
                        {/* Diğer alanlar benzer şekilde eklenecek */}
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Address 1</Form.Label>
                                <Field name="address1" type="text" className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="address1" component="div" className="invalid-feedback" />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>İmage</Form.Label>
                                <Field name="address2" type="text" className={`form-control ${touched.image && errors.image ? 'is-invalid' : ''}`} />
                                <ErrorMessage name="address2" component="div" className="invalid-feedback" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit">{submitButtonLabel} </Button>
                </Form>
            )}
        </Formik>
    )
}

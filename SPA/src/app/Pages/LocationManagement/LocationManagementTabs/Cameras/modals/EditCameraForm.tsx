import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ECameraType } from 'src/app/modules/dal/enums/ECameraType'
import Camera from 'src/app/modules/dal/models/Camera'


// Yup validasyon şeması
const cameraSchema = Yup.object().shape({
    name: Yup.string().required('Camera name is required'),
    type: Yup.mixed<ECameraType>().oneOf(Object.values(ECameraType)).required('Camera type is required'),
    address: Yup.string().required('Camera address is required'),
    snapshot_url: Yup.string().required('Snapshot URL is required').url('Invalid URL'),
    stream_url: Yup.string().required('Stream URL is required').url('Invalid URL')
})

interface EditCameraFormProps {
    camera: Camera | null
    submitButtonLabel?: string
}

export default function EditCameraForm(props: Readonly<EditCameraFormProps>) {
    const camera = props.camera || new Camera(null)
    return (
        <Formik
            initialValues={{
                name: camera.name || '',
                type: camera.type || 'ipcamera',
                address: camera.address || '',
                snapshot_url: camera.snapshot_url || '',
                stream_url: camera.stream_url || ''
            }}
            validationSchema={cameraSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log('Form Data:', values)
                setSubmitting(false)
            }}>
            {({ handleSubmit, errors, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <label htmlFor="name">Camera Name:</label>
                            <Field name="name" type="text" className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </Col>

                        <Col md={6}>
                            <label htmlFor="type">Camera Type:</label>
                            <Field name="type" as="select" className={`form-control ${touched.type && errors.type ? 'is-invalid' : ''}`}>
                                {Object.values(ECameraType).map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="type" component="div" className="invalid-feedback" />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <label htmlFor="address">Camera IP Address:</label>
                            <Field name="address" type="text" className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="address" component="div" className="invalid-feedback" />
                        </Col>

                        <Col md={6}>
                            <label htmlFor="snapshot_url">Snapshot URL:</label>
                            <Field name="snapshot_url" type="text" className={`form-control ${touched.snapshot_url && errors.snapshot_url ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="snapshot_url" component="div" className="invalid-feedback" />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <label htmlFor="stream_url">Stream URL</label>
                            <Field name="stream_url" type="text" className={`form-control ${touched.stream_url && errors.stream_url ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="stream_url" component="div" className="invalid-feedback" />
                        </Col>
                    </Row>
                    

                    <Button type="submit" className="mt-3">
                        {props.submitButtonLabel || 'Save'}
                    </Button>
                </Form>
            )}
        </Formik>
        
    )
}

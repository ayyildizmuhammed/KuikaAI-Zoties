import { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { FileUploadModal } from '../Modals/FileUploadModal'
import './KuikaBanner.scss'
import FileUpload from '../Modals/FileUpload'

export const KuikaBanner = ({ title, handleFileUpload }) => {
    const [addFileModalVisible, setAddFileModalVisible] = useState(false)

    const toggleAddFileModal = () => {
        setAddFileModalVisible(!addFileModalVisible)
    }

    return (
        <div>
            {/* <FileUploadModal show={addFileModalVisible} handleClose={toggleAddFileModal} handleFileUpload={handleFileUpload} /> */}
            <div className="selected-filters-banner">
                <Row className="align-items-center justify-content-between">
                    <Col className="d-flex align-items-center">
                        <h3 className="card-title align-items-start flex-column">
                            <span className="card-label fw-bold fs-4 mb-1">{title}</span>
                        </h3>
                    </Col>
                    <Col xs="auto">
                        <FileUpload onFileUpload={handleFileUpload} handleClose={toggleAddFileModal} />
                        {/* <Button
                            variant="primary"
                            title="Add new file"
                            className="btn-icon-primary p-0"
                            onClick={toggleAddFileModal}
                            style={{ fontSize: '1rem', height: '44px', width: '120px', padding: '0 16px' }}>
                            Upload Document
                        </Button> */}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

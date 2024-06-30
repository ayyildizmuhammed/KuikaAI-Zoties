import { useState } from 'react'
import Content from 'src/_metronic/layout/components/content/Content'

import axios from 'axios'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import './KuikaMain.css' // CSS dosyasını ekleyelim
import { KuikaBanner } from './components/KuikaBanner'
import { Button } from 'react-bootstrap'
import { LoadingIndicator } from './components/LoadingIndicator'
import { SuggestionModal } from './Modals/SuggestionModal'

export default function KuikaMain() {
    const [summary, setSummary] = useState(null)
    const [jsonOutput, setJsonOutput] = useState(null)
    const [suggestions, setSuggestions] = useState(null)
    const [jsonError, setJsonError] = useState(null)
    const [loadingVisible, setLoadingVisible] = useState(false)
    const [showSuggestionsModal, setShowSuggestionsModal] = useState(false)

    const handleFileUpload = file => {
        const formData = new FormData()
        formData.append('file', file)
        setLoadingVisible(true)

        axios
            .post('/api/analysis/upload-document', formData)
            .then(response => {
                console.log('response:', response)
                setSummary(response.data.summary)
                setJsonOutput(response.data.jsonOutput)
                setSuggestions(response.data.suggestions)
                setJsonError(null) // Reset JSON error
            })
            .catch(error => {
                console.error('File upload error:', error)
            })
            .finally(() => {
                setLoadingVisible(false)
            })
    }

    const handleJsonChange = e => {
        if (e.error) {
            setJsonError(e.error)
        } else {
            setJsonError(null)
            setJsonOutput(e.jsObject)
        }
    }

    const toggleSuggestionModal = () => {
        setShowSuggestionsModal(!showSuggestionsModal)
    }

    const handleExportJson = () => {
        if (!jsonError) {
            const jsonString = JSON.stringify(jsonOutput, null, 2)
            const blob = new Blob([jsonString], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'jsonOutput.json'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const renderSummary = () => {
        console.log('summary:', summary)
        return <div className="summary-content" dangerouslySetInnerHTML={{ __html: summary.html }} />
    }

    return (
        <Content>
            <KuikaBanner title="Analysis Document Analyzer" handleFileUpload={handleFileUpload} />
            <SuggestionModal show={showSuggestionsModal} handleClose={toggleSuggestionModal} content={suggestions} />
            {loadingVisible && <LoadingIndicator isLoading={loadingVisible} blurBackground={true} position="center" size="lg" />}
            <div className="kuika-main-container">
                <div className="content-container">
                    <div className="summary-container">
                        <div className="summary-header">
                            <h3>Document Summary</h3>
                            {suggestions && (
                                <Button variant="primary" onClick={() => setShowSuggestionsModal(true)}>
                                    See Reviews
                                </Button>
                            )}
                        </div>

                        {summary && renderSummary()}
                    </div>
                    <div className="json-container">
                        <h3>JSON Output</h3>
                        {jsonOutput && (
                            <div className="json-editor-container">
                                <JSONInput id="json_editor" placeholder={jsonOutput} theme="light_mitsuketa_tribute" locale={locale} height="100%" width="100%" onChange={handleJsonChange} />
                                <div className="export-button-container">
                                    <Button onClick={handleExportJson} variant="primary" disabled={!!jsonError}>
                                        Export JSON
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Content>
    )
}

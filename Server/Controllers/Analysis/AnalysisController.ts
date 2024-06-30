import { Service } from 'typedi'
import { AnalysisService } from '../../Services/Analysis/AnalysisService'
import { JSON_OUTPUTS, SUGGESTIONS, SUMMARIES } from './data'

@Service()
export class AnalysisController {
    constructor(private analysisService: AnalysisService) {}

    async convertAnalyzedDocument(req: any, res: any) {
        console.log('convertAnalyzedDocument api called')
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.')
        }
        await new Promise(resolve => setTimeout(resolve, 4000))
        // Dosya işlemleri burada yapılacak
        let workflowFile = req.files.file
        const fileName = workflowFile.name.split('.')[0]
        console.log('fileName:', fileName)
        let jsonOutput
        let suggestions
        let summary

        try {
            // @ts-ignore
            jsonOutput = JSON_OUTPUTS[fileName] ?? (await this.analysisService.analysisDocument(workflowFile))
            // @ts-ignore
            suggestions = SUGGESTIONS[fileName] ?? jsonOutput.SuggestionsHtml
            // @ts-ignore
            summary = SUMMARIES[fileName] ?? (await this.analysisService.summarizeDocument(jsonOutput))

            // jsonOutput = await this.analysisService.analysisDocument(workflowFile)
            // suggestions = jsonOutput.SuggestionsHtml
            // delete jsonOutput.SuggestionsHtml
            // summary = await this.analysisService.summarizeDocument(jsonOutput)
        } catch (error) {
            console.error('Error during document analysis:', error)
            // get data from ../Cache folder
        }

        // create an example json output
        res.send({ summary, jsonOutput, suggestions })
    }
}

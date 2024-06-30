import { createContext, useReducer, useContext } from "react"
import { WithChildren } from "src/_metronic/helpers"
import { AnalysisFilterModel } from "./Models/AnalysisFilterModel"

interface AnalysisFiltersState {
    ageGenderAnalysis: AnalysisFilterModel
    emotionAnalysis: AnalysisFilterModel
    [key: string]: AnalysisFilterModel // Daha fazla analiz türü için dinamik alanlar
}

const initialFiltersState: AnalysisFiltersState = {
    ageGenderAnalysis: {}, // Başlangıç değerleri
    emotionAnalysis: {} // Başlangıç değerleri
}

const AnalysisFiltersContext = createContext<{
    state: AnalysisFiltersState
    setFilters: (analysisType: string, filters: AnalysisFilterModel) => void
}>({
    state: initialFiltersState,
    setFilters: () => {}
})

const AnalysisFiltersProvider: React.FC<WithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer((state: AnalysisFiltersState, action: { type: string; payload: AnalysisFilterModel }) => {
        const { type, payload } = action
        return { ...state, [type]: payload }
    }, initialFiltersState)

    const setFilters = (analysisType: string, filters: AnalysisFilterModel) => {
        dispatch({ type: analysisType, payload: filters })
    }

    return <AnalysisFiltersContext.Provider value={{ state, setFilters }}>{children}</AnalysisFiltersContext.Provider>
}

export const useAnalysisFilters = () => {
    const context = useContext(AnalysisFiltersContext)
    if (!context) {
        throw new Error('useAnalysisFilters must be used within a AnalysisFiltersProvider')
    }
    return context
}

export { AnalysisFiltersContext, AnalysisFiltersProvider }

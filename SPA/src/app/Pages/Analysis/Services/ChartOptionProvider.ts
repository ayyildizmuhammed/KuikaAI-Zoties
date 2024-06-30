import { AnalysisFilterModel } from '../Filter/Models/AnalysisFilterModel'
import { DataProvider } from './DataProvider'

export abstract class ChartOptionProvider extends DataProvider {
    data: any[] // Veri kaynağından gelen veriler
    private listeners: Array<() => void> = []

    constructor(public filters?: AnalysisFilterModel) {
        super()
        this.filters = filters
    }

    // Veri kaynağından veri çeken metod
    abstract fetchData(): Promise<any>

    abstract getChartOptions(height?: string): Promise<ApexCharts.ApexOptions>

    // Veri kaynağını temizleyen metod
    abstract cleanup(): void

    public addListener(listener: () => void) {
        this.listeners.push(listener)
    }

    // Dinleyici kaldırmak için bir yöntem
    public removeListener(listener: () => void) {
        const index = this.listeners.indexOf(listener)
        if (index > -1) {
            this.listeners.splice(index, 1)
        }
    }

    // Veri güncellendiğinde tüm dinleyicileri tetikleyen bir yöntem
    protected notifyListeners() {
        for (const listener of this.listeners) {
            listener()
        }
    }

    // Veri güncelleme işlemi
    public updateData() {
        // Veri güncelleme işlemleri...

        // Veri güncellendiğinde dinleyicileri tetikle
        this.notifyListeners()
    }
}

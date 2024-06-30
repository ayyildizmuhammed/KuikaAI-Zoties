import { useLayout } from '../../../core'
import { PageTitle } from './PageTitle'

export default function PageTitleWrapper() {
    const { config } = useLayout()
    if (!config.app?.pageTitle?.display) {
        return null
    }

    return <PageTitle />
}

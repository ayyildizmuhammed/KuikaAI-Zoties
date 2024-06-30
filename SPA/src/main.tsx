import { createRoot } from 'react-dom/client'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
// Apps
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import './_metronic/assets/sass/style.scss'
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
import { Provider } from 'react-redux'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/

import { AuthProvider, setupAxios } from './app/modules/auth'

import AppRoutes from './app/routing/AppRoutes'
import store from './app/redux/store'
import '../src/app/modules/common/styles.scss'

setupAxios(axios)
Chart.register(...registerables)

const container = document.getElementById('root')
if (container) {
    createRoot(container).render(
        <Provider store={store}>
            <MetronicI18nProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </MetronicI18nProvider>
        </Provider>
    )
}

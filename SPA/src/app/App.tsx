import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { ThemeModeProvider } from '../_metronic/partials'
import { ApolloProvider } from '@apollo/client'
import ApolloClientSingleton from './utils/ApolloClientSingleton'
import { AuthInit } from './modules/auth'

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <I18nProvider>
                <LayoutProvider>
                    <ThemeModeProvider>
                        <AuthInit>
                            <ApolloProvider client={ApolloClientSingleton.getInstance()}>
                                    <Outlet />
                                    <MasterInit />
                            </ApolloProvider>
                        </AuthInit>
                    </ThemeModeProvider>
                </LayoutProvider>
            </I18nProvider>
        </Suspense>
    )
}

export { App }

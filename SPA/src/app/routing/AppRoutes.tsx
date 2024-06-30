import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'
import PrivateRoutes from './PrivateRoutes'


const { BASE_URL } = import.meta.env

export default function AppRoutes() {
    const { currentUser } = useAuth()
    // Bu örnekte, kullanıcı durumunu simüle etmek için currentUser her zaman true olarak ayarlanmıştır.
    // Gerçek bir uygulamada, useAuth hook'undan gelen currentUser değerini kullanabilirsiniz.
    // const currentUser = true

    return (
        <BrowserRouter basename={BASE_URL}>
            <Routes>
                <Route element={<App />}>
                    <Route path="error/*" element={<ErrorsPage />} />
                    <Route path="logout" element={<Logout />} />
                    {currentUser ? (
                        <Route path="/*" element={<PrivateRoutes />} />
                    ) : (
                        <>
                            <Route path="auth/*" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

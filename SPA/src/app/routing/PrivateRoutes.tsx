import { Route, Routes, Navigate } from 'react-router-dom'
import MasterLayout from '../../_metronic/layout/MasterLayout'
import KuikaMain from '../Pages/Kuika/KuikaMain'


export default function PrivateRoutes() {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path="auth/*" element={<Navigate to="/" />} />
                {/* Pages */}
                <Route path="/dashboard" element={<KuikaMain />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
        </Routes>
    )
}

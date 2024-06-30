import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { PageTitle } from 'src/_metronic/layout/core'
import UserList from '../AccountManagement/AccountManagementTabs/Users/UserList'
import LocationManagementPageHeader from './LocationManagementPageHeader/LocationManagementPageHeader'
import CameraList from './LocationManagementTabs/Cameras/CameraList'
import SessionList from './LocationManagementTabs/Sessions/SessionList'

export default function LocationManagementPage() {
    return (
        <Routes>
            <Route
                element={
                    <>
                        <LocationManagementPageHeader />
                        <Outlet />
                    </>
                }>
                <Route
                    path="/cameras"
                    element={
                        <>
                            <PageTitle>Cameras</PageTitle>
                            <CameraList></CameraList>
                        </>
                    }
                />
                <Route
                    path="/staff"
                    element={
                        <>
                            <PageTitle>Staff</PageTitle>
                            <UserList></UserList>
                        </>
                    }
                />
                <Route
                    path="/sessions"
                    element={
                        <>
                            <PageTitle>Staff</PageTitle>
                            <SessionList></SessionList>
                        </>
                    }
                />
                <Route // prettier-ignore
                    path="/"
                    element={<Navigate to="cameras" replace />}
                />
            </Route>
        </Routes>
    )
}

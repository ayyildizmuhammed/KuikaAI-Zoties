import AccountManagementPageHeader from './AccountManagementPageHeader/AccountManagementPageHeader'
import { Routes, Route } from 'react-router-dom'
import ManagementLocationsList from './AccountManagementTabs/Locations/LocationList'
import ManagementUserList from './AccountManagementTabs/Users/UserList'

export default function AccountManagementPage() {
    return (
        <Routes>
            <Route
                path="/locations"
                element={
                    <>
                        <AccountManagementPageHeader />
                        <ManagementLocationsList />
                    </>
                }
            />

            <Route
                path="/users"
                element={
                    <>
                        <AccountManagementPageHeader />
                        <ManagementUserList />
                    </>
                }
            />
        </Routes>
    )
}

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../../redux/reducers/modalReducer'
import { EModalName } from '../../../../modules/dal/enums/EModalName'
import Content from '../../../../../_metronic/layout/components/content/Content'
import ToolbarWrapper from '../../../../../_metronic/layout/components/toolbar/ToolbarWrapper'
import Dropdown2 from '../../../../../_metronic/partials/content/dropdown/Dropdown2'
import { KTIcon } from '../../../../../_metronic/helpers'
// Assume there's a way to set and get users similar to locations in Redux
import { setSelectedUser } from '../../../../redux/reducers/userReducer'
import User, { generateRandomUserData } from '../../../../modules/dal/models/User'
import ApolloClientSingleton from '../../../../utils/ApolloClientSingleton'
import { gql } from '@apollo/client'

export default function ManagementUserList({ className = 'card card-xxl-stretch mb-5 mb-xl-8' }) {
    const dispatch = useDispatch()
    // This part assumes you have a Redux setup similar to locations for users
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        async function fetchUsers() {
            await ApolloClientSingleton.getInstance()
                .query({
                    query: gql`
                        query GetUsers {
                            getUsers {
                                id
                                createdBy
                                createdAt
                                updatedBy
                                updatedAt
                                deletedBy
                                deletedAt
                                fullname
                                email
                                roles
                                image
                            }
                        }
                    `
                })
                .then((response: any) => {
                    console.log('Response from GetUsers:', response)
                    setAllUsers(response.data.getUsers)
                })
        }
        fetchUsers()
    }, [searchValue])

    return (
        <Content>
            <ToolbarWrapper
                showPageTitle={true}
                onClickBackButtonPath="/location-management"
                onClickAddNewButton={() => {
                    dispatch(setSelectedUser(null))
                    dispatch(openModal(EModalName.CreateUserForm))
                }}
                renderFilterDropdown={Dropdown2}
                onSearchValueChange={searchValue => setSearchValue(searchValue)}></ToolbarWrapper>

            <div className={className}>
                <div className="card-body py-3">
                    <div className="table-responsive">
                        <table className="table align-middle gs-0 gy-4">
                            <thead>
                                <tr className="fw-bold text-muted bg-light">
                                    <th className="min-w-125px">Profile Picture</th>
                                    <th className="ps-4 min-w-325px rounded-start">Name</th>
                                    <th className="min-w-20px">Email</th>
                                    <th className="min-w-125px">Roles</th>
                                    <th className="min-w-125px text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="symbol symbol-50px me-5">
                                                <img src={user?.image} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                            </div>
                                        </td>

                                        <td>
                                            <span className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6">{user.fullname}</span>
                                        </td>
                                        <td>{user.email}</td>

                                        <td>{user.roles?.join(', ')}</td>

                                        <td className="text-end">
                                            <button
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                                onClick={() => {
                                                    dispatch(setSelectedUser(user))
                                                    dispatch(openModal(EModalName.UpdateUserForm))
                                                }}>
                                                <KTIcon iconName="pencil" className="fs-3" />
                                            </button>
                                            <button
                                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                                onClick={() => {
                                                    dispatch(setSelectedUser(user))
                                                    dispatch(openModal(EModalName.ConfirmDeletePopup))
                                                }}>
                                                <KTIcon iconName="trash" className="fs-3" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Content>
    )
}

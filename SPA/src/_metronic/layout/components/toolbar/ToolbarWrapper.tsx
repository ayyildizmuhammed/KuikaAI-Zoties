import clsx from 'clsx'
import { KTIcon } from '../../../helpers'
import React, { useState } from 'react'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import { Link, useLocation } from 'react-router-dom'

export interface ToolbarWrapperProps {
    onClickAddNewButton?: () => void
    showPageTitle?: boolean
    onClickBackButtonPath?: string
    renderFilterDropdown?: () => JSX.Element
    onSearchValueChange?: (value: string) => void
}

export default function ToolbarWrapper(props: Readonly<ToolbarWrapperProps>) {
    let firstElement = <div></div>
    const location = useLocation()
    if (props.onClickBackButtonPath !== undefined) {
        firstElement = (
            <Link to={props.onClickBackButtonPath}>
                <button type="button" className="btn btn-primary-light btn-active-light-primary me-2" style={{ borderRadius: 10, padding: 0 }}>
                    <ArrowBackIosRoundedIcon style={{ fontSize: 20 }} />
                </button>
            </Link>
        )
    }

    return (
        <div id="kt_app_toolbar" className={clsx('app-toolbar', '', 'py-3 py-lg-3')}>
            <div id="kt_app_toolbar_container" className={clsx('app-container', 'd-flex flex-stack', 'app-toolbar-minimize', { 'container-fluid': true })}>
                {firstElement}
                <div className="d-flex align-items-end gap-2 gap-lg-3">
                    {props.renderFilterDropdown && (
                        <div className="m-0">
                            <button className={clsx('btn btn-sm btn-flex fw-bold')} data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                <KTIcon iconName="filter" className="fs-6 text-muted me-1" />
                                Filter
                            </button>
                            {props.renderFilterDropdown()}
                        </div>
                    )}
                    {props.onSearchValueChange && <SearchButton onValueChange={props.onSearchValueChange} />}
                    {props.onClickAddNewButton && (
                        <button className="btn btn-sm fw-bold btn-primary" onClick={props.onClickAddNewButton}>
                            Add New
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

interface SearchButtonProps {
    onValueChange: (value: string) => void
}

export function SearchButton({ onValueChange }: Readonly<SearchButtonProps>) {
    // Search input'undaki değeri saklamak için bir state oluşturun
    const [searchValue, setSearchValue] = useState('')

    // Input alanındaki değişiklikleri handle eden fonksiyon
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        onValueChange && onValueChange(event.target.value)
        setSearchValue(event.target.value)
    }

    return (
        <div className="d-flex align-items-center position-relative me-4" style={{ paddingTop: 0 }}>
            <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-3">
                <span className="path1"></span>
                <span className="path2"></span>
            </i>
            <input
                type="text"
                id="kt_filter_search"
                className="form-control form-control-white form-control-sm w-150px ps-9"
                placeholder="Search"
                value={searchValue} // Input değerini state'ten al
                onChange={handleInputChange} // Input değişikliğinde fonksiyonu çağır
            />
        </div>
    )
}

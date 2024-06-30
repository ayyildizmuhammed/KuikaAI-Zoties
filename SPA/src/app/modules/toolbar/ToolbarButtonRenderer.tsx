import clsx from 'clsx'
import { KTIcon } from '../../../_metronic/helpers'
import { ToolbarButton } from './Toolbar'
import { Link } from 'react-router-dom'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'

export default class ToolbarButtonRenderer {
    static createSearchButton(onValueChange: (value: any) => void, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Search',
            location,
            render: () => (
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
                        onChange={onValueChange} // Input değişikliğinde fonksiyonu çağır
                    />
                </div>
            )
        }
    }

    static createAddNewButton(onClick: () => void, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Add New',
            location,
            render: () => (
                <div>
                    <button className="btn btn-primary btn-sm" onClick={onClick}>
                        Add New
                    </button>
                </div>
            )
        }
    }

    static createUploadFileButton(onClick: () => void, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Upload New File',
            location,
            render: () => (
                <div>
                    <button className="btn btn-primary btn-sm" onClick={onClick}>
                        Upload New File
                    </button>
                </div>
            )
        }
    }

    static createFilterButton(onClick: () => void, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Filter',
            location,
            render: () => {
                const daterangepickerButtonClass = 'bg-body btn-color-gray-700 btn-active-color-primary'
                return (
                    <div>
                        <div className="m-0">
                            <button className={clsx('btn btn-sm btn-flex fw-bold', daterangepickerButtonClass)} data-kt-menu-placement="bottom-end" onClick={onClick}>
                                <KTIcon iconName="filter" className="fs-6 text-muted me-1" />
                                {'Filter'}
                            </button>
                        </div>
                    </div>
                )
            }
        }
    }

    static createExportButton(onClick: () => void, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Export',
            location,
            render: () => (
                <div>
                    <button className="btn btn-secondary btn-sm" onClick={onClick}>
                        <KTIcon iconName="exit-up" className="fs-6 me-1" />
                        Export
                    </button>
                </div>
            )
        }
    }

    // Örnek: Geri dönüş butonu
    static createBackButton(navigatePath: string, location: 'before' | 'after'): ToolbarButton {
        return {
            title: 'Back',
            location,
            render: () => (
                <Link to={navigatePath}>
                    <button type="button" className="btn btn-primary-light btn-active-light-primary me-2" style={{ borderRadius: 10, padding: 0 }}>
                        <ArrowBackIosRoundedIcon style={{ fontSize: 20 }} />
                    </button>
                </Link>
            )
        }
    }

    static createCustomButton(render: () => JSX.Element, location: 'before' | 'after'): ToolbarButton {
        return {
            location,
            render
        }
    }
}

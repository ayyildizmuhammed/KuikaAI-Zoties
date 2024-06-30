import MotusSelectBox from "src/app/Pages/CommonComponents/MotusSelectBox"


const compareByOptions = [
    { value: '1', label: 'Person Count' },
    { value: '2', label: 'Average Pleasure' }
]

const timePeriodOptions = [
    { value: '1', label: 'Daily' },
    { value: '2', label: 'Weekly' },
    { value: '3', label: 'Monthly' }
]

const compareTypeOptions = [
    { value: '1', label: 'Overall' },
    { value: '2', label: 'Self' }
]

export function LocationCustomerCardOptions() {
    return (
        <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
            <div className="px-7 py-5">
                <div className="fs-5 text-gray-900 fw-bolder">Options</div>
            </div>

            <div className="separator border-gray-200"></div>

            <div className="px-7 py-5">
                <div className="mb-10">
                    <MotusSelectBox
                        label={'Time Period'}
                        defaultValue={timePeriodOptions[1]}
                        options={timePeriodOptions}
                        // onChange={value => handleFilterChange('locations', value)}
                        // filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>

                <div className="mb-10">
                    <MotusSelectBox
                        label={'Compare By'}
                        defaultValue={compareByOptions[0]}
                        options={compareByOptions}
                        // onChange={value => handleFilterChange('locations', value)}
                        // filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>

                <div className="mb-10">
                    <MotusSelectBox
                        label={'Compare Type'}
                        defaultValue={compareTypeOptions[0]}
                        options={compareTypeOptions}
                        // onChange={value => handleFilterChange('locations', value)}
                        // filterOption={createFilter({ ignoreCase: true, matchFrom: 'any' })}
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-sm btn-primary" data-kt-menu-dismiss="true">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

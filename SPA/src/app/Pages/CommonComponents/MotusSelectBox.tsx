import React from 'react'
import { useIntl } from 'react-intl'
import Select, { components, GroupBase, Props as SelectProps, ValueContainerProps } from 'react-select'

// CustomSelect wrapper bileşeni
interface MotusSelectBoxProps extends SelectProps<unknown, boolean, GroupBase<unknown>> {
    isMultiSelect?: boolean
    label?: string
    labelPosition?: 'top' | 'left'
}

export default function MotusSelectBox({ isMultiSelect, label, labelPosition = 'top', ...props }: Readonly<MotusSelectBoxProps>) {
    return (
        <div style={{ display: 'flex', flexDirection: labelPosition === 'left' ? 'row' : 'column' }}>
            {label && (
                <label className="form-label" style={{ marginRight: labelPosition === 'left' ? '10px' : '0px', marginTop:10 }}>
                    {label} :
                </label>
            )}
            <Select
                className="react-select-styled react-select-solid"
                classNamePrefix="react-select"
                {...props}
                isMulti={isMultiSelect}
                components={{ ValueContainer: CustomValueContainer }}
                closeMenuOnSelect={!isMultiSelect}
            />
        </div>
    )
}

const CustomValueContainer = (props: ValueContainerProps<unknown, boolean, GroupBase<unknown>>) => {
    // Seçili değerlerin sayısını hesapla
    const intl = useIntl()
    const numberOfValues = React.Children.count(props.children[0])
    const allSelected: boolean = numberOfValues === props.options?.length
    if (props.isMulti && numberOfValues > 2) {
        return (
            <components.ValueContainer {...props}>
                <div>{allSelected ? intl.formatMessage({ id: 'ALL_ITEMS_SELECTED' }) : intl.formatMessage({ id: 'X_ITEMS_SELECTED' }, { count: numberOfValues })}</div>
                {/* Input elemanını koru */}
                {props.children[1]}
            </components.ValueContainer>
        )
    }

    // Varsayılan davranışı kullan
    return <components.ValueContainer {...props}>{props.children}</components.ValueContainer>
}

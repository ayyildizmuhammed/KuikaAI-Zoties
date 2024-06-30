import { useIntl } from 'react-intl'
import MenuItem from './MenuItem'
import { Fragment } from 'react'

export default function MenuInner() {
    const intl = useIntl()
    return (
        <Fragment>
            <MenuItem title={'Home'} icon="home" to="/dashboard" />
            {/* <MenuItem title={'Management'} to="/location-management" /> */}
        </Fragment>
    )
}

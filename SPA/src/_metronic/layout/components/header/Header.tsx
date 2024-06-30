/* eslint-disable no-prototype-builtins */
import { useEffect } from 'react'
import { ILayout, useLayout } from '../../core'
import MenuInner from './header-menus/MenuInner'

export default function Header() {
    const { config } = useLayout()
    useEffect(() => {
        updateDOM(config)
    }, [config])

    return (
        <div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu" data-kt-menu="true">
            <MenuInner />
        </div>
    )
}

const updateDOM = (config: ILayout) => {
    if (config.app?.header?.default?.fixed?.desktop) {
        document.body.setAttribute('data-kt-app-header-fixed', 'true')
        document.body.setAttribute('data-kt-app-header-minimize', 'on')
    }

    if (config.app?.header?.default?.fixed?.mobile) {
        document.body.setAttribute('data-kt-app-header-fixed-mobile', 'true')
    }

    if (config.app?.header?.default?.stacked) {
        document.body.setAttribute('data-kt-app-header-stacked', 'true')
    }

    let appHeaderDefaultStickyAttributes: { [attrName: string]: string } = {}
    if (config.app?.header?.default?.sticky?.enabled) {
        appHeaderDefaultStickyAttributes = config.app?.header?.default?.sticky?.attributes as {
            [attrName: string]: string
        }
    }

    let appHeaderDefaultMinimizeAttributes: { [attrName: string]: string } = {}
    if (config.app?.header?.default?.minimize?.enabled) {
        appHeaderDefaultMinimizeAttributes = config.app?.header?.default?.minimize?.attributes as {
            [attrName: string]: string
        }
    }

    setTimeout(() => {
        const headerElement = document.getElementById('kt_app_header')
        if (headerElement) {
            const headerAttributes = headerElement.getAttributeNames().filter(t => t.indexOf('data-') > -1)
            headerAttributes.forEach(attr => headerElement.removeAttribute(attr))

            if (config.app?.header?.default?.sticky?.enabled) {
                Object.entries(appHeaderDefaultStickyAttributes).forEach(([key, value]) => {
                    headerElement.setAttribute(key, value)
                })
            }

            if (config.app?.header?.default?.minimize?.enabled) {
                Object.entries(appHeaderDefaultMinimizeAttributes).forEach(([key, value]) => {
                    headerElement.setAttribute(key, value)
                })
            }
        }
    }, 0)
}

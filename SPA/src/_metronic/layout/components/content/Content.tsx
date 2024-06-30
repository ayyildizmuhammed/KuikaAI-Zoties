import { useEffect } from 'react'
import { useLocation } from 'react-router'
import clsx from 'clsx'
import { useLayout } from '../../core'
import { DrawerComponent } from '../../../assets/ts/components'
import { WithChildren } from '../../../helpers'

export default function Content({ children }: Readonly<WithChildren>) {
    const { config, classes } = useLayout()
    const location = useLocation()
    useEffect(() => {
        DrawerComponent.hideAll()
    }, [location])

    const appContentContainer = config.app?.content?.container
    return (
        <div id="kt_app_content" className={clsx('app-content', classes.content.join(' '), config?.app?.content?.class)}>
            {appContentContainer ? (
                <div
                    id="kt_app_content_container"
                    className={clsx('app-container', classes.contentContainer.join(' '), {
                        'container-xxl': appContentContainer === 'fixed',
                        'container-fluid': appContentContainer === 'fluid'
                    })}>
                    {children}
                </div>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

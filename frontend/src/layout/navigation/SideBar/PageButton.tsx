import { useActions, useValues } from 'kea'
import { sceneLogic } from 'scenes/sceneLogic'
import { navigationLogic } from '~/layout/navigation/navigationLogic'
import { dashboardsModel } from '~/models/dashboardsModel'
import { Scene } from 'scenes/sceneTypes'
import { LemonButton, LemonButtonProps, LemonButtonWithSideAction, SideAction } from 'lib/components/LemonButton'
import { sceneConfigurations } from 'scenes/scenes'
import { LemonTag } from 'lib/components/LemonTag/LemonTag'
import React from 'react'

export interface PageButtonProps extends Pick<LemonButtonProps, 'icon' | 'onClick' | 'popup' | 'to'> {
    /** Used for highlighting the active scene. `identifier` of type number means dashboard ID instead of scene. */
    identifier: string | number
    sideAction?: Omit<SideAction, 'type'> & { identifier?: string }
    title?: React.ReactNode
    highlight?: 'beta' | 'new'
}

export function PageButton({ title, sideAction, identifier, highlight, ...buttonProps }: PageButtonProps): JSX.Element {
    const { aliasedActiveScene, activeScene } = useValues(sceneLogic)
    const { hideSideBarMobile } = useActions(navigationLogic)
    const { lastDashboardId } = useValues(dashboardsModel)

    const isActiveSide: boolean = sideAction?.identifier === aliasedActiveScene
    const isActive: boolean =
        isActiveSide ||
        (typeof identifier === 'string'
            ? identifier === aliasedActiveScene
            : activeScene === Scene.Dashboard && identifier === lastDashboardId)

    return sideAction ? (
        <LemonButtonWithSideAction
            fullWidth
            type={'stealth'}
            active={isActive}
            onClick={hideSideBarMobile}
            sideAction={{
                ...sideAction,
                type: 'stealth',
                'data-attr': sideAction.identifier ? `menu-item-${sideAction.identifier.toLowerCase()}` : undefined,
            }}
            data-attr={`menu-item-${identifier.toString().toLowerCase()}`}
            {...buttonProps}
        >
            {title || sceneConfigurations[identifier].name}
        </LemonButtonWithSideAction>
    ) : (
        <LemonButton
            fullWidth
            type={'stealth'}
            active={isActive}
            data-attr={`menu-item-${identifier.toString().toLowerCase()}`}
            onClick={hideSideBarMobile}
            {...buttonProps}
        >
            <span className="grow">{title || sceneConfigurations[identifier].name}</span>
            {highlight === 'beta' ? (
                <LemonTag type="warning" className="ml-1 float-right">
                    Beta
                </LemonTag>
            ) : highlight === 'new' ? (
                <LemonTag type="success" className="ml-1 float-right">
                    New
                </LemonTag>
            ) : null}
        </LemonButton>
    )
}

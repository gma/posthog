import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { LemonRow, LemonRowProps } from '../LemonRow'
import './LemonCheckbox.scss'

export interface LemonCheckboxProps {
    checked?: boolean | 'indeterminate'
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    label?: string | JSX.Element
    id?: string
    className?: string
    bordered?: boolean
    fullWidth?: boolean
    size?: LemonRowProps['size']
    title?: string
}

export interface BoxCSSProperties extends React.CSSProperties {
    '--box-color': string
}

/** Counter used for collision-less automatic checkbox IDs. */
let checkboxCounter = 0

/** Checkboxes allow users to select one or more items from a set.
 *
 * Checkboxes can turn an option on or off.
 * Checkboxes can have a parent-child relationship with other checkboxes.
 *
 * When the parent checkbox is checked, all child checkboxes are checked.
 *
 * If some, but not all, child checkboxes are checked, the parent checkbox becomes an indeterminate checkbox.
 */
export function LemonCheckbox({
    checked,
    defaultChecked,
    disabled,
    onChange,
    label,
    id: rawId,
    className,
    bordered,
    fullWidth,
    size,
    title,
}: LemonCheckboxProps): JSX.Element {
    const indeterminate = checked === 'indeterminate'

    const id = useMemo(() => rawId || `lemon-checkbox-${checkboxCounter++}`, [rawId])
    const [localChecked, setLocalChecked] = useState(indeterminate || (checked ?? defaultChecked ?? false))
    const [wasIndeterminateLast, setWasIndeterminateLast] = useState(false)

    useEffect(() => {
        if (checked !== undefined) {
            setLocalChecked(!!checked)
        }
    }, [checked])

    useEffect(() => {
        if (checked) {
            setWasIndeterminateLast(indeterminate)
        }
    }, [checked, indeterminate])

    return (
        <LemonRow
            className={clsx(
                'LemonCheckbox',
                localChecked && 'LemonCheckbox--checked',
                wasIndeterminateLast && 'LemonCheckbox--indeterminate',
                bordered && 'LemonCheckbox--bordered',
                className
            )}
            disabled={disabled}
            icon={
                <>
                    <input
                        className="LemonCheckbox__input"
                        type="checkbox"
                        checked={localChecked}
                        defaultChecked={defaultChecked}
                        onChange={(e) => {
                            // NOTE: We only want to setLocalChecked if the component is not controlled externally
                            checked === undefined && setLocalChecked(e.target.checked)
                            onChange?.(e)
                        }}
                        id={id}
                        disabled={disabled}
                    />
                    <label htmlFor={id} className="LemonCheckbox__box">
                        <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                            <path d={!wasIndeterminateLast ? 'm3.5 8 3 3 6-6' : 'm3.5 8h9'} strokeWidth="2" />
                        </svg>
                    </label>
                </>
            }
            fullWidth={fullWidth}
            size={size}
            title={title}
        >
            {label && (
                <label className="LemonCheckbox__label" htmlFor={id}>
                    {label}
                </label>
            )}
        </LemonRow>
    )
}

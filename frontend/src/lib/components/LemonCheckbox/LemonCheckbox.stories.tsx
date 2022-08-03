import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LemonCheckbox, LemonCheckboxProps } from './LemonCheckbox'

export default {
    title: 'Lemon UI/Lemon Checkbox',
    component: LemonCheckbox,
} as ComponentMeta<typeof LemonCheckbox>

const BasicTemplate: ComponentStory<typeof LemonCheckbox> = (props: LemonCheckboxProps) => {
    return <LemonCheckbox {...props} />
}

export const Default = BasicTemplate.bind({})
Default.args = {
    label: 'Check this out',
}

const Basic: ComponentStory<typeof LemonCheckbox> = ({ ...props }: Partial<LemonCheckboxProps>): JSX.Element => {
    return (
        <div className="flex flex-col gap-2 border rounded-lg p-2">
            <LemonCheckbox checked={false} label="Unchecked" {...props} />
            <LemonCheckbox checked={true} label="Checked" {...props} />
            <LemonCheckbox checked={'indeterminate'} label="Indeterminate" {...props} />
        </div>
    )
}

export const Examples = Basic.bind({})
Examples.args = {}

const WithSize: ComponentStory<typeof LemonCheckbox> = ({ ...props }: Partial<LemonCheckboxProps>): JSX.Element => {
    return (
        <div className="flex flex-col gap-2">
            <LemonCheckbox checked={false} label="Full Width" fullWidth {...props} bordered />
            <LemonCheckbox checked={false} label="Small" size="small" {...props} bordered />
        </div>
    )
}

export const Sizes = WithSize.bind({})
Sizes.args = {}

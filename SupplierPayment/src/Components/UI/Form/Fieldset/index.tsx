import type { FieldsetProps } from '../../../../interfaces/types'

import './index.scss'

export const Fieldset = ({ children, legend, ...rest }: FieldsetProps) => {
    return (
        <fieldset {...rest}>
            <legend>{legend}</legend>
            {children}
        </fieldset>
    )
}
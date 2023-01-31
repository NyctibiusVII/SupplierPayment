import {
    useEffect,
    useRef
} from 'react'
import { useField } from '@unform/core'

import type { InputProps } from '../../../../interfaces/types'

import './index.scss'

export const Input = ({ name, label, labelBefAft='before', container=false, ...rest }: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const { fieldName, defaultValue, registerField, error } = useField(name)

    const InputComponent =
        <input
            id={fieldName}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
        />

    const LabelComponent =
        <label htmlFor={fieldName}>{label}</label>

    const ContainerComponent = (Component: JSX.Element) =>
        <div className={`containerInput ${fieldName}`}>{Component}</div>

    const Component = () => {
        if (label && labelBefAft === 'before') return <>{ LabelComponent } { InputComponent }</>
        else if (label && labelBefAft === 'after') return <>{ InputComponent } { LabelComponent }</>
        else return InputComponent
    }

    useEffect(() => {
        return registerField({
            name: fieldName,
            ref: inputRef.current,
            getValue: ref => {
                return ref.value
            },
            setValue: (ref, value) => {
                ref.value = value
            },
            clearValue: ref => {
                ref.value = ''
            }
        })
    }, [fieldName, registerField])

    return (
        <>
            { container ?
                ContainerComponent(Component())
                :
                Component()
            }

            { error && <span>{error}</span> }
        </>
    )
}
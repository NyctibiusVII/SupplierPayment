import type { LogoProps } from '../../interfaces/types'

import logo from '/logo.png'
import './index.scss'

export const Logo = (props: LogoProps) => {
    return (
        <figure {...props}>
            <img src={logo} alt='Logo marca da empresa VFlows' />
        </figure>
    )
}
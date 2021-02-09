import React from 'react'
import { Logo } from '../../../../theme/Logo'
import { MenuWrapper } from './styles/MenuWrapper'

export default function Menu() {

    const links = [
        {
            texto: 'Home',
            url:    '/'
        },
        {
            texto: 'Pergunstas frequentes',
            url:    '/faq'
        },
        {
            texto: 'Sobre',
            url:    '/sobre'
        }
    ]

    return (
        <MenuWrapper>
            <MenuWrapper.LeftSide>
                <Logo />
            </MenuWrapper.LeftSide>
            <MenuWrapper.CentralSide>
                {links.map((link, index) => {
                    return (
                        <li key={`link___${index}`}>
                            <a href={link.url}>
                                {link.texto}
                            </a>
                        </li>
                    )
                })}
            </MenuWrapper.CentralSide>
            <MenuWrapper.RightSide>
                <button>
                    Entrar
                </button>
                <button>
                    Cadastrar
                </button>
            </MenuWrapper.RightSide>
        </MenuWrapper>
    )
}
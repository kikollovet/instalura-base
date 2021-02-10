import React from 'react'
import Logo from '../../../theme/Logo'
import { Button } from '../Button'
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
                <Button type="button" ghost variant="secondary.main">
                    Entrar
                </Button>
                <Button type="button" variant="primary.main">
                    Cadastrar
                </Button>
            </MenuWrapper.RightSide>
        </MenuWrapper>
    )
}
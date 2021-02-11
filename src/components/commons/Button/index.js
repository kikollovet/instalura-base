import styled, { css } from 'styled-components'
import get from 'lodash/get'
import { TextStyleVariantsMap } from '../../foundation/Text';

const ButtonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    background: transparent;
`

const ButtonDefault = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
`

export const Button = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    transition: opacity ${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${TextStyleVariantsMap.smallestException}
    /*${({ ghost }) => (ghost ? ButtonGhost : ButtonDefault)}*/
    ${function (props) {
        if (props.ghost) {
            return ButtonGhost;
        }
        return ButtonDefault;
    }}
    &:hover,
    &:focus {
        opacity: .5;
    }
`;
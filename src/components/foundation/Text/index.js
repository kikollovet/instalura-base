import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import get from 'lodash/get';

//É possivel tirar o primeiro CSS e depois o ${}
const paragraph1 = css`
  ${({ theme }) => css`
    font-size: ${theme.typographyVariants.paragraph1.fontSize};
    font-weight: ${theme.typographyVariants.paragraph1.fontWeight};
    line-height: ${theme.typographyVariants.paragraph1.lineHeight};
  `}
`;

//É possivel tirar o primeiro CSS e depois o ${}
const smallestException = css`
  ${({ theme }) => css`
    font-size: ${theme.typographyVariants.smallestException.fontSize};
    font-weight: ${theme.typographyVariants.smallestException.fontWeight};
    line-height: ${theme.typographyVariants.smallestException.lineHeight};
  `}
`;

export const TextStyleVariantsMap = {
    smallestException,
    paragraph1,
  };

const TextBase = styled.span`
     ${({ variant }) => TextStyleVariantsMap[variant]}
     color: ${({ theme, color }) => get(theme, `colors.${color}.color`)};
`;

export default function Text({ tag, variant, children, ...props }) {
    return (
        <TextBase
            as={tag}
            variant={variant}
            {...props}
        >
            {children}
        </TextBase>
    )
}

Text.defaultProps = {
    tag: 'span',
    variant: 'paragraph1'
}

Text.propTypes = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span']),
    variant: PropTypes.oneOf(['paragraph1', 'smallestException']),
};
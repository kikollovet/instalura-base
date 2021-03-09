/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../theme/utils/propToStyle';
import { Link } from '../Link';

const ButtonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    /* color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)}; */
    background: transparent;
`;

const ButtonDefault = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
`;

// eslint-disable-next-line import/prefer-default-export
const ButtonWrapper = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    transition: opacity ${({ theme }) => theme.transition};
    border-radius: ${({ theme }) => theme.borderRadius};
    ${TextStyleVariantsMap.smallestException}
    ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      padding: 12px 43px;
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

    &:disabled {
    cursor: not-allowed;
      opacity: .2;
    }
    ${({ fullWidth }) => fullWidth && css`
      width: 100%;
    `};

    ${propToStyle('margin')}
    ${propToStyle('display')}

    /*${({ ghost }) => (ghost ? ButtonGhost : ButtonDefault)}*/
    // eslint-disable-next-line func-names
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

export const Button = ({ href, ...props }) => {
  const isLink = Boolean(href);
  const componentTag = isLink ? Link : 'button';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonWrapper as={componentTag} href={href} {...props} />
  );
};

Button.defaultProps = {
  href: undefined,
};

Button.propTypes = {
  href: PropTypes.string,
};

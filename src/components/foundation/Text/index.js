/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { propToStyle } from '../../../theme/utils/propToStyle';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import Link from '../../commons/Link';
import { WebsitePageContext } from '../../wrappers/WebsitePage/context';
// import { typographyVariants } from '../../../theme/typographyVariants'

// É possivel tirar o primeiro CSS e depois o ${}
const paragraph1 = css`
  ${({ theme }) => css`
    font-size: ${theme.typographyVariants.paragraph1.fontSize};
    font-weight: ${theme.typographyVariants.paragraph1.fontWeight};
    line-height: ${theme.typographyVariants.paragraph1.lineHeight};
  `}
`;

// É possivel tirar o primeiro CSS e depois o ${}
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
  title: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.titleXS.fontSize};
      font-weight: ${theme.typographyVariants.titleXS.fontWeight};
      line-height: ${theme.typographyVariants.titleXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.title.fontSize};
          font-weight: ${theme.typographyVariants.title.fontWeight};
          line-height: ${theme.typographyVariants.title.lineHeight};
        `}
      `,
  })}
  `,
};

const TextBase = styled.span`
     ${({ variant }) => TextStyleVariantsMap[variant]}
     color: ${({ theme, color }) => get(theme, `colors.${color}.color`)};
     ${propToStyle('textAlign')}
`;

export default function Text({
  tag, variant, children, href, cmsKey, ...props
}) {
  const websitePageContext = React.useContext(WebsitePageContext);

  const componentContent = cmsKey
    ? websitePageContext.getCMSContent(cmsKey)
    : children;

  if (href) {
    return (
      <TextBase
        as={Link}
        variant={variant}
        href={href}
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        {componentContent}
      </TextBase>
    );
  }

  return (
    <TextBase
      as={tag}
      variant={variant}
      {...props}
    >
      {componentContent}
    </TextBase>
  );
}

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
  href: '',
  cmsKey: undefined,
};

Text.propTypes = {
  // children: PropTypes.node.isRequired,
  // tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span']),
  // variant: PropTypes.oneOf(['title', 'paragraph1', 'smallestException']),
  children: PropTypes.node,
  tag: PropTypes.string,
  href: PropTypes.string,
  variant: PropTypes.string,
  cmsKey: PropTypes.string,
  // A way to get the different styles of text without hard coding
  // variant: PropTypes.oneOf(Object.keys(typographyVariants)),
};

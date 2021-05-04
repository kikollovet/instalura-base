/* eslint-disable import/prefer-default-export */
// /* eslint-disable consistent-return */
// /* eslint-disable import/prefer-default-export */
// import { breakpointsMedia } from './breakpointsMedia';

// export function propToStyle(propName) {
//   return (props) => {
//     const propValue = props[propName];

//     if (typeof propValue === 'string' || typeof propValue === 'number') {
//       return {
//         [propName]: propValue,
//       };
//     }

//     // if (typeof propValue === 'object') {
//     //   return css`
//     //     ${breakpointsMedia({
//     //         ...(propValue.xs && {
//     //             xs: { [propName]: propValue.xs },
//     //         }),
//     //         ...(propValue.sm && {
//     //             sm: { [propName]: propValue.sm },
//     //         }),
//     //         ...(propValue.md && {
//     //             md: { [propName]: propValue.md },
//     //         }),
//     //         ...(propValue.lg && {
//     //             lg: { [propName]: propValue.lg },
//     //         }),
//     //         ...(propValue.xl && {
//     //             xl: { [propName]: propValue.xl },
//     //         }),
//     //     })}
//     //   `;
//     // }

//     if (typeof propValue === 'object') {
//       return breakpointsMedia({
//         xs: {
//           [propName]: propValue.xs,
//         },
//         sm: {
//           [propName]: propValue.sm,
//         },
//         md: {
//           [propName]: propValue.md,
//         },
//         lg: {
//           [propName]: propValue.lg,
//         },
//         xl: {
//           [propName]: propValue.xl,
//         },
//       });
//     }

//     // return {
//     //     [propName]: props[propName],
//     // };
//   };
// }

import { breakpointsMedia } from '../breakpointsMedia';

export function propToStyle(propName) {
  return (props) => {
    const propValue = props[propName];

    if (typeof propValue === 'string' || typeof propValue === 'number') {
      return {
        // textAlign: props.textAlign
        [propName]: propValue,
      };
    }

    if (typeof propValue === 'object') {
      const breakpoints = {};

      if (propValue.xs) breakpoints.xs = { [propName]: propValue.xs };
      if (propValue.md) breakpoints.md = { [propName]: propValue.md };

      return breakpointsMedia(breakpoints);

      // return breakpointsMedia({
      //   xs: {
      //     [propName]: propValue.xs,
      //   },
      //   sm: {
      //     [propName]: propValue.sm,
      //   },
      //   md: {
      //     [propName]: propValue.md,
      //   },
      //   lg: {
      //     [propName]: propValue.lg,
      //   },
      //   xl: {
      //     [propName]: propValue.xl,
      //   },
      // });
    }

    return {};
  };
}

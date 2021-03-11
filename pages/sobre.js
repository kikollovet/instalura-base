import React from 'react';
// import { useRouter } from 'next/router';
import { Context } from '../src/components/commons/Context';

export default function PageSobre() {
  const contextPage = React.useContext(Context);
  // const router = useRouter();
  // const token = localStorage.getItem('token');
  // React.useEffect(() => {
  //   if (!contextPage.token) {
  //     router.push('/');
  //   }
  // }, [!contextPage.token]);

  if (contextPage.token) {
    return (
      <div>
        Página sobre
        {' '}
        {contextPage.token}
      </div>
    );
  }
  return (
    <div>
      <a href="/">Vc precisa se logar</a>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // const token = await localStorage.getItem('token');
//   // eslint-disable-next-line prefer-destructuring
//   const token = Context.Provider.token;
//   // const contextPage = React.useContext(Context);
//   // const token = context.props.token;
//   console.log(token);

//   if (!token === '300') {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

// PageSobre.getInitialProps = async () => {
//   const token = await localStorage.getItem('token');
//   return token;
// };

// export async function getStaticProps() {
//   const contextPage = React.useContext(Context);

//   // Falar sobre tamanho da página aqui e tomar cuidado com recursos extras que vão pra página
//   return {
//     props: {
//       contextPage,
//     },
//   };
// }

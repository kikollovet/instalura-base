import React from 'react';
// import { useRouter } from 'next/router';
import { withIronSession } from 'next-iron-session';
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

// export async function getServerSideProps() {
//   // const token = await localStorage.getItem('token');
//   // eslint-disable-next-line prefer-destructuring
//   // const token = Context.Provider.token;
//   // const contextPage = React.useContext(Context);
//   // const token = context.props.token;
//   // console.log(token);
//   const user = await fetch('http://localhost:3000/api/user', { method: 'POST' });
//   const data = await user.json();
//   console.log(data);
//   if (!user) {
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
export const getServerSideProps = withIronSession(
  // eslint-disable-next-line no-unused-vars
  async ({ req, res }) => {
    const user = req.session.get('user');
    // eslint-disable-next-line no-console
    console.log(user);
    if (!user) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: { user },
    };
  },
  {
    cookieName: 'teste',
    cookieOptions: {
      // eslint-disable-next-line no-unneeded-ternary
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    password: 'complex_password_at_least_32_characters_long',
  },
);

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

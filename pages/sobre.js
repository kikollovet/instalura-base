/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';
import { withIronSession } from 'next-iron-session';
import { Context } from '../src/components/commons/Context';

export default function PageSobre(props) {
  const contextPage = React.useContext(Context);
  // const router = useRouter();
  // const token = localStorage.getItem('token');
  // React.useEffect(() => {
  //   if (!contextPage.token) {
  //     router.push('/');
  //   }
  // }, [!contextPage.token]);
  const [cat, setCat] = React.useState({});
  // let vars;
  if (contextPage.token) {
    return (
      <div>
        Página sobre
        {' '}
        {contextPage.token}
        {props.user.id}
        {props.user.token}
        <div>
          {/* {props.faqCategories.map((category) => (<h1 onClick={() => { vars = { nome: category.title, data: '17/07' }; alert(vars.nome + vars.data); }}>{category.title}</h1>))} */}
          {props.faqCategories.map((category) => (<h1 onClick={() => { setCat({ nome: category.title, teste: 'testando' }); }}>{category.title}</h1>))}
        </div>
        {props.faqCategories[3].title}
        {cat.nome}
        {cat.teste}
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
    const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq').then(async (resp) => {
      const response = await resp.json();
      // ATENçâo ---- LEMBRE DE TIRAR O DATA
      return response.data;
    });
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
      props: { user, faqCategories },
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

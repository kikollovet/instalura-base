/* eslint-disable no-unused-vars */
import React from 'react';
import styled, { css } from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';
import { Lottie } from '@crello/react-lottie';
import successAnimation from './animations/success.json';
import errorAnimation from './animations/error.json';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Box } from '../../foundation/layout/Box';
import { Grid } from '../../foundation/layout/Grid';
import Text from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { Context } from '../../commons/Context';

const ButtonClose = styled.div`
  position: absolute;
  top: 0;
  right: 3%;
  border: 0;
  background-color: transparent;

  ${breakpointsMedia({
    md: css`
      right: 0;
    `,
  })}
`;

const CloseOutlineIcon = styled(CloseOutline)`
  width: 30px;
  height: 30px;
  color: grey;

  ${breakpointsMedia({
    md: css`
      width: 20px;
      height: 20px;
    `,
  })}
`;

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

// eslint-disable-next-line react/prop-types
function FormContent({ onClose }) {
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = React.useState({
    usuario: 'omariosouto1003',
    nome: 'Mario Souto',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = userInfo.usuario.length === 0 || userInfo.nome.length === 0;
  const contextPage = React.useContext(Context);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // eslint-disable-next-line no-console
        setIsFormSubmited(true);

        // Data Transfer Object
        const userDTO = {
          username: userInfo.usuario,
          name: userInfo.nome,
        };

        fetch('https://instalura-api.vercel.app/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDTO),
        })
          .then((respostaDoServidor) => {
            if (respostaDoServidor.ok) {
              return respostaDoServidor.json();
            }

            throw new Error('Não foi possível cadastrar o usuário agora :(');
          })
          .then((respostaConvertidaEmObjeto) => {
            setSubmissionStatus(formStates.DONE);
            // eslint-disable-next-line no-console
            console.log(respostaConvertidaEmObjeto.data.name);
            localStorage.removeItem('token', contextPage.token);
            // eslint-disable-next-line no-console
            console.log(`oi ${contextPage.token}`);
            fetch('/api/logout', { method: 'POST' })
              .then((respostaDoServidor) => respostaDoServidor,

                // throw new Error('Não foi possível cadastrar o usuário agora :(');
              // eslint-disable-next-line function-paren-newline
              )
              .then((respostaConvertidaEmObjetooo) => {
                // eslint-disable-next-line no-console
                console.log(respostaConvertidaEmObjetooo);
              });
          })
          .catch((error) => {
            setSubmissionStatus(formStates.ERROR);
            // eslint-disable-next-line no-console
            // console.error(error);
            contextPage.setToken('300');
            contextPage.token = '300';
            // const tokenLocalStorage = '230';
            const teste = 'Olá mundo';
            sessionStorage.setItem('token', contextPage.token);
            const zero = fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: teste, token: 'ed12ed34' }) })
              .then((respostaDoServidor) => respostaDoServidor,

                // throw new Error('Não foi possível cadastrar o usuário agora :(');
              // eslint-disable-next-line function-paren-newline
              )
              .then((respostaConvertidaEmObjeto) => {
                // eslint-disable-next-line no-console
                console.log(respostaConvertidaEmObjeto);
              });
          })
          .finally(() => {
            // eslint-disable-next-line no-console
            console.log(`oi ${contextPage.token}`);
          });
      }}
    >
      <ButtonClose
        type="button"
        onClick={(event) => {
          onClose();
        }}
      >
        <CloseOutlineIcon />
      </ButtonClose>
      <Text
        variant="title"
        tag="h1"
        color="tertiary.main"
      >
        Pronto para saber da vida dos outros?
        {' '}
        {contextPage.token}
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="tertiary.light"
        marginBottom="32px"
      >
        Você está a um passo de saber tudoo que está
        rolando no bairro, complete seu cadastro agora!
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange} // capturadores, pegadores de ação
        />
      </div>

      <div>
        <TextField
          placeholder="Usuário"
          name="usuario"
          value={userInfo.usuario}
          onChange={handleChange}
        />
      </div>

      <Button
        variant="primary.main"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        Cadastrar
      </Button>

      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: successAnimation, loop: true, autoplay: true }}
          />
          {/* https://lottiefiles.com/43920-success-alert-icon */}
        </Box>
      )}

      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box
          display="flex"
          justifyContent="center"
        >
          <Lottie
            width="150px"
            height="150px"
            config={{ animationData: errorAnimation, loop: true, autoplay: true }}
          />
          {/* https://lottiefiles.com/43920-success-alert-icon */}
        </Box>
      )}
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ propsDoModal, onClose }) {
  return (
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="flex-end"
    >
      <Grid.Col
        display="flex"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 5, lg: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '85px',
          }}
          backgroundColor="white"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <FormContent onClose={onClose} />
        </Box>
      </Grid.Col>
    </Grid.Row>
  );
}

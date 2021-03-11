import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
export const Context = React.createContext({
  token: '',
  setToken: () => {},
});

export default function ContextProvider({ children }) {
  const [tokenLog, setToken] = React.useState(undefined);

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <Context.Provider value={{ token: tokenLog, setToken: (valor) => setToken(valor) }}>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

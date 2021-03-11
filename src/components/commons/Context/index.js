import React from 'react';
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
export const Context = React.createContext({
  token: '',
  setToken: () => {},
});

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
  const [tokenLog, setToken] = React.useState(undefined);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
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

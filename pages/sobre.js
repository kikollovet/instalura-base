import React from 'react';
import { Context } from '../src/components/commons/Context';

export default function PageSobre() {
  const contextPage = React.useContext(Context);
  return (
    <div>
      Página sobre
      {' '}
      {contextPage.token}
    </div>
  );
}

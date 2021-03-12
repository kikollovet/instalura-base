import { withIronSession } from 'next-iron-session';

// eslint-disable-next-line no-unused-vars
async function handler(req, res, session) {
  const { authorization } = await req.headers;
  if (authorization === 'Bearer 12345') {
    const user = req.session.get('user');
    res.send({ user });
  } else {
    res.send('You are not allowed here');
  }
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    // eslint-disable-next-line no-unneeded-ternary
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
  cookieName: 'teste',
});

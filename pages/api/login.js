import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  const { id, token } = await req.body;
  const { authorization } = await req.headers;
  // eslint-disable-next-line no-console
  console.log(authorization);
  // get user from database then:
  if (authorization === 'Bearer 12345') {
    req.session.set('user', {
      id,
      admin: true,
      token,
    });
    await req.session.save();
    res.send('Logged in');
  } else {
    res.send('You are not allowed here');
  }
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  // if your localhost is served on http:// then disable the secure flag
  // eslint-disable-next-line no-unneeded-ternary
  secure: process.env.NODE_ENV === 'production' ? true : false,
  cookieName: 'teste',
});

import { withIronSession } from 'next-iron-session';

async function handler(req, res) {
  const { id } = await req.body;
  // get user from database then:
  req.session.set('user', {
    id,
    admin: true,
  });
  await req.session.save();
  res.send('Logged in');
}

export default withIronSession(handler, {
  password: 'complex_password_at_least_32_characters_long',
  // if your localhost is served on http:// then disable the secure flag
  // eslint-disable-next-line no-unneeded-ternary
  secure: process.env.NODE_ENV === 'production' ? true : false,
  cookieName: 'teste',
});

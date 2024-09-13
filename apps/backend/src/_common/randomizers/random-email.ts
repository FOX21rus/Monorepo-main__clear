import Jabber from 'jabber';
export const randomEmail = () => {
  const jabber = new Jabber();
  return jabber.createEmail();
};

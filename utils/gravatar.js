import md5 from 'md5';

export default (email) =>
  `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;

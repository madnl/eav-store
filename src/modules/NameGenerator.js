// @flow

export default (prefix: string): ((hint?: string) => string) => {
  let counter = 0;
  return (hint?: string = '') => `${prefix}${hint}${counter++}`;
};

declare const encryptPassword: (password: string) => any;
declare const checkPassword: (encrypted: string, plain: string) => boolean;
export { encryptPassword, checkPassword };

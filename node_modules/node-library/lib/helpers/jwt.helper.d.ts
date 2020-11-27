interface Auth {
    id: string;
    email: string;
    expiryTime: number;
    isConfirmed: boolean;
    [propName: string]: any;
}
declare const TIME: {
    s30: number;
    m30: number;
    d30: number;
};
declare const SECRET_TYPE: {
    access: string;
    refresh: string;
};
declare const encodeToken: (decoded: Auth, type: string, seconds: number) => {
    value: string;
    expiryTime: number;
};
declare const decodeToken: (token: {
    type: string;
    value: string;
}) => Promise<Auth>;
export { Auth, TIME, SECRET_TYPE, encodeToken, decodeToken };

declare function sendMail(data: {
    from: string;
    to: string;
    subject: string;
    text: string;
}): Promise<unknown>;
export default sendMail;

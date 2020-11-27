interface FormattedRequest {
    host?: string;
    path?: string;
    url?: string;
    method?: string;
    headers?: any;
    token?: {
        type: string;
        value: string;
    };
    params?: {
        [key: string]: string | number;
    };
    query?: {
        [key: string]: string | number;
    };
    data?: any;
}
declare function apiRequest(packet: any): Promise<{
    status: number;
    data: any;
}>;
declare function formattedApiRequest(packet: FormattedRequest): Promise<{
    status: number;
    data: any;
}>;
export { apiRequest, formattedApiRequest };

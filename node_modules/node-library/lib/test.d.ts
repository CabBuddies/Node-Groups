declare var Validator: any;
declare let data: {
    draft: {
        title: string;
        body: string;
        tags: string[];
    };
    published: {
        title: string;
        body: string;
        tags: any[];
    };
    customAttributes: {
        random: string;
        superRandom: {
            value: string;
        };
        places: string[];
    };
};
declare const schema: {
    type: string;
    additionalProperties: boolean;
    properties: {
        draft: {
            $ref: string;
        };
        published: {
            $ref: string;
        };
        customAttributes: {
            type: string;
        };
        status: {
            type: string;
            enum: string[];
        };
    };
};

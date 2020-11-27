declare function jsonStructure(json: any, keys: any): any;
declare function nonEmptyString(value: any): any;
declare function isNumber(value: any): any;
declare function wait(ms: number): Promise<number>;
export { jsonStructure, nonEmptyString, isNumber, wait };

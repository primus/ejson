interface StringifyOptions {
    canonical: boolean;
    indent: boolean|number|string;
}

interface CloneOptions {
    keyOrderSensitive: boolean;
}

export function clone<T>(obj: T): T;
export function parse(str: string): any;
export function stringify(obj: any, options?: StringifyOptions): string;

export function toJSONValue(obj: any): string;
export function fromJSONValue(obj: string): any;
export function isBinary(value: any): boolean;
export function newBinary(len: number): Uint8Array;
export function equals(a: any, b: any, options?: CloneOptions): boolean;

export function addType(name: string, deserializer: (serialized: any) => any): void;

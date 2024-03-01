import {Fun} from './interface';

export function setFunctionMetadata(name: string, arity: number, fn: Fun) {
    if (typeof name === 'string') {
        const nameDescriptor = Object.getOwnPropertyDescriptor(fn, 'name');

        if (!nameDescriptor || nameDescriptor.configurable) {
            Object.defineProperty(
                fn,
                'name',
                Object.assign(nameDescriptor || {}, {
                    configurable: true,
                    value: name
                })
            );
        }
    }


    if (typeof arity === 'number') {
        const lengthDescriptor = Object.getOwnPropertyDescriptor(fn, 'length');

        if (!lengthDescriptor || lengthDescriptor.configurable) {
            Object.defineProperty(
                fn,
                'length',
                Object.assign(lengthDescriptor || {}, {
                    configurable: true,
                    value: arity
                })
            );
        }
    }

    return fn;
}


export function throwError(gen: Generator, err: Error) {
    if (gen.throw) {
        gen.throw(err);
    }

    throw err;
}


export function makeError(msg: string, code: string) {
    return Object.assign(new Error(msg), {code});
}

export declare function parseScriptCode(code: string): {
    preprocessing?: string;
    component: string;
    postprocessing?: string;
};
export declare const JSX_ADDON_LENGTH = 31;
export declare function getRenderFunctionStart(objectExpression: any): number;
export declare function insertCreateElementFunction(before: string, after: string): string;
/**
 * Coming out of this function all SFC should be in the `new Vue()` format
 * it should as well have been stripped of exports and all imports should have been
 * transformed into requires
 */
export default function normalizeSfcComponent(code: string): {
    script: string;
    style?: string;
};

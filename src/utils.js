export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function checkObjValue(obj) {
    for (const props in obj) { 
        if (typeof obj[props] == 'object') {
            for (const item in obj[props]) {
                if (!obj[props][item]) {
                    return `${item} is empty!`
                }
            }
        }
    }
}

export const API_URL = import.meta.env.VITE_API_URL
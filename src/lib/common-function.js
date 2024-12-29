class CommonFunctionClass {
    constructor() {

    }

    eventBus = {
        on: (event, callback) => {
            document.addEventListener(event, (e) => callback(e.detail));
        },

        dispatch: (event, data) => {
            document.dispatchEvent(new CustomEvent(event, { detail: data }));
        },

        remove: (event, callback) => {
            document.removeEventListener(event, callback);
        }
    }

    generateId = (length = 20) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            // Generate a random index based on the characters length
            const randomIndex = Math.floor(Math.random() * charactersLength);
            // Append the character at the random index to the result
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    recursive = (nodes, fn, options) => {
        let _break = false;
        let _childrenProp = options?.childrenProp || "children";

        // break function
        let breakFn = () => {
            _break = true;
        }

        // recursive function
        let recursiveFn = (el, parentEl, index) => {
            let modifiedEl = fn?.(el, parentEl, breakFn, index);
            if (modifiedEl) el = modifiedEl;

            if (el[_childrenProp]?.length > 0) {
                for (let i = 0; i < el[_childrenProp].length; i++) {
                    if (_break) break;
                    recursiveFn(el[_childrenProp][i], el, i);
                }
            }
        }

        // loop
        for (let rootIndex = 0; rootIndex < nodes.length; rootIndex++) {
            if (_break) break;
            recursiveFn(nodes[rootIndex], null, rootIndex);
        }

        return nodes;
    }
}

export const CommonFunction = new CommonFunctionClass();
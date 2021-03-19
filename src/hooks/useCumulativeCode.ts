import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (blockId: string) => {
	return useTypedSelector((state) => {
		const { data, order } = state.vault;
		const orderVaults = order.map((id: any) => {
			return data[id];
		});

		const showVizFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var viz = (value) => {
            const root = document.querySelector("#root");
            if(typeof value === 'object'){
                if(value.$$typeof && value.props){ //check if its react
                    _ReactDOM.render(value,root);
                }else{
                    root.innerHTML = JSON.stringify(value)
                }
            }else{
                root.innerHTML = (value)
            }
        }`;
		const showVizNoop = `var viz = () => {}`;
		const codeChain = [];
		for (let v of orderVaults) {
			if (v.type === "code") {
				if (v.id === blockId) {
					codeChain.push(showVizFunc);
				} else {
					codeChain.push(showVizNoop);
				}
				codeChain.push(v.content);
			}
			if (v.id === blockId) {
				break;
			}
		}
		return codeChain;
	}).join('\n');
};

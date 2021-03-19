import { useEffect } from "react";
import CodeEditorComponent from "../CodeEditorComponent/codeeditor";
import CodePreviewComponent from "../CodePreviewComponent/codepreview";
import ResizableComponent from "../ResizableComponent/resizable";
import { Vault } from "../../core";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./codevault.css";

interface CodeVaultProps {
    block: Vault;
}

const CodeVaultComponent: React.FC<CodeVaultProps> = ({ block }) => {
    const { updateVault, createBundle } = useActions();
    const bundle = useTypedSelector((state) => {
        return state.bundle[block.id];
    });
    const codeChain = useTypedSelector((state) => {
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
        }`
        const showVizNoop = `var viz = () => {}`
        const codeChain = [];
        for (let v of orderVaults) {
            if (v.type === "code") {
                if (v.id === block.id) {
                    codeChain.push(showVizFunc);
                } else {
                    codeChain.push(showVizNoop);
                }
                codeChain.push(v.content);
            }
            if (v.id === block.id) {
                break;
            }
        }
        return codeChain;
    });

    useEffect(() => {
        if (!bundle) {
            createBundle(block.id, codeChain.join("\n"));
            return;
        }
        //debounce
        const timeSlug = setTimeout(async () => {
            createBundle(block.id, codeChain.join("\n"));
        }, 1000);
        return () => {
            clearTimeout(timeSlug);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeChain.join("\n"), block.id, createBundle]);

    // try {
    //     eval(result.outputFiles[0].text);
    // } catch (e) {
    //     console.log(e);
    // }

    return (
        <ResizableComponent direction="vertical">
            <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                <ResizableComponent direction="horizontal">
                    <CodeEditorComponent
                        initialValue={block.content}
                        onChange={(value) => updateVault(block.id, value)}
                    />
                </ResizableComponent>
                <div className="progress-capsule">
                    {!bundle || bundle.loading ? (
                        <div className="progress-wrapper">
                            <progress className="progress is-small is-primary" max="100">
                                loading
							</progress>
                        </div>
                    ) : (
                        <CodePreviewComponent
                            code={bundle.code}
                            bundleStatus={bundle.error}
                        />
                    )}
                </div>
            </div>
        </ResizableComponent>
    );
};

export default CodeVaultComponent;

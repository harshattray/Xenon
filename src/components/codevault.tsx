import { useEffect } from "react";
import CodeEditorComponent from "./CodeEditorComponent/codeeditor";
import CodePreviewComponent from "./CodePreviewComponent/codepreview";
import ResizableComponent from "./ResizableComponent/resizable";
import { Vault } from "../core";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface CodeVaultProps {
    block: Vault;
}

const CodeVaultComponent: React.FC<CodeVaultProps> = ({ block }) => {
    const { updateVault, createBundle } = useActions();

    const bundle = useTypedSelector((state) => {
        return state.bundle[block.id];
    });
    useEffect(() => {
        if (!bundle) {
            createBundle(block.id, block.content);
            return;
        }
        //debounce
        const timeSlug = setTimeout(async () => {
            createBundle(block.id, block.content);
        }, 1000);
        return () => {
            clearTimeout(timeSlug);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [block.content, block.id, createBundle]);

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
        </ResizableComponent>
    );
};

export default CodeVaultComponent;

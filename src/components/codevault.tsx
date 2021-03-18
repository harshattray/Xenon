import { useState, useEffect } from "react";
import CodeEditorComponent from "./CodeEditorComponent/codeeditor";
import CodePreviewComponent from "./CodePreviewComponent/codepreview";
import ServiceTrigger from "../bundler";
import ResizableComponent from "./ResizableComponent/resizable";
import { Vault } from '../core';
import { useActions } from '../hooks/useActions'

interface CodeVaultProps {
    block: Vault
}

const CodeVaultComponent: React.FC<CodeVaultProps> = ({ block }) => {

    const { updateVault } = useActions()

    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        //debounce 
        const timeSlug = setTimeout(async () => {
            const output = await ServiceTrigger(block.content);
            setCode(output.code);
            setError(output.err);
        }, 1000);
        return () => {
            clearTimeout(timeSlug)
        }
    }, [block.content])

    // try {
    //     eval(result.outputFiles[0].text);
    // } catch (e) {
    //     console.log(e);
    // }

    return (
        <ResizableComponent direction="vertical">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <ResizableComponent direction="horizontal">
                    <CodeEditorComponent
                        initialValue={block.content}
                        onChange={(value) => updateVault(block.id, value)}
                    />
                </ResizableComponent>
                <CodePreviewComponent code={code} bundleStatus={error} />
            </div>
        </ResizableComponent>
    );
};

export default CodeVaultComponent;
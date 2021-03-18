import { useState, useEffect } from "react";
import CodeEditorComponent from "./CodeEditorComponent/codeeditor";
import CodePreviewComponent from "./CodePreviewComponent/codepreview";
import ServiceTrigger from "../bundler";
import ResizableComponent from "./ResizableComponent/resizable";

const CodeVaultComponent = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        //debounce 
        const timeSlug = setTimeout(async () => {
            const output = await ServiceTrigger(input);
            setCode(output.code);
            setError(output.err);
        }, 1000);
        return () => {
            clearTimeout(timeSlug)
        }
    }, [input])

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
                        initialValue="// Enter JS code below"
                        onChange={(value) => setInput(value)}
                    />
                </ResizableComponent>
                <CodePreviewComponent code={code} bundleStatus={error} />
            </div>
        </ResizableComponent>
    );
};

export default CodeVaultComponent;
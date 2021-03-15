import { useState, useEffect } from "react";
import CodeEditorComponent from "./codeeditor";
import CodePreviewComponent from "./codepreview";
import ServiceTrigger from "../bundler";
import ResizableComponent from "./resizable";

const CodeVaultComponent = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        //debounce 
        const timeSlug = setTimeout(async () => {
            const output = await ServiceTrigger(input);
            setCode(output);
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
                <CodePreviewComponent code={code} />
            </div>
        </ResizableComponent>
    );
};

export default CodeVaultComponent;
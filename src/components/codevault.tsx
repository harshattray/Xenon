import { useState } from "react";
import CodeEditorComponent from "./codeeditor";
import CodePreviewComponent from "./codepreview";
import ServiceTrigger from "../bundler";
import ResizableComponent from "./resizable";

const CodeVaultComponent = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClick = async () => {
        // try {
        //     eval(result.outputFiles[0].text);
        // } catch (e) {
        //     console.log(e);
        // }
        const output = await ServiceTrigger(input);
        setCode(output);
    };

    return (
        <ResizableComponent direction="horizontal">
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <CodeEditorComponent
                    initialValue="// Enter JS code below"
                    onChange={(value) => setInput(value)}
                />
                <CodePreviewComponent code={code} />
            </div>
        </ResizableComponent>
    );
};

export default CodeVaultComponent;
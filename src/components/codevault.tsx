import { useState } from "react";
import CodeEditorComponent from "./codeeditor";
import CodePreviewComponent from "./codepreview";
import ServiceTrigger from "../bundler";

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
        <div>
            <CodeEditorComponent
                initialValue="// Enter JS code below"
                onChange={(value) => setInput(value)}
            />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <CodePreviewComponent code={code} />
        </div>
    );
};

export default CodeVaultComponent;
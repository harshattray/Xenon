import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { fetchPackage } from './plugins/fetch-package'
import CodeEditorComponent from './components/codeeditor'

const App = () => {
    const [input, setInput] = useState("");
    const ref = useRef<any>();
    const iframeRef = useRef<any>();

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
        });
    };

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
        if (!ref.current) return;
        //resetting the htm block within the iframe
        iframeRef.current.srcdoc = html;
        const result = await ref.current.build({
            entryPoints: ["index.js"],
            bundle: true,
            write: false,
            plugins: [fetchPlugin(), fetchPackage(input)],
            define: {
                "process.env.NODE_ENV": '"production"',
                global: "window",
            },
        });
        // try {
        //     eval(result.outputFiles[0].text);
        // } catch (e) {
        //     console.log(e);
        // }
        // setCode(result.outputFiles[0].text);
        iframeRef.current.contentWindow.postMessage(
            result.outputFiles[0].text,
            "*"
        ); // postMessage takes in 2 arguments and the 2nd one represents the domain name allowed
    };
    const html = `
    <html>
    <head></head>
    <body>
    <div id="root"></div>
    <script>
    window.addEventListener('message',(event) => {
        try {
           eval(event.data)
        } catch(error){
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>' + error + '</div>'
        }
    },false);
    </script>
    </body>
    </html>
  `;
    return (
        <div>
            <CodeEditorComponent />
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="mirror" ref={iframeRef} sandbox="allow-scripts" srcDoc={html}></iframe>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

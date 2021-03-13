import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";

interface EditorProps {
    initialValue: string;
    onChange: (value: string) => void
}

const CodeEditorComponent: React.FC<EditorProps> = ({ initialValue, onChange }) => {


    /**
     * editorDidMount is called initially when the editor mounts analogous to componentDidMount
     * @param fetchVal - fetches editor content, content depends on the watch mode
     * @param monacoEditor  refers to the context of the editor. We can watch for changes in the editor here
     */
    const editorMount: EditorDidMount = (fetchVal, monacoEditor) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(fetchVal())
        });
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
    }


    return (
        <div>
            <MonacoEditor
                value={initialValue}
                language="javascript"
                height="600px"
                theme="dark"
                editorDidMount={editorMount}
                options={{
                    wordWrap: "on",
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditorComponent;

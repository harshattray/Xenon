import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { useRef } from "react";
import "./codeeditor.css";
import './syntax.css';
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeshift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface EditorProps {
    initialValue: string;
    onChange: (value: string) => void;
}

const CodeEditorComponent: React.FC<EditorProps> = ({
    initialValue,
    onChange,
}) => {
    const editorRef = useRef<any>();

    /**
     * editorDidMount is called initially when the editor mounts analogous to componentDidMount
     * @param fetchVal - fetches editor content, content depends on the watch mode
     * @param monacoEditor  refers to the context of the editor. We can watch for changes in the editor here
     */
    const editorMount: EditorDidMount = (fetchVal, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(fetchVal());
        });
        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

        //format highlighter fix for jsx

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeshift,
            monacoEditor
        );
        highlighter.highLightOnDidChangeModelContent(
            () => { },
            () => { },
            undefined,
            () => { }
        );
    };

    const onClickFormat = () => {
        const preFormatted = editorRef.current.getModel().getValue();
        const formatted = prettier
            .format(preFormatted, {
                parser: "babel",
                plugins: [parser],
                useTabs: false,
                semi: true,
                singleQuote: true,
            })
            .replace(/\n$/, ""); // removing the empty line added by prettier
        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button
                className="button button-format is-primary is-small"
                onClick={onClickFormat}
            >
                Format
			</button>
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

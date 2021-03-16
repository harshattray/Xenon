import MDEditor from "@uiw/react-md-editor";
import "./texteditor.css";
import { useState, useEffect, useRef } from "react";

const MarkDownEditor: React.FC = () => {
    //state used to switch between
    const [editing, setEditing] = useState(false);
    const [markDownValue, setMarkDownValue] = useState("# Header");
    const watcherRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (
                watcherRef.current &&
                event.target &&
                watcherRef.current.contains(event.target as Node)
            ) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener("click", listener, { capture: true });
        //cleanup
        return () => {
            document.removeEventListener("click", listener, { capture: true });
        };
    }, []);

    if (editing) {
        return (
            <div className="text-editor card" ref={watcherRef}>
                <div className="card-content">
                    <MDEditor
                        value={markDownValue}
                        onChange={(d) => setMarkDownValue(d || "")}
                    />
                </div>
            </div>
        );
    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={markDownValue} />
        </div>
    );
};

export default MarkDownEditor;

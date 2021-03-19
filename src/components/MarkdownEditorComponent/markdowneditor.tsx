import MDEditor from "@uiw/react-md-editor";
import "./markdowneditor.css";
import { useState, useEffect, useRef } from "react";
import { Vault } from "../../core";
import { useActions } from "../../hooks/useActions";

interface MarkDownEditorProps {
    block: Vault;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = ({ block }) => {
    const { updateVault } = useActions();
    //state used to switch between
    const [editing, setEditing] = useState(false);
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
                        value={block.content}
                        onChange={(d) => updateVault(block.id, d || "")}
                    />
                </div>
            </div>
        );
    }
    return (
        <div onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={block.content || "Click to Edit"} />
            </div>
        </div>
    );
};

export default MarkDownEditor;

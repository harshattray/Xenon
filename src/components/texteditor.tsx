import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';


const MarkDownEditor: React.FC = () => {
    //state used to switch between 
    const [editing, setEditing] = useState(false)
    const watcherRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (watcherRef.current && event.target && watcherRef.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false)
        }
        document.addEventListener('click', listener, { capture: true })
        //cleanup
        return () => {
            document.removeEventListener('click', listener, { capture: true })
        }
    }, [])

    if (editing) {
        return (
            <div ref={watcherRef}>
                <MDEditor />
            </div>
        )
    }
    return (
        <div onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={"# Header"} />
        </div>
    )
}

export default MarkDownEditor
import { useRef, useEffect } from "react";
import "./codepreview.css";

interface CodePreviewProps {
    code: string;
    bundleStatus: string;
}

const html = `
<html>
<head>
<style> html{ background-color : white}</style>
</head>
<body>
<div id="root"></div>
<script>
const handleError = (error)=>{
    const root = document.querySelector('#root');
    root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>' + error + '</div>'
}

//handle async errors - replicate locally using setTimeout
window.addEventListener('error',(event)=>{
    handleError(event.error)
})

window.addEventListener('message',(event) => {
    try {
       eval(event.data)
    } catch(error){
        handleError(error)
    }
},false);
</script>
</body>
</html>
`;

const CodePreviewComponent: React.FC<CodePreviewProps> = ({
    code,
    bundleStatus,
}) => {
    const iframeRef = useRef<any>();

    useEffect(() => {
        //resetting the htm block within the iframe
        iframeRef.current.srcdoc = html;
        // postMessage takes in 2 arguments and the 2nd one represents the domain name allowed
        setTimeout(() => {
            iframeRef.current.contentWindow.postMessage(code, "*");
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                title="mirror"
                ref={iframeRef}
                sandbox="allow-scripts"
                srcDoc={html}
            />
            {bundleStatus && <div className="preview-error">{bundleStatus}</div>}
        </div>
    );
};

export default CodePreviewComponent;

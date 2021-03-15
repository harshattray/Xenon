import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableComponentProps {
    direction: "horizontal" | "vertical";
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
    direction,
    children,
}) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);


    useEffect(() => {
        let timer: any;

        const watcher = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }
            }, 100);
        };
        window.addEventListener("resize", watcher);
        return () => {
            window.removeEventListener("resize", watcher);
        };
    }, [width]);

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            height: Infinity,
            width: width,
            resizeHandles: ["e"],
            onResizeStop: (e, data) => {
                setWidth(data.size.width)
            }
        };
    } else {
        resizableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 20],
            height: 300,
            width: Infinity,
            resizeHandles: ["s"],
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableComponent;

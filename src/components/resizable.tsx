import { ResizableBox } from 'react-resizable';
import './resizable.css'

interface ResizableComponentProps {
    direction: 'horizontal' | 'vertical'
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({ direction, children }) => {
    return (
        <ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
            {children}
        </ResizableBox>
    )
}

export default ResizableComponent;
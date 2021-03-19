import { useActions } from '../../hooks/useActions';
import './controlcenter.css'

interface ControlCenterProps {
    id: string
}

const ControlCenterComponent: React.FC<ControlCenterProps> = ({ id }) => {
    const { deleteVault, moveVault } = useActions()
    return (
        <div className="control-center">
            <button className="button is-primary is-small" onClick={() => moveVault(id, 'up')}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={() => moveVault(id, 'down')}>
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button className="button is-primary is-small" onClick={() => deleteVault(id)}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div >
    )
}

export default ControlCenterComponent
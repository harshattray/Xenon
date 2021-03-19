import "./addcell.css";
import { useActions } from "../../hooks/useActions";

interface AddCellComponentProps {
    prevCellId: string | null;
    forceVisible?: boolean;
}

const AddCellComponent: React.FC<AddCellComponentProps> = ({ prevCellId, forceVisible }) => {
    const { insertVaultAfter } = useActions();
    return (
        <div className={`add-cell  ${forceVisible && 'force-visible'}`}>
            <div className="add-buttons">
                <button className=" button is-rounded is-primary is-small" onClick={() => insertVaultAfter(prevCellId, "code")}>
                    <span className="icon is-small">
                        <i className="fas fa-code"></i>
                    </span>
                    <p className="inline-spacing">Code</p>
                </button>
                <button className=" button is-rounded is-primary is-small" onClick={() => insertVaultAfter(prevCellId, "markdown")}>
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <p className="inline-spacing">MarkDown</p>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
};

export default AddCellComponent;

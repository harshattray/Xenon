import { Vault } from "../core";
import CodeVaultComponent from "./codevault";
import MarkDownEditor from "./MarkdownEditorComponent/markdowneditor";
import ControlCenterComponent from "./controlcenter";
import "./blockListItem.css";
import { Fragment } from "react";

interface BlockListItemProps {
    block: Vault;
}

const BlockListItem: React.FC<BlockListItemProps> = ({ block }) => {
    let child: JSX.Element;

    if (block.type === "code") {
        child = (
            <Fragment>
                <div className="control-center-wrapper">
                    <ControlCenterComponent id={block.id} />
                </div>
                <CodeVaultComponent block={block} />
            </Fragment>
        );
    } else {
        child = (
            <Fragment>
                <MarkDownEditor block={block} />
                <ControlCenterComponent id={block.id} />
            </Fragment>
        );
    }
    return <div className="block-list-item">{child}</div>;
};

export default BlockListItem;

import { useTypedSelector } from "../../hooks/useTypedSelector";
import BlockListItem from "./blockListItem";
import { Fragment } from "react";
import { block } from "jscodeshift";
import AddCellComponent from '../AddCellComponent/addcell'
import './blocklist.css'

const BlockList: React.FC = () => {
    const blocks = useTypedSelector(({ vault: { order, data } }) => {
        return order.map((id: string) => {
            return data[id];
        });
    });

    const renderedBlocks = blocks?.map((block) => (
        <Fragment key={block.id}>
            <BlockListItem block={block} />
            <AddCellComponent prevCellId={block.id} />
        </Fragment>
    ));
    return (<div className="block-list">
        <AddCellComponent forceVisible={block.length === 0} prevCellId={null} />
        {renderedBlocks}
    </div>);
};

export default BlockList;

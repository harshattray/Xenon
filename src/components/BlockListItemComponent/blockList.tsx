import { useTypedSelector } from "../../hooks/useTypedSelector";
import BlockListItem from "./blockListItem";
import AddCellComponent from '../AddCellComponent/addcell'
import { Fragment } from "react";
import { block } from "jscodeshift";

const BlockList: React.FC = () => {
    const blocks = useTypedSelector(({ vault: { order, data } }) => {
        return order.map((id: string) => {
            return data[id];
        });
    });

    const renderedBlocks = blocks?.map((block) => (
        <Fragment key={block.id}>
            <AddCellComponent prevCellId={block.id} />
            <BlockListItem block={block} />
        </Fragment>
    ));
    return <div>
        {renderedBlocks}
        <AddCellComponent forceVisible={block.length === 0} prevCellId={''} />
    </div>;
};

export default BlockList;

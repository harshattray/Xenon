import { useTypedSelector } from "../hooks/useTypedSelector";
import BlockListItem from "./blockListItem";

const BlockList: React.FC = () => {
    const blocks = useTypedSelector(({ vault: { order, data } }) => {
        return order.map((id: string) => {
            return data[id];
        });
    });

    const renderedBlocks = blocks?.map((block) => (
        <BlockListItem key={block.id} block={block} />
    ));
    return <div>{renderedBlocks}</div>;
};

export default BlockList;

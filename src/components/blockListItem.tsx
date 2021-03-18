import { JSXElement } from 'jscodeshift';
import { Vault } from '../core';
import CodeVaultComponent from './codevault';
import MarkDownEditor from './MarkdownEditorComponent/markdowneditor'

interface BlockListItemProps {
    block: Vault
}

const BlockListItem: React.FC<BlockListItemProps> = ({ block }) => {
    let child: JSX.Element;

    if (block.type === 'code') {
        child = <CodeVaultComponent />
    }
    else {
        child = <MarkDownEditor />
    }
    return (
        <div>{child}</div>
    )
}

export default BlockListItem
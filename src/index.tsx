import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { store } from './core'
// import CodeVaultComponent from "./components/codevault";
// import MarkDownEditor from './components/TextEditorComponent/texteditor'
import "bulmaswatch/darkly/bulmaswatch.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css'
import BlockList from "./components/BlockListItemComponent/blockList";


const App = () => {
    return (
        <Provider store={store}>
            <div>
                <BlockList />
                {/* <CodeVaultComponent /> */}
                {/* <MarkDownEditor /> */}
            </div>
        </Provider>

    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

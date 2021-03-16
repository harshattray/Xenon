import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { store } from './core'
// import CodeVaultComponent from "./components/codevault";
import MarkDownEditor from './components/TextEditorComponent/texteditor'
import "bulmaswatch/darkly/bulmaswatch.min.css";


const App = () => {
    return (
        <Provider store={store}>
            <div>
                {/* <CodeVaultComponent /> */}
                <MarkDownEditor />
            </div>
        </Provider>

    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

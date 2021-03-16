import "bulmaswatch/darkly/bulmaswatch.min.css";
import ReactDOM from "react-dom";
// import CodeVaultComponent from "./components/codevault";
import MarkDownEditor from './components/texteditor'

const App = () => {
    return (
        <div>
            {/* <CodeVaultComponent /> */}
            <MarkDownEditor />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

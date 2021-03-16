import "bulmaswatch/darkly/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CodeVaultComponent from "./components/codevault";

const App = () => {
    return (
        <div>
            <CodeVaultComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

const React = require("react");

export class App extends React.Component {
    render() {
        const filteredData = this.props.data.filter(item => Object.keys(item.variables).length > 0);

        return (
            <div>
                {filteredData.map((item) => {
                    return (
                        <div>
                            <h3>{item.filename.replace("./node_modules/@unumux/", "")}</h3>
                            {renderVariables(item.variables)}
                        </div>
                    )
                })}
            </div>
        );
    }
}

function renderVariables(variables) {
    return (
        <ul>
            {Object.keys(variables).map((key) => {
                const value = variables[key];
                return (
                    <li>
                        <strong>{key}: </strong>
                        {typeof value === 'string' ? value : renderVariables(value)}
                    </li>
                )
            })}
        </ul>
    );
}
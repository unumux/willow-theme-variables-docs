import React from "react";
import styled from "styled-components";


export class App extends React.Component {
    render() {
        const filteredData = this.props.data.filter(item => Object.keys(item.variables).length > 0);

        return (
            <table>
                <style dangerouslySetInnerHTML={{__html: `
                    h3 {
                        margin-bottom: 0;
                    }

                    th, td {
                        padding: 5px;
                    }

                    th {
                        background: #eee;
                        text-align: right;
                    }

                    .filename {
                        background: #ddd;
                        text-align: center;
                    }
                `}}/>
                {filteredData.map((item) => {
                    return [
                        <tr>
                            <th className="filename" colSpan="3"><h3>{item.filename.replace("./node_modules/@unumux/theme-coloniallife-default/variables/", "")}</h3></th>
                        </tr>,
                        renderVariables(item.variables)
                    ];
                })}
            </table>
        );
    }
}

function renderVariables(variables) {
    return Object.keys(variables).map((key) => {
        const value = variables[key];
        return (
            <tr>
                <th>{key}: </th>
                <td>{typeof value === 'string' ? value : <table>{renderVariables(value)}</table>}</td>
            </tr>
        )
    })
}
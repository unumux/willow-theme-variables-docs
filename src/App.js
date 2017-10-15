import React, { Component } from 'react';
import styled from "styled-components";

import * as color from "./util/color"

import {Main} from "./Main";
import {Toolbar} from "./Toolbar";

import data from "./data/theme-coloniallife-default.json";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f9f9f9;
    display: flex;
    flex-direction: column; 
`;

class App extends Component {
  get filteredData() {
    return data
        .filter(item => Object.keys(item.variables).length > 0)
        .map(item => { 
            return { 
                ...item,
                filename: item.filename.replace(/\.\/node_modules\/@unumux\/theme-[^\/]*\/variables\//, "")
            }
        });
  }

  get spacingValues() {
    const availableProps = ["space-xxs", "space-xs", "space-s", "space", "space-l", "space-xl", "space-xxl"];
    const allSpacingVariables = this.filteredData
        .find(item => item.filename === "constants/_spacing.scss").variables;
    
    return availableProps.map((key) => {
        return {
            key,
            value: parseFloat(allSpacingVariables[key])
        }
    });
  }

  get allVars() {
    return this.filteredData.reduce((prev = [], item) => {
        return [
            ...prev,
            ...Object.keys(item.variables).map((key) => {
                return {
                    key,
                    value: item.variables[key],
                    filename: item.filename
                }
            })
        ];
      }, []);
  }

  get colors() {
    return this.allVars.filter(variable => typeof variable.value === 'string' && variable.value.indexOf("#") === 0);
  }

  constructor(props) {
    super(props);

    this.state = {
        selectedFile: "View All"
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.findNearestSpacing = this.findNearestSpacing.bind(this);
    this.findNearestColor = this.findNearestColor.bind(this);
  }

  onFileChange(e) {
    this.setState({
        selectedFile: e.target.value
    });
  }

  findNearestColor() {
      const hexColor = prompt("Enter a hex color");
      const labColor1 = color.rgb2lab(color.hexToRgb(hexColor));
      
      const sortedColors = this.colors.map((item) => {
        return {
            ...item,
            deltaE: color.deltaE(color.rgb2lab(color.hexToRgb(item.value)), labColor1)
        }
      }).sort((a, b) => a.deltaE - b.deltaE);

      const closestColor = sortedColors[0];

      this.setState(() => {
          return {
              selectedFile: closestColor.filename
          }
      }, () => {
        setTimeout(() => {
            alert(`Closest color variable is $${closestColor.key} with a value of ${closestColor.value}. It has a difference of ${closestColor.deltaE}, which is ${color.deltaEText(closestColor.deltaE)}.`)
        }, 10);
      });
  }

  findNearestSpacing() {
      const spacingString = prompt("Enter a spacing value in px");
      const spacing = parseFloat(spacingString);
      if(spacing) {
          this.setState(function() {
              return {
                selectedFile: "constants/_spacing.scss"
              };
          }, () => {
              setTimeout(() => {
                const closest = this.spacingValues.map((item) => {
                    return {
                        ...item,
                        delta: Math.abs(item.value - spacing)
                    };
                }).sort((a, b) => a.delta > b.delta)[0];
        
                alert(`Closest spacing variable to ${spacing}px is $${closest.key} with a value of ${closest.value}px`)
            }, 10);
          });
      }
  }

  render() {
    const filteredDataWithSelectedFile = this.filteredData.filter((item) => {
        if(this.state.selectedFile === "View All") return true;
        return item.filename === this.state.selectedFile;
    });

    return (
        <AppContainer>
            <Toolbar 
                data={this.filteredData} 
                onFileChange={this.onFileChange} 
                selectedFile={this.state.selectedFile}
                findNearestSpacing={this.findNearestSpacing}
                findNearestColor={this.findNearestColor}
            />
            <Main data={filteredDataWithSelectedFile}></Main>
        </AppContainer>
    );
  }
}

export default App;

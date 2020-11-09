import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Picker />
    </div>
  );
}

function Voxel(props) {
  return (
    <button className="voxel" id={props.selected ? "selected" : null} onClick={props.onClick}>
      ({ props.x + ', ' + props.y})
    </button>
  )
}


function OutputField(props) {
  return (
    <div className="output">{props.coordinates}</div>
  );
}

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 7,
      voxels: [],
      selected: [],
    };
  }

  componentDidMount() {
    const size = this.state.size;
    const toShow = new Array(0);
    var yVal = size - 1;
    for (var i = 0; i < size ** 2; i += size) {
      var row = [];
      var xVal = 0;
      for (var j = 0; j < size; j++) {
        const cell = {
          x: xVal,
          y: yVal,
          id: xVal,
          selected: false,
        }
        row.push(cell);
        xVal += 1;
      }
      yVal -= 1;
      toShow.push(row)
    }
    this.setState({ voxels: toShow })
  }

  handleClick(x, y, selected) {
    console.log(x + ', ' + y)
  }

  render() {
    return (
      <div className="picker">
        <OutputField />
        {this.renderGrid()}
      </div>
    );
  }

  renderVoxel(voxObj) {
    console.log(voxObj)
    return (
      <Voxel
        x={voxObj.x}
        y={voxObj.y}
        id={voxObj.selected}
        onClick={() => this.handleClick(voxObj.x, voxObj.y, voxObj.selected)}
      />
    )
  }

  renderGrid() {
    return (
      <div className="grid">
        console.log(this.state.voxels)
        { this.state.voxels.map((row) =>
          <div className="row">
            {
              row.map((coordinate) =>
                this.renderVoxel(coordinate)
              )
            }
          </div>
        )}
      </div>
    );
  }
}

export default App;

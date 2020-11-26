import React from 'react';
import './App.css';

import Voxel from './voxel';

function App() {
  return (
    <div className="App">
      <Picker />
    </div>
  );
}

function VoxelButton(props) {
  return (
    <button className="voxel" id={props.selected ? "selected" : null} onClick={props.onClick}>
      ({ props.x + ', ' + props.y})
    </button>
  )
}

function ResetButton(props) {
  return (
    <button className="panel-button" onClick={props.onClick}>
      Reset Grid
    </button>
  );
}

function DownloadButton(props) {
  return (
    <button className="panel-button" onClick={props.onClick}>
      Download
    </button>
  );
}


function OutputField(props) {
  return (
    <div className="output">
      <h3 id="coordinates">Coordinates</h3>
      <ul>
        {props.coordinates.map((coordinate) =>
          <li>
            {coordinate.x + ',' + coordinate.y}
          </li>
        )}
      </ul>
    </div >
  );
}

class Picker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 7,
      voxels: [],
    };
  }

  getSelected = () => {
    const selected = [];
    this.state.voxels.forEach(function (row) {
      row.forEach(function (voxel) {
        if (voxel.selected) {
          selected.push(voxel);
        }
      })
    })
    return selected;
  }

  downloadFile() {
    console.log(this.getSelected());
    //const blob = new Blob(this.getSelected.toString());

  }

  componentDidMount() {
    const size = this.state.size;
    const toShow = new Array(0);
    var yVal = size - 1;
    for (var i = 0; i < size ** 2; i += size) {
      var row = [];
      var xVal = 0;
      for (var j = 0; j < size; j++) {
        const cell = new Voxel(xVal,yVal)
        row.push(cell);
        xVal += 1;
      }
      yVal -= 1;
      toShow.push(row)
    }
    this.setState({ voxels: toShow })
  }

  handleClick(voxObj) {
    const voxels = this.state.voxels.slice();
    voxels.forEach((row) => {
      row.forEach((curVox) => {
        if (curVox.equals(voxObj)) {
          curVox.toggleStatus();
        }
      })
    })
    this.setState({ voxels: voxels });
  }

  resetGrid() {
    const voxels = this.state.voxels;
    voxels.forEach((row) => {
      row.forEach((voxel) => {
        voxel.selected = false;
      });
    });
    this.setState({voxels: voxels});
  }

  render() {
    return (
      <div className="picker">
        <div className="panel">
          <OutputField coordinates={this.getSelected()} />
          <DownloadButton onClick={() => this.downloadFile()} />
          <ResetButton onClick={() => this.resetGrid()}/>
        </div>
        {this.renderGrid()}
      </div>
    );
  }

  renderVoxel(voxObj) {
    return (
      <VoxelButton
        x={voxObj.x}
        y={voxObj.y}
        selected={voxObj.selected}
        onClick={() => this.handleClick(voxObj)}
      />
    )
  }

  renderGrid() {
    return (
      <div className="grid">
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

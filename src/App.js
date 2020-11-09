import React from 'react';
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

function ResetButton(props) {
  return (
    <button className="reset" onClick={props.onClick}>
      Reset Grid
    </button>
  )
}


function OutputField(props) {
  return (
    <div className="output">
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

  getSelected() {
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

  handleClick(voxObj) {
    const voxels = this.state.voxels.slice();
    for (var i = 0; i < voxels.length; i++) {
      for (var j = 0; j < voxels[i].length; j++) {
        var curVox = voxels[i][j]
        if (curVox === voxObj) {
          curVox.selected = !curVox.selected;
        }
      }
    }
    this.setState({ voxels: voxels });
  }

  resetGrid() {
    const voxels = this.state.voxels;
    voxels.forEach(function(row) {
      row.forEach(function(voxel) {
        voxel.selected = false;
      });
    });
    this.setState({voxels: voxels});
  }

  render() {
    return (
      <div className="picker">
        <div>
        <OutputField coordinates={this.getSelected()} />
        <ResetButton onClick={() => this.resetGrid()}/>
        </div>
        {this.renderGrid()}
      </div>
    );
  }

  renderVoxel(voxObj) {
    return (
      <Voxel
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

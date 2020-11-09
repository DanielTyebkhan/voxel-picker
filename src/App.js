import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Picker />
    </div>
  );
}

class Voxel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    }
  }

  render() {
    return (
      <button className="voxel" id={this.state.selected ? "selected" : null} onClick={() => this.setState({ selected: !this.state.selected })}>
        ({ this.props.x + ', ' + this.props.y})
      </button >
    )
  }

  isSelected = () => this.state.selected;

  getCoordinates = () => [this.props.x, this.props.y];
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voxels: new Array(this.props.size ** 2).fill(null),
    }
  }

  getSelections() {
    const coordinates = new Array(this.props.size);
    this.state.voxels.foreach(function (voxel) {
      if (voxel.isSelected) {
        coordinates.push(voxel.getCoordinates);
      }
    });
    console.log(coordinates)
    return coordinates;
  }

  render() {
    const toShow = new Array(0);
    var yVal = this.props.size - 1;
    for (var i = 0; i < this.props.size ** 2; i += this.props.size) {
      var row = new Array(0);
      var xVal = 0;
      for (var j = 0; j < this.props.size; j++) {
        row.push(new Array(xVal, yVal));
        console.log(row)
        xVal += 1;
      }
      yVal -= 1;
      toShow.push(row)
    }
    return (
      <div className="grid">
        { toShow.map((row) =>
          <div className="row">
            {
              row.map((coordinate) =>
                <Voxel x={coordinate[0]} y={coordinate[1]} />
              )
            }
          </div>
        )}
      </div>
    );
  }
}

function OutputField(props) {
  return (
    <div className="output">{props.coordinates}</div>
  );

}

class Picker extends React.Component {
  render() {
    return (
      <div className="picker">
        <OutputField />
        <Grid size={7} />
      </div>
    );
  }
}

export default App;

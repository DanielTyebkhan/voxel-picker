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
  render() {
    return (
      <div className="grid">
        { this.props.voxels.map((row) =>
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

  constructor(props) {
    super(props);
    this.state = {
      size: 7,
      voxels: new Array(),
    };
  }

  componentWillMount() {
    const size = this.state.size;
    const toShow = new Array(0);
    var yVal = size - 1;
    for (var i = 0; i < size ** 2; i += size) {
      var row = new Array(0);
      var xVal = 0;
      for (var j = 0; j < size; j++) {
        row.push(new Array(xVal, yVal));
        xVal += 1;
      }
      yVal -= 1;
      toShow.push(row)
    }
    console.log(toShow)
    this.setState({ voxels: toShow }, console.log('state'))
  }

  render() {
    return (
      <div className="picker">
        <OutputField />
        <Grid size={this.state.size} voxels={this.state.voxels} />
      </div>
    );
  }
}

export default App;

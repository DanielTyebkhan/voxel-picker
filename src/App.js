import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid size={5} />
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
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voxels: new Array(this.props.size ** 2).fill(null),
    }
  }

  render() {
    const toShow = this.state.voxels.slice();
    var yVal = this.props.size - 1;
    for (var i = 0; i < this.props.size ** 2; i += this.props.size) {
      var row = new Array(this.props.size);
      var xVal = 0;
      for (var j = 0; j < this.props.size; j++) {
        row.push(<Voxel x={xVal} y={yVal} />);
        xVal += 1;
      }
      yVal -= 1;
      toShow.push(row)
    }
    return (
      toShow.map((number) => <div>{number}</div>)
    );
  }
}

export default App;

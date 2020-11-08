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
      <button className="voxel" onClick={() => alert('hi')}>
        { this.props.value}
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

  renderVoxel(i) {
    return (
      <Voxel value={i} />
    )
  }

  onVoxelClick() {

  }

  render() {
    const toShow = this.state.voxels.slice();
    for (var i = 0; i < this.props.size ** 2; i += this.props.size) {
      var row = new Array(this.props.size);
      for (var j = 0; j < this.props.size; j++) {
        row.push(<Voxel value={j} />);
      }
      toShow.push(row)
    }
    console.log(toShow);
    return (
      toShow.map((number) => <div>{number}</div>)
    );
  }
}

export default App;

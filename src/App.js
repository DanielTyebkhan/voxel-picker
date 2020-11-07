import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

function Voxel(props) {
  return (
    <button className="voxel">
      Yay a button
    </button>
  )
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    const size = 10;
    this.state = {
      voxels: new Array(size).fill(null),
    }
  }

  render() {
    return <Voxel />
  }
}

export default App;

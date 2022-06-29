import React, { Component } from "react";
import "./seive.css";
import Cells from "./cells/cells/cells";
import Controls from "./Controller/controller";
import Logo from "./logo.png";
import Spiral from "./spiral";
import { seive } from "./algorithm/seive";

export default class Seive extends Component {
  state = {
    number: 100,
    cells: [],
    isRunning: false,
    speed: 500,
    algo: 0,
    prime: [],
    maxPrime: 0,
  };

  componentDidMount = () => {
    const cells = getCells(this.state.number);
    this.setState({ cells });
  };

  render() {
    return (
      <div>
        {/* ------ Heading of page------ */}
        <div className="nav">
          <img className="logo" src={Logo} alt="logo" />
          <label className="mainHeading">Prime Numbers</label>
        </div>

        <div className="buttons">
          {/* ------ Controls------ */}
          <Controls
            sizeChanger={(event) => {
              this.handleSizeChange(event.target.value);
            }}
            speedChanger={(event) => {
              this.changeSpeed(event.target.value);
            }}
          />

          <div className="buttonContainer">
            {/* <button className="refresh" onClick={getCells(this.state.number)}>
              Refresh
            </button> */}
            <button className="startSeive" onClick={this.startSeive}>
              Visualize
            </button>
          </div>
        </div>

        {this.state.algo === 0 && (
          <Cells num={this.state.number} cells={this.state.cells} />
        )}
        {this.state.algo === 1 && (
          <Spiral
            num={this.state.number}
            primes={this.state.primes}
            maxPrime={this.state.maxPrime}
          />
        )}
        {/* <Cells cells={this.state.cells} size={this.state.size} /> */}
      </div>
    );
  }

  changeSpeed = (speed) => {
    this.setState({ speed: 600 - speed * 10 });
  };

  handleSizeChange = (number) => {
    const cells = getCells(number);
    this.setState({ number: number, cells, isRunning: false });
  };

  // function to start seive of erathosthenes
  //   startSeive = async () => {
  //     this.setState({ isRunning: true });
  //     const prime = [];

  //     for (let i = 0; i <= this.state.size; i++) {
  //       prime.push(i);
  //     }

  //     prime[0] = prime[1] = 0;
  //     let changedCells = this.state.cells;
  //     let prevCheck = -1;
  //     let counter = 0;

  //     for (let i = 2; i <= this.state.size; i++) {
  //       if (prime[i] === 1) {
  //         changedCells = getNewCellPrimeToggled(changedCells, i - 1); //to mark the cell as prime(green)
  //         this.setState({ cells: changedCells });

  //         await sleep(this.state.speed);
  //         counter++;

  //         for (let j = i * i; j <= this.state.size; j += i) {
  //           changedCells = getNewCellsVisitingToggled(changedCells, j - 1);
  //           changedCells = getNewCellsCheckToggled(changedCells, j - 1);
  //           this.setState({ cells: changedCells });

  //           await sleep(this.state.speed);
  //           counter++;
  //           prime[j] = 0;
  //         }
  //       }
  //     }
  //   };
  // }

  // const getNewCellPrimeToggled = (cells, index) => {
  //   const newCells = cells.slice();
  //   const cell = newCells[index];
  //   const newCell = { ...cell, isPrime: true };
  //   newCells[index] = newCell;
  //   return newCells;
  // };

  // const getNewCellsVisitingToggled = (cells, index) => {
  //   const newCells = cells.slice();
  //   const cell = newCells[index];
  //   const newCell = { ...cell, isVisiting: true };
  //   newCells[index] = newCell;
  //   return newCells;
  // };

  // const getNewCellsCheckToggled = (cells, index) => {
  //   const newCells = cells.slice();
  //   const cell = newCells[index];
  //   const newCell = { ...cell, isChecking: true };
  //   newCells[index] = newCell;
  //   return newCells;
  // };

  // const getCells = (rows) => {
  //   const cells = [];
  //   for (let cell = 1; cell <= rows; cell++) {
  //     console.log(cell);
  //     cells.push(createCell(cell));
  //   }
  //   return cells;
  // };

  // const createCell = (val) => {
  //   return {
  //     val,
  //     isChecking: false,
  //     isVisiting: false,
  //     isPrime: false,
  //   };
  // };

  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  startAlgo = () => {
    console.log(this.state.algo);
    if (this.state.algo === 0) {
      this.startSeive();
    } else if (this.state.algo === 1) {
      this.startSpiral();
    }
  };
  startSpiral = async () => {
    let pprimes = seive(this.state.number * 100);
    let primes = [];
    this.setState({ primes: [], maxPrime: pprimes[pprimes.length - 1] });
    let mod = Math.ceil(this.state.number / 10);
    for (let i = 0; i < pprimes.length; i++) {
      primes.push(pprimes[i]);

      if (i % mod === 0) {
        this.setState({ primes });
        await sleep(10);
      }
    }
    console.log("done");
  };
  startSeive = async () => {
    const speed = this.state.speed;
    this.setState({ isRunning: true });
    const prime = [];
    for (let i = 0; i <= this.state.number; i++) {
      prime.push(1);
    }
    prime[0] = prime[1] = 0;
    let changedCells = this.state.cells;
    let prevCheck = -1;
    let counter = 0;
    for (let i = 2; i <= this.state.number; i++) {
      if (prime[i] === 1) {
        //   setTimeout(()=>{
        changedCells = getNewCellPrimeToggled(changedCells, i - 1);
        this.setState({ cells: changedCells });
        //},counter*speed);
        await sleep(this.state.speed);
        counter++;
        for (let j = i * i; j <= this.state.number; j += i) {
          //setTimeout(()=>{
          if (prevCheck != -1) {
            changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
          }
          prevCheck = j - 1;
          changedCells = getNewCellCheckToggled(changedCells, j - 1);
          changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
          this.setState({ cells: changedCells });
          //  },counter*speed);
          await sleep(this.state.speed);
          counter++;
          prime[j] = 0;
        }
      }
    }
    //  setTimeout(()=>{
    changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
    this.setState({ cells: changedCells, isRunning: false });
    // },counter*speed);
  };
}

const getNewCellPrimeToggled = (cells, pos) => {
  const newCells = cells.slice();
  const cell = newCells[pos];
  const newCell = {
    ...cell,
    isPrime: true,
  };
  newCells[pos] = newCell;
  return newCells;
};

const getNewCellVisitingToggled = (cells, pos) => {
  const newCells = cells.slice();
  const cell = newCells[pos];
  const newCell = {
    ...cell,
    isVisiting: !cell.isVisiting,
  };
  newCells[pos] = newCell;
  return newCells;
};

const getNewCellCheckToggled = (cells, pos) => {
  const newCells = cells.slice();
  const cell = newCells[pos];
  const newCell = {
    ...cell,
    isChecking: true,
  };
  newCells[pos] = newCell;
  return newCells;
};

const getCells = (rows) => {
  const cells = [];
  for (let cell = 1; cell <= rows; cell++) {
    cells.push(createCell(cell));
  }
  return cells;
};
const createCell = (val) => {
  return {
    val,
    isChecking: false,
    isVisiting: false,
    isPrime: false,
  };
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

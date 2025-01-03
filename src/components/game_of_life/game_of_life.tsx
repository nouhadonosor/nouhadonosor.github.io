import React, { ChangeEvent } from "react";
import { Vector2d } from "utils/types";
import { glider_flower } from "./prefabs";
import "./game_of_life.scss";

type CellPropsType = {
  cell_size: number;
  x: number;
  y: number;
};

type CellStateType = {
  cell_size: number;
};

class Cell extends React.Component<CellPropsType, CellStateType> {
  constructor(props: CellPropsType) {
    super(props);

    this.state = {
      cell_size: props.cell_size,
    };
  }

  render() {
    const { x, y } = this.props;
    return (
      <div
        className="Cell"
        style={{
          left: `${this.state.cell_size * x + 1}px`,
          top: `${this.state.cell_size * y + 1}px`,
          width: `${this.state.cell_size - 1}px`,
          height: `${this.state.cell_size - 1}px`,
        }}
      />
    );
  }
}

type BoardMatrixType = boolean[][];

type BoardPropsType = {
  height_cells: number;
  width_cells: number;
  cell_size: number;
  isRunning?: boolean;
};

type BoardStateType = {
  cells: Vector2d[];
  isRunning: boolean;
  isPaused: boolean;
  interval: number;
  isMouseDragging: boolean;
  lastDraggedCell: [number, number];
  isDraggingFill: boolean;

  cell_size: number;
  width_pixels: number;
  height_pixels: number;
};

class GameOfLife extends React.Component<BoardPropsType, BoardStateType> {
  rows: number;
  cols: number;
  board: BoardMatrixType;
  timeoutHandler: number | null = null;
  boardRef: HTMLDivElement | null = null;
  mounted: boolean = false;

  constructor(props: BoardPropsType) {
    super(props);

    this.rows = props.height_cells; //HEIGHT / CELL_SIZE;
    this.cols = props.width_cells; //WIDTH / CELL_SIZE;

    this.board = this.makeEmptyBoard();

    const cell_size = props.cell_size;
    this.state = {
      cells: this.makeCells(), //[],
      isRunning: props.isRunning || false,
      isPaused: false,
      interval: 100,
      isMouseDragging: false,
      lastDraggedCell: [0, 0],
      isDraggingFill: true,

      cell_size: cell_size,
      width_pixels: props.width_cells * cell_size,
      height_pixels: props.height_cells * cell_size,
    };

    this.handleRunGameChange(props.isRunning || false);
  }

  makeEmptyBoard(prev_board: BoardMatrixType | null = null) {
    let board: BoardMatrixType = [];
    if (prev_board) {
      const old_board_width = prev_board.length;
      const old_board_height = old_board_width > 0 ? prev_board[0].length : 0;
      if (old_board_width === this.cols && old_board_height === this.rows) {
        return prev_board;
      }

      for (let y = 0; y < this.rows + 1; y++) {
        if (y < old_board_width) {
          board[y] = prev_board[y].slice(0, this.cols);
        } else {
          board[y] = [];
          for (let x = 0; x < this.cols; x++) {
            board[y][x] = false;
          }
        }
      }
      return board;
    } else {
      for (let y = 0; y < this.rows + 1; y++) {
        board[y] = [];
        for (let x = 0; x < this.cols; x++) {
          board[y][x] = false;
        }
      }
    }
    return board;
  }

  addSubMatrixToBoard(submatrix: BoardMatrixType, start_point: Vector2d) {
    if (this.board) {
      for (
        let y = start_point.y;
        y < Math.min(this.rows, start_point.y + submatrix.length);
        y++
      ) {
        for (
          let x = start_point.x;
          x < Math.min(this.cols, start_point.x + submatrix[0].length);
          x++
        ) {
          const relative_x = x - start_point.x;
          const relative_y = y - start_point.y;

          this.board[y][x] = submatrix[relative_y][relative_x];
        }
      }
    }
  }

  getElementOffset() {
    const rect = this.boardRef?.getBoundingClientRect();

    return {
      x: rect?.left || 0,
      y: rect?.top || 0,
    };
  }

  makeCells() {
    let cells: Vector2d[] = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }

  handleMouseDownEvent = (event: MouseEvent | TouchEvent) => {
    if (!this.state.isMouseDragging) {
      this.rerenderOnEvent(event);
    }
    this.setState({ isMouseDragging: true, isPaused: true });
  };
  handleMouseUpEvent = (event: MouseEvent | TouchEvent) => {
    this.setState({ isMouseDragging: false, isPaused: false });
  };
  handleMouseMoveDownEvent = (event: MouseEvent | TouchEvent) => {
    if (this.state.isMouseDragging) {
      this.rerenderOnEvent(event);
    }
  };

  rerenderOnEvent(event: MouseEvent | TouchEvent) {
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    const elemOffset = this.getElementOffset();
    const offsetX = clientX - elemOffset.x;
    const offsetY = clientY - elemOffset.y;

    const x = Math.floor(offsetX / this.state.cell_size);
    const y = Math.floor(offsetY / this.state.cell_size);

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      if (this.state.isMouseDragging) {
        if (
          this.state.lastDraggedCell[0] !== x ||
          this.state.lastDraggedCell[1] !== y
        ) {
          this.board[y][x] = this.state.isDraggingFill;
          this.setState({
            lastDraggedCell: [x, y],
          });
        }
      } else {
        //this.addSubMatrixToBoard(glider_flower, { x: x, y: y });
        this.setState({
          isDraggingFill: !this.board[y][x],
        });
        this.board[y][x] = !this.board[y][x];
      }
    }

    this.setState({ cells: this.makeCells() });
  }

  runGame = () => {
    window.addEventListener("mousedown", this.handleMouseDownEvent);
    window.addEventListener("mouseup", this.handleMouseUpEvent);
    window.addEventListener("mousemove", this.handleMouseMoveDownEvent);

    window.addEventListener("touchstart", this.handleMouseDownEvent);
    window.addEventListener("touchend", this.handleMouseUpEvent);
    window.addEventListener("touchmove", this.handleMouseMoveDownEvent);
    if (this.mounted) {
      this.setState({ isRunning: true });
    }
    this.runIteration();
  };

  stopGame = () => {
    window.removeEventListener("mousedown", this.handleMouseDownEvent);
    window.removeEventListener("mouseup", this.handleMouseUpEvent);
    window.removeEventListener("mousemove", this.handleMouseMoveDownEvent);

    window.removeEventListener("touchstart", this.handleMouseDownEvent);
    window.removeEventListener("touchend", this.handleMouseUpEvent);
    window.removeEventListener("touchmove", this.handleMouseMoveDownEvent);
    this.setState({ isRunning: false });
    this.handleClear();
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runIteration() {
    if (!this.state.isPaused) {
      let newBoard = this.makeEmptyBoard();

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          let neighbors = this.calculateNeighbors(this.board, x, y);
          if (this.board[y][x]) {
            if (neighbors === 2 || neighbors === 3) {
              newBoard[y][x] = true;
            } else {
              newBoard[y][x] = false;
            }
          } else {
            if (!this.board[y][x] && neighbors === 3) {
              newBoard[y][x] = true;
            }
          }
        }
      }

      this.board = newBoard;
      if (this.mounted) {
        this.setState({ cells: this.makeCells() });
      }
    }

    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  calculateNeighbors(board: BoardMatrixType, x: number, y: number) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }
  handleRunGameChange = (isRunning: boolean) => {
    if (isRunning) {
      this.runGame();
    } else {
      this.stopGame();
    }
  };
  handleIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ interval: +event.target.value });
  };

  handleClear = () => {
    this.board = this.makeEmptyBoard();
    this.setState({ cells: this.makeCells() });
  };

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = Math.random() >= 0.5;
      }
    }

    this.setState({ cells: this.makeCells() });
  };

  handleResize = (new_width: number, new_height: number) => {
    this.rows = new_height / this.state.cell_size;
    this.cols = new_width / this.state.cell_size;
    this.board = this.makeEmptyBoard(this.board);
    this.setState({
      cells: this.makeCells(),
      height_pixels: new_height,
      width_pixels: new_width,
    });
  };
  componentDidUpdate(
    prevProps: Readonly<BoardPropsType>,
    prevState: Readonly<BoardStateType>,
    snapshot?: any
  ): void {
    if (this.props !== prevProps) {
      const new_width = this.props.width_cells * this.props.cell_size;
      const new_height = this.props.height_cells * this.props.cell_size;
      this.handleResize(new_width, new_height);
    }
  }
  componentDidMount() {
    this.mounted = true;
    //window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    this.mounted = false;
    //window.removeEventListener("resize", this.handleResize);
  }

  componentWillReceiveProps(nextProps: BoardPropsType) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.isRunning !== this.state.isRunning) {
      this.handleRunGameChange(nextProps.isRunning || false);
    }
  }

  render() {
    const { cells } = this.state;
    return (
      <div className="GameContainer">
        <div
          key="Board"
          className="Board"
          style={{
            width: this.state.width_pixels,
            height: this.state.height_pixels,
          }}
          ref={(n) => {
            this.boardRef = n;
          }}
        >
          {cells.map((cell) => (
            <Cell
              key={`${cell.x},${cell.y}`}
              cell_size={this.state.cell_size}
              x={cell.x}
              y={cell.y}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameOfLife;

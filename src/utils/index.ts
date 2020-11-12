import { CellValue, CellState, CellType } from '../types/index';
import { MAX_ROWS, MAX_COLUMNS, NO_OF_BOMBS } from '../constants/index';

export const generateCells = (): CellType[][] => {

    let cells: CellType[][] = [];

    for (let row = 0; row < MAX_ROWS; row++) {
        cells.push([]);
        for (let col = 0; col < MAX_COLUMNS; col++) {
            cells[row].push({
                value: CellValue.none,
                state: CellState.open
            })
        }
    }

    // randomly put 10 bombs

    let bombsPlaced = 0;
    while (bombsPlaced < NO_OF_BOMBS) {
        const randomRow = Math.floor(Math.random() * MAX_ROWS);
        const randomCol = Math.floor(Math.random() * MAX_COLUMNS);

        // 같은 자리에 폭탄이 두번이상 오면 안되니까 
        const currenCell = cells[randomRow][randomCol];

        if (currenCell.value !== CellValue.bomb) {
            cells = cells.map((row, rowIndex) => row.map((cell, colIndex) => {
                if (randomRow === rowIndex && randomCol === colIndex) {
                    return {
                        ...cell,
                        value: CellValue.bomb,

                    }
                }
                return cell;
            }));
            bombsPlaced++;
        }
    }


    // calculate the numbers for each cell 
    // 주위 폭탄 숫자 셈
    for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
        for (let colIndex = 0; colIndex < MAX_COLUMNS; colIndex++) {
            const currentCell = cells[rowIndex][colIndex];
            // 만약 현재 cell(칸)의 value(값)이 폭탄일 경우에 숫자를 세지 않고 넘기겟다.
            if (currentCell.value === CellValue.bomb) {
                continue;
            }

            let numberOfBombs = 0;
            const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
            const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
            const topRightBomb = rowIndex > 0 && colIndex < MAX_COLUMNS - 1 ? cells[rowIndex - 1][colIndex + 1] : null;
            const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
            const rightBomb = colIndex < MAX_COLUMNS - 1 ? cells[rowIndex][colIndex + 1] : null;
            const bottomLeftBomb = rowIndex < MAX_ROWS - 1 && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null;
            const bottomBomb = rowIndex < MAX_ROWS - 1 ? cells[rowIndex + 1][colIndex] : null;
            const bottomRightBomb = rowIndex < MAX_ROWS - 1 && colIndex < MAX_COLUMNS - 1 ? cells[rowIndex + 1][colIndex + 1] : null;

            if (topLeftBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (topBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (topRightBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (leftBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (rightBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (bottomLeftBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (bottomBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }
            if (bottomRightBomb?.value === CellValue.bomb) {
                numberOfBombs++;
            }

            if (numberOfBombs > 0) {
                cells[rowIndex][colIndex] = {
                    ...currentCell,
                    value: numberOfBombs,
                }
            }

        }
    }

    return cells;
};


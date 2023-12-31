import { useEffect, useState } from "react";
import {
  emptyBoard,
  getIndicesFromSquareNotation,
  updateValueIn2D,
} from "../chess/utils";
import { Flex } from "@radix-ui/themes";
import Cell from "../ui/atoms/Cell";
import { initialPos } from "../chess/pieces";

const Chessboard = ({ flip }) => {
  const [board, setBoard] = useState(emptyBoard);

  const setPieceAt = ({ square, piece, posArray }) => {
    const [i, j] = square ? getIndicesFromSquareNotation(square) : posArray;
    setBoard((existingBoard) => {
      const updatedBoard = updateValueIn2D(existingBoard, i, j, {
        ...existingBoard[i][j],
        piece,
      });
      return updatedBoard;
    });
  };

  useEffect(() => {
    initialPos.forEach((row, i) => {
      row.forEach((element, j) => {
        const piece = initialPos[i][j];
        setPieceAt({ posArray: [i, j], piece });
      });
    });
  }, []);

  return (
    <Flex
      direction={flip ? "column" : "column-reverse"}
      style={{ borderRadius: "3px", overflow: "hidden" }}
    >
      {board.map((rowItem, i) => (
        <Flex direction={flip ? "row-reverse" : "row"}>
          {rowItem.map((ele, j) => {
            const displayRankIndex = flip ? board.length - 1 : 0;
            const displayFileIndex = flip ? rowItem.length - 1 : 0;
            return (
              <Cell
                key={ele.square}
                {...ele}
                showRank={displayFileIndex === j}
                showFile={displayRankIndex === i}
              />
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};
export default Chessboard;

import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // uuid의 버전1 v1 import

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(),
            title, // title:title과 동일
            description, // description: description과 동일
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }
    
}

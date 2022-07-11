import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // uuid의 버전1 v1 import
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description} = createBoardDto;

        const board: Board = {
            id: uuid(),
            title, // title:title과 동일
            description, // description: description과 동일
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board;
    }

    getBoardById(id: string): Board { 
        const found = this.boards.find((board) => board.id === id);
        if (!found) {
            throw new NotFoundException(`cant't not find Board with id ${id}`);
        }
        return found;

    }
    
    deleteBoard(id: string): void { // return값 없음
        const found = this.getBoardById(id); // board id 값 없을 시 getboardbyid의 error
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board
    }

}

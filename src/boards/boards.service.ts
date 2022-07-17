import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository
    ) {}


    createBoard(createBoardDto: CreateBoardDto): Promise <Board> {
        return this.boardRepository.createBoard(createBoardDto)
    }


    async getBoardByID(id: number): Promise <Board> {
        const found = await this.boardRepository.findOneBy({id});

        if(!found) {
            throw new NotFoundException(`Can't fomd Board with id ${id}`);
        }
        return found;
    } 
    

    async deleteBoard(id: number): Promise <void> {
        const result = await this.boardRepository.delete(id);
        
        if(result.affected == 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }


    async updateBoardStatus(id: number, status: BoardStatus): Promise <Board> {
        const board = await this.getBoardByID(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;

    }

}

import { Body, Controller, Get, Post, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise <Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }


    @Get('/:id')
    async getBoardById(@Param('id') id:number): Promise<Board> {
        return this.boardsService.getBoardByID(id);
    }   


    @Delete('/:id')
    async deleteBoard(@Param('id', ParseIntPipe) id): Promise <void> {
        return this.boardsService.deleteBoard(id);
    }

    @Put('/:id/status')
    async updateBoardStatus(
        @Param('id', ParseIntPipe) id,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise <Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    @Get()
    async getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

}

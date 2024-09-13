import {Controller, Get} from '@nestjs/common';
import {BianceService} from "./biance.service";

@Controller('api/biance')
export class BianceController {
    constructor(private readonly bianceService:BianceService) {
    }

    @Get('test')
    async test(){
        await this.bianceService.getFuturesData()
        return "ok"

    }
}

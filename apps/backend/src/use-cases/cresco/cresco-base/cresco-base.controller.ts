import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import * as fs from "node:fs"
import {
    CrescoParseReportXlsxService
} from "../../../services/cresco-parse-report-xlsx/cresco-parse-report-xlsx.service";

@Controller('api/cresco/admin/upload-deposits-table')
export class CrescoBaseController {
    constructor(private readonly crescoParseReportXlsxService:CrescoParseReportXlsxService) {
    }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        if (!fs.existsSync('public')) fs.mkdirSync('public');
        fs.writeFileSync('public/deposits.xlsx',file.buffer);
        await this.crescoParseReportXlsxService.parseXlsxBuffer(file.buffer);
        return "public/deposits.xlsx"
    }
}

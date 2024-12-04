import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DriveConfigurationService } from './drive-config';
import { JsonMessageParserService } from '../json-parser/json-parser.service';

@Injectable()
export class StorageFileHandlerService {
  private driveManager;
  private storageType: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly driveConfigService: DriveConfigurationService,
    private readonly jsonMessageParserService: JsonMessageParserService
  ) {
    this.driveManager = this.driveConfigService.getDriveManager();
    this.storageType = this.configService.get<string>('FILESYSTEM_DISK');
  }

  public async getFile(fileName: string): Promise<any> {
    const drive = this.driveManager.disk(this.storageType);
    const fileContent = await drive.get(fileName);
    return this.jsonMessageParserService.robustParseMessageContent(fileContent.raw.toString());
  }
}

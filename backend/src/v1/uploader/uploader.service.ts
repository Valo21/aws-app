import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as process from 'process';

@Injectable()
export class UploaderService {
  private s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
  });

  private generateFileName(originalName: string): string {
    const extension: string = originalName.match(/\.([^.]+)$/)[1];
    return 'IMG-'.concat(Date.now().toString(), '.', extension);
  }

  public async uploadProfileImage(
    username: string,
    fileName: string,
    buffer: Buffer,
  ): Promise<string> {
    const name: string = this.generateFileName(fileName);
    const path: string = `profile-images/${username}/${name}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_NAME,
        Key: path,
        Body: buffer,
      }),
    );

    return process.env.AWS_S3_URL.concat(path);
  }

  public async uploadImage(fileName: string, buffer: Buffer): Promise<string> {
    const name: string = this.generateFileName(fileName);
    const path: string = `images/${name}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_NAME,
        Key: path,
        Body: buffer,
      }),
    );

    return process.env.AWS_S3_URL.concat(path);
  }
}

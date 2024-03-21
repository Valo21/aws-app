import { PartialType } from '@nestjs/mapped-types';
import { CreateProfilePhotoDto } from './create-profile-photo.dto';

export class UpdateProfilePhotoDto extends PartialType(CreateProfilePhotoDto) {}

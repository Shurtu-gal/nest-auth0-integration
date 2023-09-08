import { PartialType } from "@nestjs/mapped-types";
import { CreateCatDto } from "./create-cat.dto";

export class UpdateCatDto extends PartialType(CreateCatDto) {
  constructor(partial: Partial<CreateCatDto>) {
    super();
    Object.assign(this, partial);
  }
}
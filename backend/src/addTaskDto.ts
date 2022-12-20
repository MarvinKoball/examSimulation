import {
  JsonObject,
  JsonProperty,
  JsonConvert,
  OperationMode,
  ValueCheckingMode,
  PropertyConvertingMode,
} from "json2typescript";
import { task } from "../../types/index";

@JsonObject("TaskToAdd")
export class addTaskDto {
  @JsonProperty("Objectkey", String, PropertyConvertingMode.MAP_NULLABLE)
  Objectkey: string = "";

  @JsonProperty("subject", String, PropertyConvertingMode.MAP_NULLABLE)
  subject: string = "";
}

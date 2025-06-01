import { UserDto } from "@/features/user/types/user.dto";
import { AuditServiceEnum } from "./AuditServiceEnum";

export enum HttpMethod {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface AuditDTO {
  id: string;
  timestamp: Date;
  name: string;
  service: AuditServiceEnum;
  httpMethod: HttpMethod;
  requestUrl: string;
  oldValue: string | null;
  newValue: string | null;
  user: UserDto;
}
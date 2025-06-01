import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { AuditDTO } from "../types/AuditDTO";
import { AuditServiceEnum } from "../types/AuditServiceEnum";
import { request } from "@/lib/request";

export const getAuditsHOF = 
(auditService: AuditServiceEnum) => 
  (query : APIQuery): Promise<Page<AuditDTO>> => 
    request({
      url: '/audits/' + auditService,
      method: 'GET',
      params: query
    });
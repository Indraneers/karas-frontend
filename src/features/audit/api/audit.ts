import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { AuditDTO } from "../types/AuditDTO";
import { AuditServiceEnum } from "../types/AuditServiceEnum";
import { request } from "@/lib/request";

export const getAuditById = (auditId: string): Promise<AuditDTO> => 
  request({
    url: '/audits/' + auditId,
    method: 'GET'
  });

export const getAuditsHOF = 
(auditService: AuditServiceEnum) => 
  (query : APIQuery): Promise<Page<AuditDTO>> => 
    request({
      url: '/audits/audit-service/' + auditService,
      method: 'GET',
      params: query
    });
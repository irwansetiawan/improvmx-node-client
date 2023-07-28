export interface ImprovMXGetDomainsResponse {
    success: boolean;

    // success fields
    domains: ImprovMXDomainResponse[];
    limit: number;
    page: number;
    total: number;

    // error fields
    code: number;
    error: string;
}

export interface ImprovMXGetDomainResponse {
    success: boolean;

    // success fields
    domain: ImprovMXDomainResponse;

    // error fields
    code: number;
    error: string;
}

export interface ImprovMXGetDomainAliasesResponse {
    success: boolean;

    // success fields
    aliases: ImprovMXAliasResponse[];
    limit: number;
    page: number;
    total: number;

    // error fields
    code: number;
    error: string;
}

export interface ImprovMXGetDomainAliasResponse {
    success: boolean;

    // success fields
    alias: ImprovMXAliasResponse;

    // error fields
    code: number;
    error: string;
}

export interface ImprovMXDomainResponse {
    active: boolean;
    added: number;
    aliases: ImprovMXAliasResponse[];
    banned: boolean;
    display: string;
    dkim_selector: string;
    domain: string;
    notification_email: string | null;
    webhook: string | null;
    whitelabel: string | null;
}

export interface ImprovMXAliasResponse {
    alias: string;
    forward: string;
    id: number;
}

export interface ImprovMXGetDomainLogsResponse {
    success: boolean;

    // success fields
    logs: ImprovMXLogResponse[];

    // error fields
    code: number;
    error: string;
}

export interface ImprovMXLogResponse {
    created: number;
    created_raw: number;
    events: ImprovMXLogEventResponse[];
    forward: ImprovMXLogEventRecipientResponse;
    hostname: string;
    id: string;
    messageId: string;
    recipient: ImprovMXLogEventRecipientResponse;
    saved: boolean;
    sender: ImprovMXLogEventRecipientResponse;
    subject: string;
    transport: string;
    url: string;
}

export interface ImprovMXLogEventResponse {
    code: number;
    created: number;
    id: string;
    local: string;
    message: string;
    recipient: ImprovMXLogEventRecipientResponse,
    server: string;
    status: 'QUEUED' | 'REFUSED' | 'DELIVERED' | 'SOFT-BOUNCE' | 'HARD-BOUNCE'
}

export interface ImprovMXLogEventRecipientResponse {
    email: string;
    name: null;
}

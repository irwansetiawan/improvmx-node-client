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

import { ImprovMXDomain } from './models';

export interface ImprovMXDomainsResponse {
    success: boolean;

    // success fields
    domains: ImprovMXDomain[];
    limit: number;
    page: number;
    total: number;

    // error fields
    code: number;
    error: string;
}

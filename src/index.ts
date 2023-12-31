import { ImprovMXConfig } from './improvmxconfig';
import * as https from 'https';
import {
    ImprovMXAliasResponse,
    ImprovMXDomainResponse,
    ImprovMXGetDomainAliasResponse,
    ImprovMXGetDomainAliasesResponse,
    ImprovMXGetDomainLogsResponse,
    ImprovMXGetDomainResponse,
    ImprovMXGetDomainsResponse,
    ImprovMXLogResponse,
} from './responses';

export class ImprovMX {
    readonly baseUrlHost = 'api.improvmx.com';
    readonly baseUrlPathPrefix = '/v3';

    config: ImprovMXConfig;

    constructor(config: ImprovMXConfig) {
        this.config = config;
    }

    getAccount() {
        return this.get('/account/');
    }
    getAccountWhitelabels() {
        return this.get('/account/whitelabels/');
    }

    async getDomains(): Promise<ImprovMXDomainResponse[]> {
        let res: ImprovMXGetDomainsResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/'));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.domains) {
            return res.domains;
        } else {
            throw Error(res?.error);
        }
    }
    addDomain(domain: string) {
        return this.post('/domains/', { domain });
    }
    async getDomain(domain: string): Promise<ImprovMXDomainResponse> {
        let res: ImprovMXGetDomainResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/' + encodeURI(domain)));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.domain) {
            return res.domain;
        } else {
            throw Error(res?.error);
        }
    }
    updateDomain() {
        throw Error('Not implemented yet');
    }
    deleteDomain() {
        throw Error('Not implemented yet');
    }
    isDomainMXEntriesValid(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/check');
    }

    async getAliasesForDomain(domain: string): Promise<ImprovMXAliasResponse[]> {
        let res: ImprovMXGetDomainAliasesResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/' + encodeURI(domain) + '/aliases/'));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.aliases) {
            return res.aliases;
        } else {
            throw Error(res?.error);
        }
    }
    addAliasForDomain(domain: string, alias: string, forward: string) {
        return this.post('/domains/' + encodeURI(domain) + '/aliases/', { alias, forward });
    }
    addAliasesForDomain() {
        throw Error('Not implemented yet');
    }
    async getAliasForDomain(domain: string, alias: string): Promise<ImprovMXAliasResponse> {
        let res: ImprovMXGetDomainAliasResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/' + encodeURI(domain) + '/aliases/' + encodeURI(alias)));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.alias) {
            return res.alias;
        } else {
            throw Error(res?.error);
        }
    }
    updateAliasForDomain() {
        throw Error('Not implemented yet');
    }
    deleteAliasForDomain() {
        throw Error('Not implemented yet');
    }

    async getLogsForDomain(domain: string): Promise<ImprovMXLogResponse[]> {
        let res: ImprovMXGetDomainLogsResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/' + encodeURI(domain) + '/logs'));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.logs) {
            return res.logs;
        } else {
            throw Error(res?.error);
        }
    }
    async getLogsForAliasAndDomain(domain: string, alias: string): Promise<ImprovMXLogResponse[]> {let res: ImprovMXGetDomainLogsResponse | null = null;
        try {
            res = JSON.parse(await this.get('/domains/' + encodeURI(domain) + '/logs/' + encodeURI(alias)));
        } catch (e: any) {
            throw Error(e);
        }

        if (res?.success && res?.logs) {
            return res.logs;
        } else {
            throw Error(res?.error);
        }
    }

    getSMTPCredentials(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/credentials/');
    }
    addSMTPCredential() {
        throw Error('Not implemented yet');
    }
    updateSMTPCredential() {
        throw Error('Not implemented yet');
    }
    deleteSMTPCredential() {
        throw Error('Not implemented yet');
    }

    private post(path: string, data: any): Promise<string> {
        return this.request('POST', path, data);
    }

    private get(path: string): Promise<string> {
        return this.request('GET', path);
    }

    private request(method: 'GET' | 'POST', path: string, data?: any): Promise<string> {
        return new Promise((resolve, reject) => {
            let str = '';
            const req = https.request(
                {
                    headers: {
                        Authorization: 'Basic api:' + this.config.api_key,
                        ...(data && {
                            'Content-Type': 'application/json',
                        }),
                    },
                    method,
                    host: this.baseUrlHost,
                    path: this.baseUrlPathPrefix + path,
                },
                (res) => {
                    res.on('data', (chunk) => {
                        str += chunk;
                    });
                    res.on('end', () => {
                        resolve(str);
                    });
                },
            );
            if (method === 'POST' && data) {
                req.write(JSON.stringify(data));
            }
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    }
}

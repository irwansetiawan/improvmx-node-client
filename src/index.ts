import { ImprovMXConfig } from './improvmxconfig';
import * as https from 'https';
import { ImprovMXDomain } from './models';
import { ImprovMXDomainResponse, ImprovMXDomainsResponse } from './responses';

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

    async getDomains(): Promise<ImprovMXDomain[]> {
        let res: ImprovMXDomainsResponse | null = null;
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
    async getDomain(domain: string): Promise<ImprovMXDomain> {
        let res: ImprovMXDomainResponse | null = null;
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

    getAliasesForDomain(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/aliases/');
    }
    addAliasForDomain(domain: string, alias: string, forward: string) {
        return this.post('/domains/' + encodeURI(domain) + '/aliases/', { alias, forward });
    }
    addAliasesForDomain() {
        throw Error('Not implemented yet');
    }
    getAliasForDomain(domain: string, alias: string) {
        return this.get('/domains/' + encodeURI(domain) + '/aliases/' + encodeURI(alias));
    }
    updateAliasForDomain() {
        throw Error('Not implemented yet');
    }
    deleteAliasForDomain() {
        throw Error('Not implemented yet');
    }

    getLogsForDomain(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/logs');
    }
    getLogsForAliasAndDomain(domain: string, alias: string) {
        return this.get('/domains/' + encodeURI(domain) + '/logs/' + encodeURI(alias));
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

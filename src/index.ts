import { ImprovMXConfig } from './improvmxconfig';
import * as https from 'https';
import { ImprovMXDomain } from './models';
import { ImprovMXDomainsResponse } from './responses';

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
    getDomain(domain: string) {
        return this.get('/domains/' + encodeURI(domain));
    }
    updateDomain() {}
    deleteDomain() {}
    isDomainMXEntriesValid(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/check');
    }

    getAliasesForDomain(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/aliases/');
    }
    addAliasForDomain(domain: string, alias: string, forward: string) {
        return this.post('/domains/' + encodeURI(domain) + '/aliases/', { alias, forward });
    }
    addAliasesForDomain() {}
    getAliasForDomain(domain: string, alias: string) {
        return this.get('/domains/' + encodeURI(domain) + '/aliases/' + encodeURI(alias));
    }
    updateAliasForDomain() {}
    deleteAliasForDomain() {}

    getLogsForDomain(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/logs');
    }
    getLogsForAliasAndDomain(domain: string, alias: string) {
        return this.get('/domains/' + encodeURI(domain) + '/logs/' + encodeURI(alias));
    }

    getSMTPCredentials(domain: string) {
        return this.get('/domains/' + encodeURI(domain) + '/credentials/');
    }
    addSMTPCredential() {}
    updateSMTPCredential() {}
    deleteSMTPCredential() {}

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

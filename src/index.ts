import { ImprovMXConfig } from './improvmxconfig';
import * as https from 'https';

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

    getDomains() {
        return this.get('/domains/');
    }
    addDomain() {}
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
    addAliasForDomain() {}
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

    private get(path: string): Promise<string> {
        return this.request('GET', path);
    }

    private request(method: 'GET' | 'POST', path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let str = '';
            const req = https.request(
                {
                    headers: {
                        Authorization: 'Basic api:' + this.config.api_key,
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
            req.on('error', (err) => {
                reject(err);
            });
            req.end();
        });
    }
}

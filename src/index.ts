import { ImprovMXConfig } from './improvmxconfig';

export class ImprovMX {
    readonly baseUrl = 'https://api.improvmx.com/v3/';
    config: ImprovMXConfig;

    constructor(config: ImprovMXConfig) {
        this.config = config;
    }

    getAccount() {}
    getAccountWhitelabels() {}

    getDomains() {}
    addDomain() {}
    getDomain() {}
    updateDomain() {}
    deleteDomain() {}
    isDomainMXEntriesValid() {}

    getAliasesForDomain() {}
    addAliasForDomain() {}
    addAliasesForDomain() {}
    getAliasForDomain() {}
    updateAliasForDomain() {}
    deleteAliasForDomain() {}

    getLogsForDomain() {}
    getLogsForAliasAndDomain() {}

    getSMTPCredentials() {}
    addSMTPCredential() {}
    updateSMTPCredential() {}
    deleteSMTPCredential() {}
}

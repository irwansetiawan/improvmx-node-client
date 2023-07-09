export interface ImprovMXDomain {
    active: boolean;
    added: number;
    aliases: ImprovMXAlias[];
    banned: boolean;
    display: string;
    dkim_selector: string;
    domain: string;
    notification_email: string | null;
    webhook: string | null;
    whitelabel: string | null;
}

export interface ImprovMXAlias {
    alias: string;
    forward: string;
    id: number;
}

export interface Contract {
    contract: string;
    platform: string;
    type: string;
}

export interface Parent {
    id: string;
    name: string;
    symbol: string;
}

export interface Tag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

export interface Team {
    id: string;
    name: string;
    position: string;
}

export interface Links {
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
}

export interface Stats {
    subscribers: number;
    members?: number;
    followers?: number;
}

export interface LinksExtended {
    url: string;
    type: string;
    stats: Stats;
}

export interface Whitepaper {
    link?: any;
    thumbnail?: any;
}

export interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    contracts: Contract[];
    parent: Parent;
    tags: Tag[];
    team: Team[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: Date;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: Links;
    links_extended: LinksExtended[];
    whitepaper: Whitepaper;
    first_data_at: Date;
    last_data_at: Date;
}


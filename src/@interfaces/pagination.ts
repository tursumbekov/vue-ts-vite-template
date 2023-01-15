export interface Pagination {
    readonly count: number;
    readonly current_page: number;
    readonly links: {
        readonly next?: string;
        readonly previous?: string;
    };
    readonly per_page: number;
    readonly total: number;
    readonly total_pages: number;
}

export interface PageableInterface {
    pageIndex: number;
    pageSize: number;
    totalElements: number;
}


export const PageableInitializer: PageableInterface = {
    pageIndex: 0,
    pageSize: 10,
    totalElements: 0
}; 

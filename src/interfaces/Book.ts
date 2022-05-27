
export interface BookData {
    name: string;
    author: string;
    borrow_by?: string;
    issue_date: string;
    return_date: string;
    action: string;
}

export interface BookHeadCell {
    disablePadding: boolean;
    id: keyof BookData;
    label: string;
    numeric: boolean;
}
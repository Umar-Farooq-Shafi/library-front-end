
export interface StudentData {
    name: string;
    last_name: string;
    action: string;
}

export interface StudentHeadCell {
    disablePadding: boolean;
    id: keyof StudentData;
    label: string;
    numeric: boolean;
}

export const studentForm = {
    first_name: '',
    last_name: '',
}

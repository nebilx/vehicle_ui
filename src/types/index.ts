export interface dataType {
    _id: string;
    name: string;
    status: boolean;
    updatedAt: string;
}


export interface initType {
    Data: dataType[] | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: string;
    isMessage: string;
}

export interface payloadCreateType {
    name:string;
    status:boolean;
}

export interface payloadUpdateType {
    id:string;
    status:boolean;
}
export interface payloadMessageType {
    message: string;
    status: number;
}

export interface errorType {
    message: string;
    status: number;
}
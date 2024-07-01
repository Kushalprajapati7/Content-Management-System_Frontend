export interface IContent  {
    content: unknown;
    _id?:string;
    title: string;
    body: string;
    uploadedBy: any;
    uploadedAt: Date;
}
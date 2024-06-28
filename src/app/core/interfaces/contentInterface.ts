export interface IContent {
    _id: string;
    title: string;
    body: string;
    uploadedBy: any ;
    media: {
      filename: string;
      path: string;
      mimetype: string;
      size: number;
    };
    uploadedAt: Date;
    updatedAt: Date;
  }
  
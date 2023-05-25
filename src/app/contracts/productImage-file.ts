export class ProductImageFileVM {
  productImageId: string;
  fileName: string;
  storageType: string;
  filePath: string; 
  fileType: FileType
}
export enum FileType {
  ProductImage,
  UserImage,
  PDF,
  Excel,
  Word

}

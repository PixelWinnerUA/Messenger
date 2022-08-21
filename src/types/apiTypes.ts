export type ImageFile = null | File;

export interface ImageObject {
    id: number,
    url: string,
    publicId: string
}
export interface OtherUserType{
    userName: string,
    profileImage: null | ImageObject,
    name: string
}
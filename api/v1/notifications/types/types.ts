type NotificationType = {
    id?: number,
    UserId:number,
    title: string,
    message: string,
    read: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export { NotificationType }
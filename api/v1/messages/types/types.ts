type MessageType = {
    id?: number,
    subject: string,
    content: string,
    recipientId: number,
    senderId:number,
    read:boolean,
    createdAt?: Date,
    updatedAt?: Date

}

export { MessageType }
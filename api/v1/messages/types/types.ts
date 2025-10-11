type MessageType = {
    id?: number,
    subject: string,
    content: string,
    recipientId: number,
    senderId: number,
    read: boolean,
    fullName?: string
    phone?: string
    email?: string
    inquiryType?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export { MessageType }
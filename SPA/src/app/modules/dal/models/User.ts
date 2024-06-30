import ModelBase from './ModelBase'

export default class User extends ModelBase {
    fullname?: string
    email?: string
    password?: string
    roles?: string[]
    image?: string // Yeni özellik

    constructor(data: User) {
        super(data)
        this.fullname = data?.fullname
        this.email = data?.email
        this.password = data?.password
        this.roles = data?.roles
        this.image = data?.image // Yeni özellik
    }
}

export function generateRandomUserData(size: number = 1): User[] {
    const users: User[] = []
    for (let i = 0; i < size; i++) {
        const newUser = new User({
            id: (Math.random() + 1).toString(36).substring(7),
            fullname: `User ${i}`,
            email: `user${i}@example.com`,
            password: `password${i}`, // Not: Gerçek uygulamalarda şifreler hash'lenmelidir.
            roles: ['user'],
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            createdBy: 'system',
            updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
            updatedBy: 'system',
            deletedAt: null,
            deletedBy: null,
            image: `/media/avatars/300-${Math.floor(Math.random() * 30 + 1)}.jpg` // Yeni özellik
        })
        users.push(newUser)
    }
    return users
}

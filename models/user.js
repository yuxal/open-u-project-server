class User {
    constructor(id, email, nickname, password, isAdmin) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    toString() {
        return `User: { id: ${this.id}, nickname: ${this.nickname}, email: ${this.email} isAdmin: ${this.isAdmin}`;
    }
}

module.exports = User;
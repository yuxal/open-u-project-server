class User {
    constructor(id, email, nickname, password) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    toString() {
        return `User: { id: ${this.id}, nickname: ${this.nickname}, email: ${this.email} }`;
    }
}

module.exports = User;
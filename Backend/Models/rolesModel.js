class Role {
    constructor(roleName) {
        this.roleName = roleName;
    }

    static create(roleName) {
        if (!roleName || roleName.trim() === "") {
            throw new Error("El nombre del rol es requerido");
        }

        return new Role(roleName.trim());
    }
}

module.exports = Role;
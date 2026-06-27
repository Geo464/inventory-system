class Roles {
    constructor(roleName) {
        this.roleName = roleName;
    }

    static create(roleName) {
        if (!roleName) {
            throw new Error("El nombre del rol es requerido");
        }

        return new Role(roleName);
    }
}

export default Role;
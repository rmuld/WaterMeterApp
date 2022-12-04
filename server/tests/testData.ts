export const adminUser = {
    email: 'juhan@juurikas.ee',
    password: 'juurikas'
}

export const regularUser = {
    email: 'test@test.ee',
    password: 'mysuperpassword'
}

export const wrongUser = {
    email: 'wrong@wrong.ee',
    password: 'wrongpassword'
}

export const wrongPassword = {
    email: 'juhan@juurikas.ee',
    password: 'wrongpassword'
}

export const updateUserWithOutPassword = {
    firstName: "UpdateName",
    lastName: "NewSurname",
    userRoleID: 1,
    userAddressID: 1
};
  
export const updateUser = {
    firstName: "UpdateName",
    lastName: "NewSurname",
    password: "juurikas",
    userRoleID: 1,
    userAddressID: 1
  };

export const baseUrl = 'localhost:3000/';

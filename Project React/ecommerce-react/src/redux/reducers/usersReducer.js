const INITIAL_STATE = {
    id: null,
    username: "",
    email: "",
    password: "",
    role: "",
    cart: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REGISTER_USERS":
            console.log("data dari action:", action.payload);
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
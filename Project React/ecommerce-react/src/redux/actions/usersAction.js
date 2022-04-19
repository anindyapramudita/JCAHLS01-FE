export const loginAction = (data) => {
    console.log(`data dari UI:`, data)
    return {
        type: "REGISTER_USERS",
        payload: data
    }
}
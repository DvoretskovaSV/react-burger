export const checkResponse = (response) => {
    if (!response.ok) {
        throw new Error(response);
    }

    return response.json()
};
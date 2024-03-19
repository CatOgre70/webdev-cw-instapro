export function validateString(string) {
    return string.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

export function validateLoginName(loginName) {
    return loginName;
}

export function validateUserPassword(userPassword) {
    return userPassword;
}
export function processError(error) {
    if (error.code === "auth/invalid-credential") {
        return "Incorrect email or password."
    }
    var noCode = error.message.replace(/ *\([^)]*\) */g, "");
    return noCode.replace(/^Firebase: /, '');
}
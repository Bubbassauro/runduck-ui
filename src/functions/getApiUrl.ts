export function getApiUrl(path: string) {
    const public_url = document.getElementById("public_url") as HTMLInputElement;
    // console.log({'public_url': public_url.value})
    if (public_url && public_url.value) {
        return `${public_url.value}/${path}`
    }
    else {
        // Local Development
        return `http://localhost:3825/${path}`
    }
}
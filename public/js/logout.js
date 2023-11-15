console.log('Hola, Admin');
document.addEventListener("DOMContentLoaded",async function() {
    document.getElementById('logout').addEventListener("click", () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        console.log('aaaaa')
        document.location.href = "/";
    });
});

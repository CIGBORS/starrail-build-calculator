async function run() {
    try {
        const res = await fetch("http://localhost:3000/api/github/calculator/delete-build/1");
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Data:", data);
    } catch (e) {
        console.error(e);
    }
}
run();

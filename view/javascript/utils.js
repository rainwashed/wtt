function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function anime_p(s) {
    return new Promise(res => {
        s.complete = res;
        anime(s);
    });
}
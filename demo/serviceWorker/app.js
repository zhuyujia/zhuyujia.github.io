if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(reg => {
            if(reg.installing) {
                console.log('serviceWorker installing');
            } else if(reg.waiting) {
                console.log('serviceWorker installed');
            } else if(reg.active) {
                console.log('serviceWorker active');
            }
        }).catch(err => {
            console.log(`serviceWorker register fail: ${err}`);
        });
    });
}
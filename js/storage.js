// Storage utility module

class Storage {
    constructor() {
        // No initialization needed
    }

    getLocal(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setLocal(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeLocal(key) {
        localStorage.removeItem(key);
    }

    getSession(key) {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setSession(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    removeSession(key) {
        sessionStorage.removeItem(key);
    }
}

const storage = new Storage();

let state = {};
module.exports = {
    getState: () => state,
    userQuit: () => state['quit'] = true,
    forceQuit: () => state['quit'] === true
}
export function createEventHandler(eventType = 'keyup', target = document.body) {
    const subscribers = [];

    const handler = e => {
        // if(e.keyCode === 8 || eventType === 'click') { // Отключает реакцию на click
        if(e.keyCode === 8) {
            // e.stopPropagation();
            e.preventDefault();
            return false;
        }
        if(e.keyCode !== 8 && eventType !== 'click') {
            let stopPropagation = false;
            e.stopPropagation = () => {
                stopPropagation = true;
            };
            for (let i = 0; i < subscribers.length; i++) {
                if (stopPropagation) {
                    break;
                }
                subscribers[i](e);
            }
        }
    };

    const subscribe = f => {
        subscribers.push(f);
        return () => subscribers.splice(subscribers.indexOf(f), 1);
    };

    target.addEventListener(eventType, handler);

    return {
        subscribe,
        destroy: () => target.removeEventListener(eventType, handler)
    };
}

const keyUps = createEventHandler('keyup');

const keyDowns = createEventHandler('keydown');

const clicks = createEventHandler('click');

export {keyUps, keyDowns, clicks};

function prepareKeys() {
    // const BASIC_KEYS = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Enter', 'Back'];

    const USED_KEYS = [ 'ChannelUp', 'ChannelDown', 'MediaPlayPause', 'MediaRewind', 'MediaFastForward',
        'MediaPlay', 'MediaPause', 'MediaTrackPrevious', 'MediaTrackNext', 'MediaStop',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue', 'backspace' ];

    let keyCodes = {
        ArrowLeft: 37,
        ArrowUp: 38,
        ArrowRight: 39,
        ArrowDown: 40,
        Enter: 13,
        Back: 27,
        ChannelUp: 0x5b, // [
        ChannelDown: 0x5d, // ]
        MediaPlayPause: 32, // Space
        MediaRewind: 0x2d, // -
        MediaFastForward: 0x3d, // =
        MediaPlay: 0x70, // p
        MediaPause: 0x6f, // o
        MediaStop: 413,
        MediaTrackPrevious: 0x2c, // comma - ,
        MediaTrackNext: 0x2e, // dot - .
        0: 0x30,
        1: 0x31,
        2: 0x32,
        3: 0x33,
        4: 0x34,
        5: 0x35,
        6: 0x36,
        7: 0x37,
        8: 0x38,
        9: 0x39,
        ColorF0Red: 403,
        ColorF1Green: 404,
        ColorF2Yellow: 405,
        ColorF3Blue: 406,
        backspace: 8
    };

    if (window.tizen) {
        keyCodes.Back = 10009;
        let supportedKeys = window.tizen.tvinputdevice.getSupportedKeys();
        let supported = {};
        for (let i = 0; i < supportedKeys.length; i++) {
            supported[supportedKeys[i].name] = supportedKeys[i].code;
        }
        USED_KEYS.forEach(key => {
            if (supported.hasOwnProperty(key)) {
                window.tizen.tvinputdevice.registerKey(key);
                keyCodes[key] = supported[key];
            }
        });
    }

    return keyCodes;
}

export const KEYS = prepareKeys();

export default keyDowns;

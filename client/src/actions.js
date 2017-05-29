
export const INCREASE_COUNTER = 'INCREASE_COUNTER';

export function increaseCounter(counter) {
    return { type: INCREASE_COUNTER, counter }
}
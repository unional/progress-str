import t from 'assert';
import { progressBar } from '.';

test('progress bar is a function', () => {
    t.strictEqual(typeof progressBar, 'function');
});

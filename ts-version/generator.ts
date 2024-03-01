import {GENSYNC_EXPECTED_START, GENSYNC_EXPECTED_SUSPEND, GENSYNC_SUSPEND} from './constant';
import {makeError, throwError} from './utils';

export function assertSuspend(
    {value, done}: {
        value: symbol;
        done: string;
    },
    gen: Generator
) {
    if (!done && value === GENSYNC_SUSPEND) {
        return;
    }

    throwError(gen,
        makeError(done
            ? "Unexpected generator completion. If you get this, it is probably a gensync bug."
            : `Expected GENSYNC_SUSPEND, got ${JSON.stringify(
                value
            )}. If you get this, it is probably a gensync bug.`,
            GENSYNC_EXPECTED_SUSPEND
        )
    );
}

export function assertStart(value, gen) {
    if (value === GENSYNC_EXPECTED_SUSPEND) {
        throwError(gen, makeError(
            "Unexpected generator completion. If you get this, it is probably a gensync bug.",
            GENSYNC_EXPECTED_START
        ));
    }
}
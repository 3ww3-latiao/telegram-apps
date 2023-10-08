import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';

import { subscribe, unsubscribe } from '../../src/index.js';
import { createWindow, type WindowSpy } from '../../__test-utils__/createWindow.js';
import { dispatchWindowMessageEvent } from '../../__test-utils__/dispatchWindowMessageEvent.js';

let windowSpy: WindowSpy;

beforeEach(() => {
  windowSpy = createWindow();
});

afterEach(() => {
  windowSpy.mockRestore();
});

describe('events', () => {
  describe('unsubscribe.ts', () => {
    describe('unsubscribe', () => {
     it('should remove listener', () => {
        const listener = vi.fn();
        const emit = () => dispatchWindowMessageEvent('viewport_changed', {
          height: 123,
          width: 321,
          is_expanded: false,
          is_state_stable: false,
        });

        subscribe(listener);
        emit();
        expect(listener).toHaveBeenCalledTimes(1);

        unsubscribe(listener);
        emit();
        expect(listener).toHaveBeenCalledTimes(1);
      });
    });
  });
});
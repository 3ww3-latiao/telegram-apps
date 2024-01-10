import { afterEach, beforeEach, expect, it, vi } from 'vitest';

import { createWindow, type WindowSpy } from '../../../../test-utils/createWindow';
import { dispatchWindowMessageEvent } from '../../../../test-utils/dispatchWindowMessageEvent';
import { onTelegramEvent } from '../onTelegramEvent';

let windowSpy: WindowSpy;

beforeEach(() => {
  windowSpy = createWindow();
});

afterEach(() => {
  windowSpy.mockRestore();
});

it('should call passed callback with event type and data in case, window generated "message" event with data, presented as object with properties "eventType" (string) and "eventData" (unknown). Object is converted to string.', () => {
  const callback = vi.fn();
  onTelegramEvent(callback);

  dispatchWindowMessageEvent('qr_text_received', {});

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('qr_text_received', {});
});

it('should not define event handlers twice in case, window object contains "TelegramGameProxy_receiveEvent" property.', () => {
  (window as any).TelegramGameProxy_receiveEvent = true;

  onTelegramEvent(vi.fn());
  expect(window).not.toHaveProperty('Telegram');
});

it('should call passed callback with event type and data in case, external environment generated event.', () => {
  const callback = vi.fn();
  onTelegramEvent(callback);

  (window as any).TelegramGameProxy_receiveEvent('test', false);

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('test', false);
});

it('should ignore a message event with unexpected data', () => {
  const callback = vi.fn();
  onTelegramEvent(callback);

  window.dispatchEvent(new MessageEvent('message', { data: null }));

  expect(callback).toHaveBeenCalledTimes(0);
});

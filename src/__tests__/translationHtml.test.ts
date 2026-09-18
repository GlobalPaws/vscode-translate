import * as vm from 'vm';
import { getTranslationHtml } from '../views/translationHtml';

describe('translationHtml script runtime and interaction tests', () => {
  it('should generate valid HTML containing script tag', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'auto',
      defaultTarget: 'ja',
    });

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<script>');
    expect(html).toContain('</script>');
  });

  it('should execute webview script without runtime errors (no TDZ / ReferenceError)', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'auto',
      defaultTarget: 'ja',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    expect(scriptMatch).not.toBeNull();
    const script = scriptMatch![1];

    interface MockElement {
      id: string;
      style: Record<string, string>;
      classList: {
        add: (c: string) => void;
        remove: (c: string) => void;
        contains: (c: string) => boolean;
        toggle: (c: string) => void;
      };
      addEventListener: (event: string, fn: (e?: unknown) => void) => void;
      appendChild: jest.Mock;
      querySelector: jest.Mock;
      querySelectorAll: jest.Mock;
      setAttribute: jest.Mock;
      removeAttribute: jest.Mock;
      getAttribute: jest.Mock;
      focus: jest.Mock;
      onclick?: (e?: unknown) => void;
      [key: string]: unknown;
    }

    const elements: Record<string, MockElement> = {};
    const getEl = (id: string): MockElement => {
      if (!elements[id]) {
        const classes = new Set<string>();
        elements[id] = {
          id,
          style: {},
          classList: {
            add: (c: string) => classes.add(c),
            remove: (c: string) => classes.delete(c),
            contains: (c: string) => classes.has(c),
            toggle: (c: string) => {
              if (classes.has(c)) {
                classes.delete(c);
              } else {
                classes.add(c);
              }
            },
          },
          addEventListener: (event: string, fn: (e?: unknown) => void) => {
            elements[id]['on' + event] = fn;
          },
          appendChild: jest.fn(),
          querySelector: jest.fn().mockReturnValue(null),
          querySelectorAll: jest.fn().mockReturnValue([]),
          setAttribute: jest.fn(),
          removeAttribute: jest.fn(),
          getAttribute: jest.fn().mockReturnValue(null),
          focus: jest.fn(),
        };
      }
      return elements[id];
    };

    const windowEventListeners: Record<string, (e: unknown) => void> = {};
    const mockWindow = {
      addEventListener: jest.fn((event: string, fn: (e: unknown) => void) => {
        windowEventListeners[event] = fn;
      }),
      setTimeout,
      clearTimeout,
      Intl,
    };

    const mockDocument = {
      getElementById: getEl,
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: getEl,
      addEventListener: jest.fn(),
    };

    const postedMessages: unknown[] = [];
    const context = vm.createContext({
      acquireVsCodeApi: () => ({
        postMessage: (msg: unknown) => postedMessages.push(msg),
      }),
      window: mockWindow,
      document: mockDocument,
      Intl,
      setTimeout,
      clearTimeout,
      console,
    });

    expect(() => {
      vm.runInContext(script, context);
    }).not.toThrow();

    // Verify initial postMessage
    expect(postedMessages).toContainEqual({ command: 'getSettings' });

    // Verify top-bar does NOT contain duplicate btnOpenSettings button
    expect(html).not.toContain('id="btnOpenSettings"');

    // Verify provider toggle functionality
    const providerBtn = elements['providerCurrentBtn'];
    const providerMenu = elements['providerOptionsMenu'];
    expect(providerBtn).toBeDefined();
    expect(providerMenu).toBeDefined();
    expect(providerMenu.classList.contains('active')).toBe(false);

    expect(typeof providerBtn.onclick).toBe('function');
    providerBtn.onclick?.({ stopPropagation: () => {} });
    expect(providerMenu.classList.contains('active')).toBe(true);

    // Verify settings modal opens via VS Code openSettings message
    const settingsModal = elements['settingsModal'];
    expect(settingsModal).toBeDefined();
    expect(settingsModal.classList.contains('active')).toBe(false);

    expect(typeof windowEventListeners['message']).toBe('function');
    windowEventListeners['message']({ data: { command: 'openSettings' } });
    expect(settingsModal.classList.contains('active')).toBe(true);

    // Verify language picker button clicks open langPickerModal
    const sourceMoreBtn = elements['btnSourceMore'];
    const targetMoreBtn = elements['btnTargetMore'];
    const langPickerModal = elements['langPickerModal'];
    expect(sourceMoreBtn).toBeDefined();
    expect(targetMoreBtn).toBeDefined();
    expect(langPickerModal).toBeDefined();

    expect(typeof sourceMoreBtn.onclick).toBe('function');
    sourceMoreBtn.onclick?.();
    expect(langPickerModal.classList.contains('active')).toBe(true);
  });
});

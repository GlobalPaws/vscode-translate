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
          value: '',
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

    // Verify 500-char limit and placeholder for google-free
    const sourceTextEl = elements['sourceText'];
    const charCountEl = elements['charCount'];
    expect(sourceTextEl).toBeDefined();
    expect(charCountEl).toBeDefined();
    expect(sourceTextEl.maxLength).toBe(500);
    expect(sourceTextEl.placeholder).toContain('500');
    expect(charCountEl.textContent).toContain('500');
  });

  it('should maintain exactly 3 tabs, push out the last tab when a new language is selected, and persist state', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      defaultSource: 'auto',
      defaultTarget: 'vi',
      sourceTabs: ['en', 'ja', 'vi'],
      targetTabs: ['vi', 'en', 'ja'],
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    expect(scriptMatch).not.toBeNull();
    const script = scriptMatch![1];

    interface MockElement {
      id: string;
      value: string;
      style: Record<string, string>;
      innerHTML?: string;
      textContent?: string;
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
      parentElement?: MockElement | null;
      [key: string]: unknown;
    }

    const elements: Record<string, MockElement> = {};
    const getEl = (id: string): MockElement => {
      if (!elements[id]) {
        const classes = new Set<string>();
        elements[id] = {
          id,
          value: '',
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

    const postedMessages: unknown[] = [];
    let savedWebviewState: unknown = null;

    const mockWindow = {
      addEventListener: jest.fn(),
      setTimeout: (fn: () => void) => {
        fn();
        return 1;
      },
      clearTimeout: jest.fn(),
      Intl,
    };

    const mockDocument = {
      getElementById: getEl,
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: getEl,
      addEventListener: jest.fn(),
    };

    const context = vm.createContext({
      acquireVsCodeApi: () => ({
        postMessage: (msg: unknown) => postedMessages.push(msg),
        getState: () => savedWebviewState,
        setState: (st: unknown) => {
          savedWebviewState = st;
        },
      }),
      window: mockWindow,
      document: mockDocument,
      Intl,
      setTimeout: (fn: () => void) => {
        fn();
        return 1;
      },
      clearTimeout: jest.fn(),
      console,
    });

    vm.runInContext(script, context);

    // Initial render should populate tabs
    const targetTabsContainer = elements['targetTabsContainer'];
    expect(targetTabsContainer.innerHTML).toContain('data-target="vi"');
    expect(targetTabsContainer.innerHTML).toContain('data-target="en"');
    expect(targetTabsContainer.innerHTML).toContain('data-target="ja"');

    // Simulate selectPickerLanguage('fr') on target
    vm.runInContext(
      `
      activePickerType = 'target';
      selectPickerLanguage('fr');
    `,
      context
    );

    // 'fr' should now be at the front, and 'ja' pushed out (maintaining 3 tabs: fr, vi, en)
    expect(targetTabsContainer.innerHTML).toContain('data-target="fr"');
    expect(targetTabsContainer.innerHTML).toContain('data-target="vi"');
    expect(targetTabsContainer.innerHTML).toContain('data-target="en"');
    expect(targetTabsContainer.innerHTML).not.toContain('data-target="ja"');

    // State should be persisted to vscode.setState and posted to extension
    expect(savedWebviewState).toMatchObject({
      targetLang: 'fr',
      targetTabs: ['fr', 'vi', 'en'],
    });

    const updateMsg = postedMessages.find(
      (m: unknown) =>
        typeof m === 'object' &&
        m !== null &&
        (m as Record<string, unknown>).command === 'updateLanguageState'
    );
    expect(updateMsg).toBeDefined();
    expect(updateMsg).toMatchObject({
      command: 'updateLanguageState',
      targetLang: 'fr',
      targetTabs: ['fr', 'vi', 'en'],
    });

    // Selecting existing tab 'vi' moves it to front without duplicating
    vm.runInContext(
      `
      activePickerType = 'target';
      selectPickerLanguage('vi');
    `,
      context
    );

    expect(savedWebviewState).toMatchObject({
      targetLang: 'vi',
      targetTabs: ['vi', 'fr', 'en'],
    });
  });

  it('should prevent race conditions by discarding outdated requestId and mismatched targetLang responses', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      defaultSource: 'auto',
      defaultTarget: 'vi',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    expect(scriptMatch).not.toBeNull();
    const script = scriptMatch![1];

    interface MockElement {
      id: string;
      value: string;
      style: Record<string, string>;
      innerHTML?: string;
      textContent?: string;
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
      [key: string]: unknown;
    }

    const elements: Record<string, MockElement> = {};
    const getEl = (id: string): MockElement => {
      if (!elements[id]) {
        const classes = new Set<string>();
        elements[id] = {
          id,
          value: '',
          style: {},
          textContent: '',
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
    const postedMessages: unknown[] = [];

    const mockWindow = {
      addEventListener: jest.fn((event: string, fn: (e: unknown) => void) => {
        windowEventListeners[event] = fn;
      }),
      setTimeout: (fn: () => void) => {
        fn();
        return 1;
      },
      clearTimeout: jest.fn(),
      Intl,
    };

    const mockDocument = {
      getElementById: getEl,
      querySelectorAll: () => [],
      querySelector: () => null,
      createElement: getEl,
      addEventListener: jest.fn(),
    };

    const context = vm.createContext({
      acquireVsCodeApi: () => ({
        postMessage: (msg: unknown) => postedMessages.push(msg),
        getState: () => ({}),
        setState: jest.fn(),
      }),
      window: mockWindow,
      document: mockDocument,
      Intl,
      setTimeout: (fn: () => void) => {
        fn();
        return 1;
      },
      clearTimeout: jest.fn(),
      console,
    });

    vm.runInContext(script, context);

    const messageHandler = windowEventListeners['message'];
    expect(typeof messageHandler).toBe('function');

    const targetTextEl = elements['targetText'];

    // Trigger translation with text
    elements['sourceText'].value = 'Hello world';
    vm.runInContext(`triggerTranslation(true);`, context);

    const firstTranslateMsg = postedMessages[postedMessages.length - 1] as Record<string, unknown>;
    expect(firstTranslateMsg.command).toBe('translate');
    expect(firstTranslateMsg.requestId).toBe(1);
    expect(firstTranslateMsg.targetLang).toBe('vi');

    // Trigger a second translation
    vm.runInContext(`triggerTranslation(true);`, context);
    const secondTranslateMsg = postedMessages[postedMessages.length - 1] as Record<string, unknown>;
    expect(secondTranslateMsg.requestId).toBe(2);

    // Simulate an outdated response for requestId: 1 arriving late
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: 1,
        targetLang: 'vi',
        text: 'Outdated translation (requestId 1)',
      },
    });

    // The outdated response should be DISCARDED
    expect(targetTextEl.textContent).not.toBe('Outdated translation (requestId 1)');

    // Simulate a mismatched targetLang response arriving
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: 2,
        targetLang: 'ja', // Mismatched target language (current is 'vi')
        text: 'Mismatched target language translation',
      },
    });

    // The mismatched target response should be DISCARDED
    expect(targetTextEl.textContent).not.toBe('Mismatched target language translation');

    // Simulate the correct response arriving (requestId: 2, targetLang: 'vi')
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: 2,
        targetLang: 'vi',
        text: 'Xin chào thế giới',
      },
    });

    // The correct response should be accepted
    expect(targetTextEl.textContent).toBe('Xin chào thế giới');
  });
});

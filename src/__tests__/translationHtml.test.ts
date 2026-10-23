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

  const createTestContext = (
    options: {
      initialState?: Record<string, unknown>;
      onPostMessage?: (msg: unknown) => void;
    } = {}
  ) => {
    interface MockElement {
      id: string;
      value: string;
      style: Record<string, string>;
      textContent: string;
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
        postMessage: (msg: unknown) => {
          postedMessages.push(msg);
          options.onPostMessage?.(msg);
        },
        getState: () => options.initialState || {},
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

    return { context, elements, getEl, windowEventListeners, postedMessages };
  };

  it('should prevent same-language conflict when swapping from auto to en', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      defaultSource: 'auto',
      defaultTarget: 'en',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl } = createTestContext({
      initialState: { sourceLang: 'auto', targetLang: 'en' },
    });

    vm.runInContext(script, context);

    // Call btnSwap click handler
    const btnSwap = getEl('btnSwap');
    const swapClickHandler = btnSwap.onclick as (() => void) | undefined;
    expect(typeof swapClickHandler).toBe('function');
    swapClickHandler?.();

    const sourceLang = vm.runInContext('currentSourceLang', context);
    const targetLang = vm.runInContext('currentTargetLang', context);

    // After swapping auto -> en, source should be en, and target should NOT be en (should be ja fallback)
    expect(sourceLang).toBe('en');
    expect(targetLang).not.toBe('en');
    expect(targetLang).toBe('ja');
  });

  it('should automatically resolve same-language collision when user selects the same language', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      defaultSource: 'ja',
      defaultTarget: 'en',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context } = createTestContext({
      initialState: { sourceLang: 'ja', targetLang: 'en' },
    });

    vm.runInContext(script, context);

    // If source is changed to 'en' (which matches target 'en'), target should automatically swap to 'ja'
    vm.runInContext(`setSourceLanguage('en');`, context);

    expect(vm.runInContext('currentSourceLang', context)).toBe('en');
    expect(vm.runInContext('currentTargetLang', context)).toBe('ja');

    // If target is changed to 'en' (which matches source 'en'), source should automatically swap to 'ja'
    vm.runInContext(`setTargetLanguage('en');`, context);

    expect(vm.runInContext('currentTargetLang', context)).toBe('en');
    expect(vm.runInContext('currentSourceLang', context)).toBe('ja');
  });

  it('should discard translation results if input text was cleared before response arrived', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      defaultSource: 'auto',
      defaultTarget: 'ja',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, windowEventListeners } = createTestContext({
      initialState: { sourceLang: 'auto', targetLang: 'ja' },
    });

    vm.runInContext(script, context);

    const sourceEl = getEl('sourceText');
    const targetEl = getEl('targetText');
    targetEl.textContent = 'Initial Placeholder';
    sourceEl.value = 'Hello';

    // Trigger translation
    vm.runInContext('triggerTranslation(true);', context);

    // User clears the sourceText before the response arrives
    sourceEl.value = '';

    // Now response arrives
    const messageHandler = windowEventListeners['message'];
    expect(typeof messageHandler).toBe('function');
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: 1,
        targetLang: 'ja',
        text: 'こんにちは',
      },
    });

    // Since input is empty, the result must be discarded and placeholder retained
    expect(targetEl.textContent).toBe('Translation will appear here in real-time...');
    expect(targetEl.classList.contains('placeholder')).toBe(true);
  });

  it('should show green checkmarks on provider options when API keys are configured', () => {
    const html = getTranslationHtml({
      currentProvider: 'deepl',
      panelLanguage: 'en',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, windowEventListeners } = createTestContext();
    vm.runInContext(script, context);

    const optCheckDeepl = getEl('optCheckDeepl');
    const optCheckGemini = getEl('optCheckGemini');
    const providerCurrentCheck = getEl('providerCurrentCheck');

    expect(optCheckDeepl.classList.contains('configured')).toBe(false);

    // Simulate receiving settingsState with DeepL configured
    const messageHandler = windowEventListeners['message'];
    messageHandler({
      data: {
        command: 'settingsState',
        hasDeepl: true,
        hasGemini: false,
        provider: 'deepl',
      },
    });

    expect(optCheckDeepl.classList.contains('configured')).toBe(true);
    expect(optCheckGemini.classList.contains('configured')).toBe(false);
    expect(providerCurrentCheck.classList.contains('configured')).toBe(true);
  });

  it('should display pronunciation transliteration when available in translation result', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'en',
      defaultTarget: 'ja',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, windowEventListeners } = createTestContext({
      initialState: { sourceLang: 'en', targetLang: 'ja' },
    });

    vm.runInContext(script, context);

    const sourceEl = getEl('sourceText');
    const targetEl = getEl('targetText');
    const sourcePhonetic = getEl('sourcePhonetic');
    const targetPhonetic = getEl('targetPhonetic');

    sourceEl.value = 'sightseeing';
    vm.runInContext('triggerTranslation(true);', context);

    const messageHandler = windowEventListeners['message'];
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: 1,
        targetLang: 'ja',
        text: '観光',
        sourceTransliteration: 'ˈsītˌsēiNG',
        targetTransliteration: 'Kankō',
      },
    });

    expect(targetEl.textContent).toBe('観光');
    expect(targetPhonetic.textContent).toBe('Kankō');
    expect(targetPhonetic.style.display).toBe('block');
    expect(sourcePhonetic.textContent).toBe('ˈsītˌsēiNG');
    expect(sourcePhonetic.style.display).toBe('block');
  });

  it('should adjust zoom level and persist when zoom buttons are clicked', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'en',
      zoomLevel: 100,
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, postedMessages } = createTestContext({
      initialState: { zoomLevel: 100 },
    });

    vm.runInContext(script, context);

    const btnZoomOut = getEl('btnZoomOut');
    const btnZoomIn = getEl('btnZoomIn');
    const txtZoomValue = getEl('txtZoomValue');

    const zoomOutHandler = btnZoomOut.onclick as (() => void) | undefined;
    expect(typeof zoomOutHandler).toBe('function');

    // Click Zoom Out twice (100 -> 95 -> 90)
    zoomOutHandler?.();
    expect(txtZoomValue.textContent).toBe('95%');

    zoomOutHandler?.();
    expect(txtZoomValue.textContent).toBe('90%');

    const lastMsg = postedMessages[postedMessages.length - 1] as Record<string, unknown>;
    expect(lastMsg).toMatchObject({ command: 'saveZoom', value: 90 });

    // Click Zoom In (90 -> 95)
    const zoomInHandler = btnZoomIn.onclick as (() => void) | undefined;
    zoomInHandler?.();
    expect(txtZoomValue.textContent).toBe('95%');
  });

  it('should display Google Translate style source language suggestion when detected language differs from selected tab, and switch tab when clicked', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'en',
      defaultTarget: 'vi',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, postedMessages, windowEventListeners } = createTestContext({
      initialState: { sourceLang: 'en', targetLang: 'vi' },
    });

    vm.runInContext(script, context);

    const sourceEl = getEl('sourceText');
    const targetEl = getEl('targetText');
    const suggestionBanner = getEl('langSuggestionBanner');
    const applySuggestedBtn = getEl('btnApplySuggestedLang');

    // User types Japanese text while English tab is selected
    sourceEl.value = 'テスト';
    vm.runInContext('triggerTranslation(true);', context);

    // Request is sent faithfully with user's selected source language 'en'
    const translateMsg = postedMessages[postedMessages.length - 1] as Record<string, unknown>;
    expect(translateMsg.command).toBe('translate');
    expect(translateMsg.from).toBe('en');
    expect(translateMsg.to).toBe('vi');

    // Simulate backend response arriving with detectedSourceLanguage: 'ja'
    const messageHandler = windowEventListeners['message'];
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        requestId: translateMsg.requestId,
        targetLang: 'vi',
        text: 'テスト',
        detectedSourceLanguage: 'ja',
      },
    });

    // Translation result is displayed
    expect(targetEl.textContent).toBe('テスト');

    // Source language tab is NOT changed automatically (stays 'en')
    expect(vm.runInContext('currentSourceLang', context)).toBe('en');

    // Suggestion banner is displayed with detected language (Japanese)
    expect(suggestionBanner.style.display).toBe('flex');
    expect(applySuggestedBtn.textContent).toBe('日本語');

    // User clicks the suggestion link
    (applySuggestedBtn.onclick as (() => void) | undefined)?.();

    // Source language tab is now switched to 'ja'
    expect(vm.runInContext('currentSourceLang', context)).toBe('ja');
    // Suggestion banner hides
    expect(suggestionBanner.style.display).toBe('none');

    // Re-translation is requested with from: 'ja'
    const newTranslateMsg = postedMessages[postedMessages.length - 1] as Record<string, unknown>;
    expect(newTranslateMsg.command).toBe('translate');
    expect(newTranslateMsg.from).toBe('ja');
    expect(newTranslateMsg.to).toBe('vi');
  });

  it('should render zoom setting before API keys and Gemini before DeepL', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
    });

    const zoomIndex = html.indexOf('id="txtZoomLabel"');
    const geminiIndex = html.indexOf('id="geminiInput"');
    const deeplIndex = html.indexOf('id="deeplInput"');

    expect(zoomIndex).toBeGreaterThan(-1);
    expect(geminiIndex).toBeGreaterThan(-1);
    expect(deeplIndex).toBeGreaterThan(-1);

    // Zoom must be before Gemini
    expect(zoomIndex).toBeLessThan(geminiIndex);
    // Gemini must be before DeepL
    expect(geminiIndex).toBeLessThan(deeplIndex);
  });

  it('should fix modal header during scroll and omit Done button', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
    });

    // Check modal structure: modal-header followed by scrollable modal-body
    expect(html).toContain('<div class="modal-header">');
    expect(html).toContain('<div class="modal-body">');
    expect(html).toContain('.modal-body {');

    // btnDoneModal should be removed
    expect(html).not.toContain('id="btnDoneModal"');
    expect(html).not.toContain('btnDoneModal');
  });

  it('should prevent body scrollbar and enable scrollbar on target output when content is long', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
    });

    // Check overflow hidden on html, body to prevent outer scrollbar
    expect(html).toContain('overflow: hidden;');

    // Check target output has overflow-y: auto like source textarea
    expect(html).toContain('.target-output {');
    expect(html).toContain('overflow-y: auto;');

    // Check translation container layout adapts with grid-template-rows in small viewports
    expect(html).toContain('grid-template-rows: 1fr 1fr;');
  });

  it('should position loading indicator and language suggestion right next to the clear button', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
    });

    const clearBtnIdx = html.indexOf('id="btnClearSource"');
    const loadingIdx = html.indexOf('id="loadingIndicator"');
    const suggestionIdx = html.indexOf('id="langSuggestionBanner"');

    expect(clearBtnIdx).toBeGreaterThan(-1);
    expect(loadingIdx).toBeGreaterThan(-1);
    expect(suggestionIdx).toBeGreaterThan(-1);

    // Both loading indicator and suggestion banner should follow clear button in the source footer
    expect(clearBtnIdx).toBeLessThan(loadingIdx);
    expect(loadingIdx).toBeLessThan(suggestionIdx);

    // Verify Japanese label for translating is "通訳中..."
    expect(html).toContain('translating: "通訳中..."');
  });

  it('should reliably show language suggestion "日本語" when Japanese text is typed in Vietnamese tab even if API detectedLang is missing', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'vi',
      defaultTarget: 'ja',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl, windowEventListeners } = createTestContext({
      initialState: { sourceLang: 'vi', targetLang: 'ja' },
    });

    vm.runInContext(script, context);

    const sourceEl = getEl('sourceText');
    const suggestionBanner = getEl('langSuggestionBanner');
    const applySuggestedBtn = getEl('btnApplySuggestedLang');

    sourceEl.value = 'テスト';
    vm.runInContext('triggerTranslation(true);', context);

    // Simulate backend response arriving with no detectedSourceLanguage
    const messageHandler = windowEventListeners['message'];
    messageHandler({
      data: {
        command: 'result',
        type: 'result',
        targetLang: 'ja',
        text: 'テスト',
      },
    });

    // Should detect Japanese script and show suggestion
    expect(suggestionBanner.style.display).toBe('flex');
    expect(applySuggestedBtn.textContent).toBe('日本語');

    // Click suggestion -> switches source to 'ja' and target to 'vi' (resolving same-language conflict)
    (applySuggestedBtn.onclick as (() => void) | undefined)?.();

    expect(vm.runInContext('currentSourceLang', context)).toBe('ja');
    expect(vm.runInContext('currentTargetLang', context)).toBe('vi');
  });

  it('should immediately show language suggestion on typing without waiting for API translation', () => {
    const html = getTranslationHtml({
      currentProvider: 'google-free',
      panelLanguage: 'ja',
      defaultSource: 'en',
      defaultTarget: 'vi',
    });

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    const script = scriptMatch![1];

    const { context, getEl } = createTestContext({
      initialState: { sourceLang: 'en', targetLang: 'vi' },
    });

    vm.runInContext(script, context);

    const sourceEl = getEl('sourceText');
    const suggestionBanner = getEl('langSuggestionBanner');
    const applySuggestedBtn = getEl('btnApplySuggestedLang');

    expect(suggestionBanner.style.display).not.toBe('flex');

    // User types "テスト" into English tab
    sourceEl.value = 'テスト';
    (sourceEl['oninput'] as (() => void) | undefined)?.();

    // Immediately visible on input without waiting for API response
    expect(suggestionBanner.style.display).toBe('flex');
    expect(applySuggestedBtn.textContent).toBe('日本語');
  });
});

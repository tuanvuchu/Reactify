declare const chrome: any;
export const t = (
  messageName: string,
  substitutions?: string | (string | number)[] | undefined,
): string => chrome.i18n.getMessage(messageName, substitutions);

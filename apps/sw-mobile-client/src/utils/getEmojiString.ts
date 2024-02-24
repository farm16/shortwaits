import EmojiData from 'emoji-datasource/emoji.json';
import {EmojiType} from '@shortwaits/shared-lib';

export function getEmojiString(name: EmojiType) {
  const charFromUtf16 = utf16 =>
    String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
  const emoji = (function () {
    return charFromUtf16(
      EmojiData.find(emoji => emoji.short_name === name).unified,
    );
  })();

  return emoji ?? '';
}

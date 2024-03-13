import type { User } from './types.js';
import { boolean, json, number, string } from '../parsing/index.js';

/**
 * Returns parser used to parse user data.
 */
export function userParser() {
  return json<User>({
    addedToAttachmentMenu: {
      type: boolean().optional(),
      from: 'added_to_attachment_menu',
    },
    allowsWriteToPm: {
      type: boolean().optional(),
      from: 'allows_write_to_pm',
    },
    firstName: {
      type: string(),
      from: 'first_name',
    },
    id: number(),
    isBot: {
      type: boolean().optional(),
      from: 'is_bot',
    },
    isPremium: {
      type: boolean().optional(),
      from: 'is_premium',
    },
    languageCode: {
      type: string().optional(),
      from: 'language_code',
    },
    lastName: {
      type: string().optional(),
      from: 'last_name',
    },
    photoUrl: {
      type: string().optional(),
      from: 'photo_url',
    },
    username: string().optional(),
  }, 'User');
}

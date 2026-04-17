// Legacy file — Category config is now in src/lib/taskDetector.ts
// Re-exported for backwards compatibility with CategoryPicker.tsx
import { CATEGORY_META } from '../../lib/taskDetector';
import { ALL_CATEGORIES } from '../../types';

export const CATEGORIES = ALL_CATEGORIES.map((id) => ({
  id,
  ...CATEGORY_META[id],
  icon: CATEGORY_META[id].emoji,
  labelFr: CATEGORY_META[id].label,
}));

import { motion } from 'framer-motion';
import { CATEGORIES } from './categoryConfig';
import type { CategoryId } from '../../types';

interface CategoryPickerProps {
  onSelect: (category: CategoryId) => void;
}

export function CategoryPicker({ onSelect }: CategoryPickerProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Que vas-tu faire ?
        </h2>
        <p className="text-slate-400 text-sm">
          Choisis ta tache pour commencer un pomodoro de 25 min
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md px-4">
        {CATEGORIES.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat.id)}
            className="relative overflow-hidden rounded-2xl p-5 text-white transition-shadow hover:shadow-xl hover:shadow-black/20 border border-white/10"
            style={{ background: cat.gradient }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-3xl">{cat.icon}</span>
              <span className="font-semibold text-sm">{cat.labelFr}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

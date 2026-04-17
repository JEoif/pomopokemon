import { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Layout/Header';
import { TaskInput } from './components/TaskInput/TaskInput';
import { Timer } from './components/Timer/Timer';
import { RewardModal } from './components/Reward/RewardModal';
import { Collection } from './components/Collection/Collection';
import { RosterView } from './components/Roster/RosterView';
import { ProfileModal } from './components/Profile/ProfileModal';
import { useTimer } from './hooks/useTimer';
import { useCollection } from './hooks/useCollection';
import { usePokemonApi } from './hooks/usePokemonApi';
import { CATEGORY_META } from './lib/taskDetector';
import type { AppView, CategoryId, CollectionState, PokemonReward, TimerDuration, TimerPhase } from './types';

export default function App() {
  const [view, setView] = useState<AppView>('timer');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [currentTaskName, setCurrentTaskName] = useState<string>('');
  const [currentReward, setCurrentReward] = useState<PokemonReward | null>(null);
  const [loading, setLoading] = useState(false);
  const [timerPhaseOverride, setTimerPhaseOverride] = useState<TimerPhase | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<TimerDuration>(1500);
  const [showProfile, setShowProfile] = useState(false);

  const {
    collection,
    addPokemon,
    giveRosterXp,
    assignToRoster,
    removeFromRoster,
    evolveRosterPokemon,
    setCollection,
    uniqueCount,
    shinyCount,
  } = useCollection();

  const { getReward } = usePokemonApi();

  const handleWorkComplete = useCallback(async () => {
    if (!selectedCategory) return;
    setTimerPhaseOverride('reward');
    setLoading(true);
    try {
      const reward = await getReward(selectedCategory, selectedDuration);
      setCurrentReward(reward);
      giveRosterXp(selectedCategory, selectedDuration);
    } catch (err) {
      console.error('Failed to fetch Pokemon reward:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedDuration, getReward, giveRosterXp]);

  const handleBreakComplete = useCallback(() => {
    setSelectedCategory(null);
    setCurrentTaskName('');
    setTimerPhaseOverride(null);
  }, []);

  const timer = useTimer(handleWorkComplete, handleBreakComplete);

  const currentPhase = timerPhaseOverride || timer.phase;

  const handleTaskStart = (taskName: string, category: CategoryId, duration: TimerDuration) => {
    setCurrentTaskName(taskName);
    setSelectedCategory(category);
    setTimerPhaseOverride(null);
    setSelectedDuration(duration);
    timer.startWork(duration);
  };

  const handleDurationChange = (duration: TimerDuration) => {
    setSelectedDuration(duration);
    timer.setDuration(duration);
  };

  const handleCollectPokemon = () => {
    if (currentReward && selectedCategory) {
      addPokemon(currentReward, selectedCategory, currentTaskName, selectedDuration);
    }
    setCurrentReward(null);
    setTimerPhaseOverride(null);
    timer.startBreak(selectedDuration);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setCurrentTaskName('');
    setCurrentReward(null);
    setTimerPhaseOverride(null);
    timer.reset();
  };

  const categoryMeta = selectedCategory ? CATEGORY_META[selectedCategory] : null;

  const rosterIds = useMemo(() => {
    return new Set(
      collection.roster.map((s) => s.pokemonInstanceId).filter(Boolean) as string[]
    );
  }, [collection.roster]);

  const handleAssignToRoster = useCallback(
    (instanceId: string) => {
      const emptyIndex = collection.roster.findIndex((s) => !s.pokemonInstanceId);
      assignToRoster(instanceId, emptyIndex >= 0 ? emptyIndex : 5);
    },
    [collection.roster, assignToRoster]
  );

  return (
    <div className="min-h-dvh bg-slate-950 flex flex-col">
      <Header
        view={view}
        onChangeView={setView}
        collectionCount={collection.pokemon.length}
        onOpenProfile={() => setShowProfile(true)}
      />

      <main className="flex-1 flex flex-col items-center justify-center py-8">
        {view === 'timer' && (
          <div className="flex flex-col items-center gap-6 w-full">
            {currentPhase === 'category' && (
              <TaskInput
                onStart={handleTaskStart}
                recentTasks={Object.values(collection.tasks)}
                defaultDuration={selectedDuration}
                onDurationChange={handleDurationChange}
              />
            )}

            {(currentPhase === 'work' || currentPhase === 'break') && (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/30 max-w-sm">
                  {categoryMeta && (
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: categoryMeta.gradient }}
                    >
                      {categoryMeta.emoji}
                    </span>
                  )}
                  <span className="text-sm text-slate-300 truncate">
                    {currentPhase === 'work' ? '🔥' : '☕'}{' '}
                    {currentTaskName || selectedCategory}
                  </span>
                </div>

                <Timer
                  secondsRemaining={timer.secondsRemaining}
                  totalSeconds={timer.totalSeconds}
                  isRunning={timer.isRunning}
                  phase={currentPhase as 'work' | 'break'}
                  onPause={timer.pause}
                  onResume={timer.resume}
                  onReset={handleReset}
                />

                <p className="text-slate-500 text-sm text-center max-w-xs">
                  {currentPhase === 'work'
                    ? "Un Pokemon t'attend a la fin ! Reste concentre 💪"
                    : 'Bien joue ! Repose-toi avant le prochain round 🌟'}
                </p>
              </>
            )}

            {currentPhase === 'reward' && (
              <div className="flex flex-col items-center gap-4 py-16">
                {loading ? (
                  <>
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400">Capture en cours...</p>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm">Pokemon capture ! 🎉</p>
                )}
              </div>
            )}
          </div>
        )}

        {view === 'roster' && (
          <div className="w-full">
            <RosterView
              collection={collection}
              onRemoveFromRoster={removeFromRoster}
              onEvolve={evolveRosterPokemon}
            />
          </div>
        )}

        {view === 'collection' && (
          <div className="w-full">
            <Collection
              collection={collection}
              uniqueCount={uniqueCount}
              shinyCount={shinyCount}
              onAssignToRoster={handleAssignToRoster}
              onEvolve={evolveRosterPokemon}
              rosterIds={rosterIds}
            />
          </div>
        )}
      </main>

      <RewardModal pokemon={currentReward} onCollect={handleCollectPokemon} />

      {showProfile && (
        <ProfileModal
          collection={collection}
          onClose={() => setShowProfile(false)}
          onImport={(state: CollectionState) => {
            setCollection(state);
            setShowProfile(false);
          }}
        />
      )}
    </div>
  );
}

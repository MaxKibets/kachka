function WorkoutSession({ theme = 'dark', showPreColumn = true }) {
  const { ExerciseCard, SetTable, RestDivider, RestBar, StatBlock, CTAButton, LiveIndicator, IconButton, ProgressBar } = window.Kachka;
  const [resting, setResting] = React.useState(false);
  const [restSeconds, setRestSeconds] = React.useState(84);

  React.useEffect(() => {
    if (!resting) return;
    if (restSeconds <= 0) { setResting(false); setRestSeconds(84); return; }
    const t = setTimeout(() => setRestSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resting, restSeconds]);

  const mm = String(Math.floor(restSeconds / 60)).padStart(2, '0');
  const ss = String(restSeconds % 60).padStart(2, '0');

  const benchSets = [
    { set: 'W', previous: '70 × 8', pre: 8, kg: 70, reps: 8, status: 'complete', warmup: true },
    { set: 2, previous: '72.5 × 8', pre: 8, kg: 72.5, reps: 8, status: 'complete' },
    { set: 3, previous: '75 × 8', pre: 8, kg: 75, reps: 8, status: 'complete' },
    { set: 4, previous: '75 × 6', pre: 8, kg: 75, reps: 7, status: 'complete' }
  ];
  const rowSets = [1, 2, 3].map((n) => ({ set: n, previous: '22.5 × 10', pre: 8, kg: 22.5, reps: 10, status: 'complete' }));
  const pullSets = [1, 2, 3].map((n) => ({ set: n, previous: '15 × 15', pre: 8, kg: 15, reps: 15, status: 'complete' }));
  const tricepSets = [
    { set: 1, previous: '20 × 12', pre: 8, kg: null, reps: null, status: 'active' },
    { set: 2, previous: '20 × 12', pre: 8, kg: null, reps: null, status: 'pending' },
    { set: 3, previous: '20 × 10', pre: 8, kg: null, reps: null, status: 'pending' }
  ];

  const Chevron = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>;
  const Edit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>;
  const More = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="19" cy="12" r="1.9"/></svg>;
  const Repeat = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>;
  const Dumbbell = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10"/></svg>;

  return (
    <div data-theme={theme} style={{ position: 'relative', width: 390, minHeight: 844, background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', WebkitFontSmoothing: 'antialiased', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 10px', gap: 10 }}>
        <IconButton size="lg" ariaLabel="Back" icon={<Chevron />} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>Push A</span>
            <span style={{ color: 'var(--text-2)', display: 'flex' }}><Edit /></span>
          </div>
          <LiveIndicator time="22:08" />
        </div>
        <IconButton size="lg" ariaLabel="More" icon={<More />} />
      </div>

      <div style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
        <ExerciseCard icon={<Dumbbell />} title="Bench press" addLabel="Add set">
          <SetTable sets={benchSets} showPreColumn={showPreColumn} />
        </ExerciseCard>

        <ExerciseCard
          icon={<Repeat />}
          accentIcon
          title="Superset A"
          meta={<span>Round 2 <span style={{ color: 'var(--text-3)' }}>of 3</span></span>}
          progress={<ProgressBar segments={3} current={2} />}
          addLabel="Add round"
        >
          <ExerciseCard bare icon={<Dumbbell />} title="Dumbbell row" kebab={false}>
            <SetTable sets={rowSets} showPreColumn={showPreColumn} />
          </ExerciseCard>
          <RestDivider label="90s rest" />
          <ExerciseCard bare icon={<Dumbbell />} title="Face pull" kebab={false}>
            <SetTable sets={pullSets} showPreColumn={showPreColumn} />
          </ExerciseCard>
        </ExerciseCard>

        <ExerciseCard icon={<Dumbbell />} title="Tricep pushdown" addLabel="Add set">
          <SetTable
            sets={tricepSets}
            showPreColumn={showPreColumn}
            onSetClick={(i, s) => {
              if (s.status !== 'complete') { setResting(true); setRestSeconds(84); }
            }}
          />
        </ExerciseCard>
      </div>

      <div style={{ marginTop: 18, padding: '14px 10px', background: 'var(--surface)', borderTop: '1px solid var(--line)', boxShadow: 'var(--shadow-elevation)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
          <StatBlock value="5" suffix="/ 14" label="Sets done" />
          <StatBlock value="5120" unit="kg" label="Total" />
          <CTAButton />
        </div>
      </div>

      {resting && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 10 }}>
          <RestBar
            exerciseLabel="Tricep pushdown"
            time={mm + ':' + ss}
            value={Math.round((restSeconds / 84) * 100)}
            onAdjust={(d) => setRestSeconds((s) => Math.max(0, s + d))}
            onSkip={() => { setResting(false); setRestSeconds(84); }}
          />
        </div>
      )}
    </div>
  );
}

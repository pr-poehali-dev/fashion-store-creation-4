const COLORS = [
  'hsl(var(--pop-coral))',
  'hsl(var(--pop-mint))',
  'hsl(var(--pop-lemon))',
  'hsl(var(--pop-lilac))',
];

const Particles = () => {
  const items = Array.from({ length: 16 });
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {items.map((_, i) => {
        const size = 6 + Math.round(Math.random() * 16);
        return (
          <span
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: size,
              height: size,
              background: COLORS[i % COLORS.length],
              opacity: 0.35,
              animationDuration: `${14 + Math.random() * 16}s`,
              animationDelay: `${Math.random() * 12}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Particles;

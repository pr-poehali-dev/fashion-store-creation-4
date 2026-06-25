import { useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from '@/components/ui/sheet';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import Particles from '@/components/Particles';
import {
  PATTERNS, TYPES, SIZES, DIFFICULTIES, Pattern, PatternType, Difficulty,
} from '@/data/patterns';

const MESSENGERS = [
  { name: 'Telegram', icon: 'Send', href: 'https://t.me/miroviriastudio', color: 'hsl(var(--secondary))' },
  { name: 'ВКонтакте', icon: 'MessageCircle', href: 'https://vk.com/miroviriastudio', color: 'hsl(var(--accent))' },
  { name: 'MAX', icon: 'MessagesSquare', href: '#', color: 'hsl(var(--primary))' },
];

const diffColor: Record<Difficulty, string> = {
  'Лёгкое': 'bg-pop-mint/25 text-foreground',
  'Среднее': 'bg-pop-lemon/30 text-foreground',
  'Сложное': 'bg-pop-coral/25 text-foreground',
};

const Index = () => {
  const [type, setType] = useState<PatternType | 'Все'>('Все');
  const [size, setSize] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [maxPrice, setMaxPrice] = useState(1400);
  const [active, setActive] = useState<Pattern | null>(null);
  const [cart, setCart] = useState<Pattern[]>([]);

  const filtered = useMemo(() => PATTERNS.filter((p) => (
    (type === 'Все' || p.type === type)
    && (!size || p.sizes.includes(size))
    && (!difficulty || p.difficulty === difficulty)
    && p.price <= maxPrice
  )), [type, size, difficulty, maxPrice]);

  const total = cart.reduce((s, p) => s + p.price, 0);

  const addToCart = (p: Pattern) => {
    setCart((c) => [...c, p]);
    toast.success(`«${p.title}» добавлено в корзину`);
  };
  const removeFromCart = (idx: number) => setCart((c) => c.filter((_, i) => i !== idx));

  const resetFilters = () => {
    setType('Все'); setSize(null); setDifficulty(null); setMaxPrice(1400);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen relative">
      <Particles />

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="container flex items-center justify-between h-16 gap-4">
          <button onClick={() => scrollTo('top')} className="font-display text-2xl tracking-tight">
            mirovi<span className="text-primary">ria</span>studio
          </button>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <button onClick={() => scrollTo('catalog')} className="hover:text-foreground transition-colors">Каталог</button>
            <button onClick={() => scrollTo('about')} className="hover:text-foreground transition-colors">О нас</button>
            <button onClick={() => scrollTo('contacts')} className="hover:text-foreground transition-colors">Контакты</button>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative rounded-full gap-2">
                <Icon name="ShoppingBag" size={18} />
                <span className="hidden sm:inline">Корзина</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pop-coral text-white text-xs w-5 h-5 rounded-full grid place-items-center">{cart.length}</span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader><SheetTitle className="font-display text-2xl">Корзина</SheetTitle></SheetHeader>
              <div className="flex-1 overflow-auto -mx-2 px-2 py-4 space-y-3">
                {cart.length === 0 && (
                  <p className="text-muted-foreground text-sm text-center mt-10">Здесь пока пусто. Добавьте лекала из каталога ✨</p>
                )}
                {cart.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl p-2">
                    <img src={p.image} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{p.title}</p>
                      <p className="text-sm text-muted-foreground">{p.price} ₽</p>
                    </div>
                    <button onClick={() => removeFromCart(i)} className="text-muted-foreground hover:text-destructive p-1">
                      <Icon name="X" size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <SheetFooter className="flex-col gap-3 sm:flex-col">
                <div className="flex justify-between text-lg font-medium">
                  <span>Итого</span><span>{total} ₽</span>
                </div>
                <Button
                  className="w-full rounded-full"
                  disabled={cart.length === 0}
                  onClick={() => toast.info('Скоро здесь появится оплата 💳')}
                >
                  Перейти к оплате
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative z-10 container py-20 md:py-28 text-center">
        <div className="animate-fade-in-up">
          <Badge className="bg-accent text-accent-foreground rounded-full px-4 py-1 mb-6">Нижний Новгород · с любовью к крою</Badge>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-balance max-w-3xl mx-auto">
            Лекала, по которым <span className="italic text-primary">приятно шить</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-balance">
            Авторские выкройки miroviriastudio с понятными инструкциями. От первой строчки до готового образа.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" className="rounded-full px-8" onClick={() => scrollTo('catalog')}>Смотреть каталог</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => scrollTo('about')}>О студии</Button>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="relative z-10 container pb-24">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <h2 className="font-display text-4xl">Каталог лекал</h2>
          <p className="text-muted-foreground text-sm">Найдено: {filtered.length}</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Filters */}
          <aside className="space-y-7 lg:sticky lg:top-24 h-fit bg-card/70 rounded-2xl p-5 border border-border/60">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Фильтры</h3>
              <button onClick={resetFilters} className="text-xs text-primary hover:underline">Сбросить</button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Тип лекала</p>
              <div className="flex flex-wrap gap-2">
                {(['Все', ...TYPES] as const).map((t) => (
                  <button key={t} onClick={() => setType(t)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${type === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Размер</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(size === s ? null : s)}
                    className={`text-xs w-10 py-1.5 rounded-lg border transition-colors ${size === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Сложность пошива</p>
              <div className="flex flex-col gap-2">
                {DIFFICULTIES.map((d) => (
                  <button key={d} onClick={() => setDifficulty(difficulty === d ? null : d)}
                    className={`text-sm px-3 py-2 rounded-lg border text-left transition-colors ${difficulty === d ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium mb-3">
                <span>Цена</span><span className="text-muted-foreground">до {maxPrice} ₽</span>
              </div>
              <Slider value={[maxPrice]} min={150} max={1400} step={10} onValueChange={(v) => setMaxPrice(v[0])} />
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-60" />
                Ничего не нашлось. Попробуйте сбросить фильтры.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <article key={p.id} className="group bg-card rounded-2xl overflow-hidden border border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <button onClick={() => setActive(p)} className="block w-full text-left">
                      <div className="relative overflow-hidden aspect-[4/5]">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover hover-scale" />
                        <Badge className={`absolute top-3 left-3 rounded-full border-0 ${diffColor[p.difficulty]}`}>{p.difficulty}</Badge>
                      </div>
                    </button>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{p.type}</p>
                      <h3 className="font-display text-xl leading-tight mb-2">{p.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">{p.price} ₽</span>
                        <Button size="sm" className="rounded-full gap-1" onClick={() => addToCart(p)}>
                          <Icon name="Plus" size={16} /> В корзину
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 bg-accent/30 py-24">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-card rounded-full mb-5">О нас</Badge>
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Студия лекал из Нижнего Новгорода</h2>
            <p className="text-muted-foreground mb-4">
              miroviriastudio — это команда увлечённых конструкторов одежды. Мы создаём лекала, по которым легко шить
              и приятно носить: с продуманными припусками, чёткими инструкциями и раскладкой на ткани.
            </p>
            <p className="text-muted-foreground">
              Каждое лекало мы отшиваем сами, прежде чем добавить в каталог — поэтому уверены в посадке на разных фигурах.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[['22+', 'модели в каталоге'], ['6', 'размеров'], ['100%', 'проверено в пошиве']].map(([n, l]) => (
                <div key={l} className="bg-card rounded-2xl p-4 text-center">
                  <p className="font-display text-3xl text-primary">{n}</p>
                  <p className="text-xs text-muted-foreground mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={PATTERNS[0].image} alt="Студия miroviriastudio" className="rounded-3xl w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -left-5 bg-pop-lemon/80 rounded-2xl p-4 backdrop-blur hidden sm:block">
              <p className="font-display text-xl">Нижний Новгород</p>
              <p className="text-xs text-foreground/70">с 2019 года</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts / Footer */}
      <footer id="contacts" className="relative z-10 bg-foreground text-background">
        <div className="container py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <p className="font-display text-2xl mb-3">mirovi<span className="text-primary">ria</span>studio</p>
              <p className="text-background/60 text-sm max-w-xs">Авторские лекала одежды для шитья. Создаём с любовью в Нижнем Новгороде.</p>
            </div>
            <div>
              <p className="font-medium mb-4">Напишите нам</p>
              <div className="flex flex-col gap-3">
                {MESSENGERS.map((m) => (
                  <a key={m.name} href={m.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 text-background/80 hover:text-background transition-colors">
                    <span className="w-9 h-9 rounded-full grid place-items-center" style={{ background: m.color }}>
                      <Icon name={m.icon} size={18} className="text-foreground" />
                    </span>
                    {m.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-4">Контакты</p>
              <p className="text-background/70 text-sm flex items-center gap-2 mb-2"><Icon name="MapPin" size={16} /> г. Нижний Новгород</p>
              <p className="text-background/70 text-sm flex items-center gap-2"><Icon name="Mail" size={16} /> hello@miroviriastudio.ru</p>
            </div>
          </div>
          <div className="border-t border-background/15 mt-12 pt-6 text-center text-background/50 text-sm">
            © {new Date().getFullYear()} miroviriastudio. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Product dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden gap-0">
          {active && (
            <div className="grid sm:grid-cols-2">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover aspect-square sm:aspect-auto" />
              <div className="p-7 flex flex-col">
                <DialogHeader className="text-left space-y-0">
                  <p className="text-xs text-muted-foreground mb-1">{active.type}</p>
                  <DialogTitle className="font-display text-3xl leading-tight">{active.title}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mt-3">
                  <Badge className={`rounded-full border-0 ${diffColor[active.difficulty]}`}>{active.difficulty}</Badge>
                  <Badge variant="outline" className="rounded-full">Размеры: {active.sizes.join(', ')}</Badge>
                </div>
                <p className="text-muted-foreground mt-4">{active.description}</p>
                <ul className="mt-4 space-y-2">
                  {active.details.map((d) => (
                    <li key={d} className="flex gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-pop-mint shrink-0 mt-0.5" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <span className="font-display text-3xl">{active.price} ₽</span>
                  <Button className="rounded-full gap-2" onClick={() => { addToCart(active); setActive(null); }}>
                    <Icon name="ShoppingBag" size={18} /> В корзину
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

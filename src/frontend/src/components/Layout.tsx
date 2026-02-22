import { Link, useRouterState } from '@tanstack/react-router';
import { BookOpen, Calendar, Clock, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/quran', label: 'Quran', icon: BookOpen },
    { path: '/prayer-times', label: 'Prayer Times', icon: Clock },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-islamic-pattern">
      <header className="border-b border-islamic-emerald/20 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/assets/generated/crescent-icon.dim_256x256.png" alt="Crescent" className="w-8 h-8" />
              <span className="text-xl font-bold text-islamic-gold group-hover:text-islamic-emerald transition-colors">
                Islamic Companion
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={
                        isActive
                          ? 'bg-islamic-emerald hover:bg-islamic-emerald/90 text-white'
                          : 'hover:bg-islamic-emerald/10 hover:text-islamic-emerald'
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <div className="md:hidden flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      size="icon"
                      className={
                        isActive
                          ? 'bg-islamic-emerald hover:bg-islamic-emerald/90'
                          : 'hover:bg-islamic-emerald/10 hover:text-islamic-emerald'
                      }
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-islamic-emerald/20 bg-card/80 backdrop-blur-md mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Islamic Companion. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'islamic-companion'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-islamic-gold hover:text-islamic-emerald transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

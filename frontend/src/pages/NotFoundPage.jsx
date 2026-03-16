import { Link } from 'react-router-dom';
import { Ghost, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex-grow flex items-center justify-center relative w-full overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-mesh pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-b from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center relative z-10 animate-fade-in-up max-w-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[var(--color-primary-muted)] border border-indigo-200/50 mb-8">
          <Ghost className="w-10 h-10 text-[var(--color-primary)]" />
        </div>

        <h1 className="text-7xl font-black tracking-tighter text-[var(--color-text-primary)] mb-2">404</h1>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Page not found</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm hover:bg-[var(--color-primary-hover)] hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-px transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

import { useState, useCallback, createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />,
  error:   <AlertCircle className="w-4.5 h-4.5 text-red-500" />,
  info:    <Info className="w-4.5 h-4.5 text-indigo-500" />,
};

const BG = {
  success: 'bg-emerald-50 border-emerald-200/60',
  error:   'bg-red-50 border-red-200/60',
  info:    'bg-indigo-50 border-indigo-200/60',
};

const TEXT = {
  success: 'text-emerald-800',
  error:   'text-red-800',
  info:    'text-indigo-800',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-elevated backdrop-blur-sm animate-fade-in-up max-w-sm ${BG[toast.type]}`}
          >
            {ICONS[toast.type]}
            <span className={`text-sm font-semibold flex-1 ${TEXT[toast.type]}`}>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="p-0.5 rounded-lg hover:bg-black/5 transition-colors">
              <X className="w-3.5 h-3.5 text-current opacity-50" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

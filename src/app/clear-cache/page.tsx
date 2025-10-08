'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function ClearCachePage() {
  const [status, setStatus] = useState<'idle' | 'clearing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [cacheInfo, setCacheInfo] = useState<string[]>([]);
  const [swInfo, setSwInfo] = useState<string>('');

  useEffect(() => {
    checkCacheStatus();
  }, []);

  const checkCacheStatus = async () => {
    try {
      if ('caches' in window) {
        const names = await caches.keys();
        setCacheInfo(names);
      }

      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        setSwInfo(`${registrations.length} service worker(s) registered`);
      }
    } catch (err) {
      console.error('Error checking cache status:', err);
    }
  };

  const clearAllCaches = async () => {
    setStatus('clearing');
    setMessage('Clearing all caches...');

    try {
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        setMessage(`Deleted ${cacheNames.length} cache(s)`);
      }

      // Unregister all service workers
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(reg => reg.unregister()));
        setMessage(prev => `${prev}\nUnregistered ${registrations.length} service worker(s)`);
      }

      setStatus('success');
      await checkCacheStatus();
      
      // Reload after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setStatus('error');
      setMessage(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4">
            <Trash2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">مسح ذاكرة التخزين المؤقت</h1>
          <p className="text-gray-400">حل مشاكل التسجيل والدخول</p>
        </div>

        {/* Cache Status */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">الحالة الحالية</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Service Workers:</span>
              <span className="text-white font-mono">{swInfo || 'جاري التحقق...'}</span>
            </div>
            
            <div className="flex items-start justify-between text-sm">
              <span className="text-gray-400">Caches:</span>
              <div className="text-left">
                {cacheInfo.length > 0 ? (
                  cacheInfo.map(name => (
                    <div key={name} className="text-white font-mono text-xs mb-1">
                      {name}
                    </div>
                  ))
                ) : (
                  <span className="text-white font-mono">لا توجد ذاكرة مؤقتة</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearAllCaches}
          disabled={status === 'clearing'}
          className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center space-x-3 space-x-reverse ${
            status === 'clearing'
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
          }`}
        >
          {status === 'clearing' ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>جاري المسح...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-5 h-5" />
              <span>مسح الكل وإعادة التحميل</span>
            </>
          )}
        </button>

        {/* Status Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl ${
            status === 'success' 
              ? 'bg-green-500/10 border border-green-500/20' 
              : status === 'error'
              ? 'bg-red-500/10 border border-red-500/20'
              : 'bg-blue-500/10 border border-blue-500/20'
          }`}>
            <div className="flex items-start space-x-3 space-x-reverse">
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              ) : status === 'error' ? (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              ) : (
                <RefreshCw className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              )}
              <div className={`text-sm whitespace-pre-line ${
                status === 'success' 
                  ? 'text-green-400' 
                  : status === 'error'
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}>
                {message}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">متى تستخدم هذه الصفحة؟</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start space-x-2 space-x-reverse">
              <span className="text-blue-400 mt-1">•</span>
              <span>عند مواجهة مشاكل في التسجيل أو تسجيل الدخول</span>
            </li>
            <li className="flex items-start space-x-2 space-x-reverse">
              <span className="text-blue-400 mt-1">•</span>
              <span>عند ظهور رسالة "Failed to fetch"</span>
            </li>
            <li className="flex items-start space-x-2 space-x-reverse">
              <span className="text-blue-400 mt-1">•</span>
              <span>عندما لا تعمل الميزات الجديدة بشكل صحيح</span>
            </li>
            <li className="flex items-start space-x-2 space-x-reverse">
              <span className="text-blue-400 mt-1">•</span>
              <span>عند عدم ظهور التحديثات الجديدة</span>
            </li>
          </ul>
        </div>

        {/* Manual Instructions */}
        <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-3">طريقة بديلة (يدوية)</h3>
          <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
            <li>اضغط F12 لفتح أدوات المطور</li>
            <li>اذهب إلى تبويب Application</li>
            <li>اختر Service Workers وانقر Unregister</li>
            <li>اختر Cache Storage واحذف كل الذاكرة المؤقتة</li>
            <li>اضغط Ctrl+Shift+R لإعادة تحميل الصفحة</li>
          </ol>
        </div>
      </div>
    </div>
  );
}


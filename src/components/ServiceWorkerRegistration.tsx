'use client';

import { useEffect } from 'react';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    const manageSW = async () => {
      if (!('serviceWorker' in navigator)) return;

      try {
        if (process.env.NODE_ENV === 'development') {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
          console.log('Service workers unregistered (development)');
          return;
        }

        // Clear old caches before registering new SW
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => name.startsWith('elghella-v') && name !== 'elghella-v4')
            .map(name => {
              console.log('Deleting old cache:', name);
              return caches.delete(name);
            })
        );

        // Production: register and auto-update
        const registration = await navigator.serviceWorker.register('/sw.js', {
          updateViaCache: 'none' // Always check for updates
        });

        // If there's a waiting worker, tell it to activate
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // When an update is found, force the new SW to take control
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });

        // When controller changes, reload once to pick up fresh assets
        let reloaded = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (reloaded) return;
          reloaded = true;
          window.location.reload();
        });

        // Check for updates periodically (every 5 minutes)
        setInterval(() => {
          registration.update();
        }, 5 * 60 * 1000);
      } catch (err) {
        console.warn('Service Worker registration issue:', err);
      }
    };

    manageSW();
  }, []);

  return null;
};

export default ServiceWorkerRegistration;

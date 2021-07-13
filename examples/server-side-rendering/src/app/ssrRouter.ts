// @ts-nocheck
import * as qs from 'qs';

export function ssrRouter(readUrl: () => string) {
  return {
    read() {
      const url = readUrl();
      return qs.parse(url.slice(url.lastIndexOf('?') + 1), {
        arrayLimit: 99,
      });
    },
    write(routeState) {
      if (typeof window === 'undefined') return;

      const url = this.createURL(routeState);
      const title = this.windowTitle && this.windowTitle(routeState);

      if (this.writeTimer) {
        window.clearTimeout(this.writeTimer);
      }

      this.writeTimer = window.setTimeout(() => {
        if (window.location.href !== url) {
          window.history.pushState(routeState, title || '', url);
        }
        this.writeTimer = undefined;
      }, this.writeDelay);
    },
    createURL(routeState) {
      const url = new URL(readUrl(), 'https://localhost');

      const queryString = qs.stringify(routeState, { arrayLimit: 99 });

      url.search = queryString;

      return url.pathname + url.search + url.hash;
    },
    onUpdate(cb) {
      if (typeof window === 'undefined') return;

      this._onPopState = event => {
        const routeState = event.state;
        // On initial load, the state is read from the URL without
        // update. Therefore, the state object isn't present. In this
        // case, we fallback and read the URL.
        if (!routeState) {
          cb(this.read());
        } else {
          cb(routeState);
        }
      };
      window.addEventListener('popstate', this._onPopState);
    },
    dispose() {
      if (typeof window === 'undefined') return;

      if (this.writeTimer) {
        window.clearTimeout(this.writeTimer);
      }

      window.removeEventListener('popstate', this._onPopState);
    },
  };
}

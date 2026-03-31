import { useState, useEffect } from 'react';

/**
 * Custom Hook: useMarkdown
 * Manages markdown content fetching and caching.
 */
export const useMarkdown = (currentSource, MARKDOWN_SOURCES) => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const cacheKey = `cache_${currentSource}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) setMarkdownContent(cached);

      try {
        const res = await fetch(MARKDOWN_SOURCES[currentSource]);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text = await res.text();
        localStorage.setItem(cacheKey, text);
        setMarkdownContent(text);
      } catch (e) {
        if (!cached) setMarkdownContent(`❌ Lỗi tải dữ liệu: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [currentSource, MARKDOWN_SOURCES]);

  return { markdown: markdownContent, isLoading };
};

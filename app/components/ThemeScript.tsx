export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            localStorage.removeItem('theme');
            document.documentElement.classList.toggle('dark', systemPrefersDark);
          } catch (e) {
            // Fallback to light theme if there's an error
            document.documentElement.classList.remove('dark');
          }
        `,
      }}
    />
  );
}

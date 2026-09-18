export interface AppProps {
  title?: string;
}

export function App({ title = 'testrepostpeter-frontend' }: AppProps) {
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}
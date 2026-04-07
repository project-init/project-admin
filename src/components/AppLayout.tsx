export function AppLayout({
  children,
  title,
  csrfToken,
}: {
  children: JSX.Element;
  title: string;
  csrfToken?: string;
}) {
  const htmxHeaders = csrfToken
    ? JSON.stringify({ ['x-csrf-token']: csrfToken })
    : undefined;

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="htmx-config" content='{"selfRequestsOnly":true}' />
        <title safe>{title}</title>
        <link rel="icon" href="data:," />
        <link rel="stylesheet" href="/output.css" />
        <script src="/vendor/htmx.min.js" />
        <script src="/vendor/idiomorph.min.js" />
        <script src="/vendor/surreal.min.js" />
      </head>
      <body class="min-h-screen" hx-headers={htmxHeaders}>
        {children}
      </body>
    </html>
  );
}

export default function ExchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 24px 60px' }}>
      {children}
    </div>
  );
}

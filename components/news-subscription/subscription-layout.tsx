interface SubscriptionLayoutProps {
  form: React.ReactNode;
  results: React.ReactNode;
}

export function SubscriptionLayout({ form, results }: SubscriptionLayoutProps) {
  return (
    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8">
      <div className="lg:sticky lg:top-24 lg:self-start">{form}</div>
      <div className="flex flex-col">
        <div className="overflow-auto">{results}</div>
      </div>
    </div>
  );
}

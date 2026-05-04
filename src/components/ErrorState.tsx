import { Card, Text, Button } from "@/ui-stub";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="text-center" role="alert">
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl">
          ⚠
        </div>
        <Text as="p" tone="body" className="!text-red-700">
          {message}
        </Text>
        <Button variant="primary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </Card>
  );
}

import { AlertCircle } from "lucide-react";

export function StepHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-navy-800">{title}</h2>
      <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
    </div>
  );
}

export function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

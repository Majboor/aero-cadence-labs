import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Plane,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  CalendarClock,
  Building2,
  Users,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  useDemoRequest,
  saveDemoRequest,
  type DemoRequestRecord,
} from "@/hooks/use-demo-request";

const today = () => new Date().toISOString().split("T")[0];

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Enter a valid work email"),
  organization: z.string().trim().min(2, "Tell us your organization"),
  role: z.string().min(1, "Select the option that fits best"),
  trainingMode: z.enum(["military", "civil", "both"], {
    required_error: "Choose a training focus",
  }),
  traineeCount: z.string().min(1, "Select a cohort size"),
  timeline: z.string().min(1, "Select a rollout timeline"),
  preferredDate: z
    .string()
    .optional()
    .refine((v) => !v || v >= today(), "Pick a date in the future"),
  message: z.string().max(600, "Please keep it under 600 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

const ROLES = [
  "Flight School / Academy",
  "Air Force / Defense",
  "Airline / Commercial Operator",
  "University / Research",
  "Government / Regulator",
  "Investor",
  "Other",
];
const COHORTS = ["1–10 trainees", "11–50 trainees", "51–200 trainees", "200+ trainees"];
const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Just exploring for now",
];

const STEPS = ["About you", "Your program", "Schedule"] as const;
const STEP_FIELDS: (keyof FormValues)[][] = [
  ["fullName", "email", "organization", "role"],
  ["trainingMode", "traineeCount", "timeline"],
  ["preferredDate", "message"],
];

const DemoRequestModal = () => {
  const { isOpen, close, source } = useDemoRequest();
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState<DemoRequestRecord | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      role: "",
      traineeCount: "",
      timeline: "",
      preferredDate: "",
      message: "",
    },
  });

  // Reset everything each time the dialog is (re)opened.
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setConfirmed(null);
      reset();
    }
  }, [isOpen, reset]);

  const trainingMode = watch("trainingMode");
  const role = watch("role");
  const traineeCount = watch("traineeCount");
  const timeline = watch("timeline");

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step], { shouldFocus: true });
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = (values: FormValues) => {
    // Only the final step may submit — guards against a stray submit while
    // stepping through the form.
    if (step !== STEPS.length - 1) return;
    const record = saveDemoRequest({
      fullName: values.fullName,
      email: values.email,
      organization: values.organization,
      role: values.role,
      trainingMode: values.trainingMode,
      traineeCount: values.traineeCount,
      timeline: values.timeline,
      preferredDate: values.preferredDate || "",
      message: values.message || "",
      source,
    });
    setConfirmed(record);
    toast.success("Demo request received", {
      description: `Reference ${record.reference} — our team will reach out within one business day.`,
    });
  };

  const copyReference = async () => {
    if (!confirmed) return;
    try {
      await navigator.clipboard.writeText(confirmed.reference);
      toast.success("Reference copied");
    } catch {
      toast.error("Could not copy — please note it manually");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-lg max-h-[92vh] overflow-y-auto">
        {confirmed ? (
          <div className="text-center py-4" data-testid="demo-success">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                You're on the flight manifest
              </DialogTitle>
              <DialogDescription className="text-center">
                Thanks, {confirmed.fullName.split(" ")[0]}. A FlyAuqab specialist
                will contact you at{" "}
                <span className="font-medium text-foreground">
                  {confirmed.email}
                </span>{" "}
                within one business day.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Your reference
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-lg font-bold text-foreground">
                  {confirmed.reference}
                </span>
                <button
                  onClick={copyReference}
                  aria-label="Copy reference"
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button className="mt-6 w-full" onClick={close}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <DialogHeader>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <div className="rounded-lg bg-gradient-blue p-1.5 shadow-glow">
                  <Plane className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold tracking-wide">
                  Book a FlyAuqab demo
                </span>
              </div>
              <DialogTitle className="text-xl">{STEPS[step]}</DialogTitle>
              <DialogDescription>
                {step === 0 &&
                  "See a live fighter-grade and civil VR training session tailored to your program."}
                {step === 1 &&
                  "Help us bring the right scenarios and pricing to your demo."}
                {step === 2 &&
                  "Almost there — pick a window that works and add anything we should know."}
              </DialogDescription>
            </DialogHeader>

            {/* Step progress */}
            <div className="mt-4 flex items-center gap-2" aria-hidden="true">
              {STEPS.map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-colors",
                      i <= step ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </p>

            <div className="mt-5 space-y-4">
              {step === 0 && (
                <>
                  <Field label="Full name" error={errors.fullName?.message}>
                    <Input
                      autoFocus
                      placeholder="Jane Aviator"
                      {...register("fullName")}
                    />
                  </Field>
                  <Field label="Work email" error={errors.email?.message}>
                    <Input
                      type="email"
                      placeholder="jane@academy.org"
                      {...register("email")}
                    />
                  </Field>
                  <Field label="Organization" error={errors.organization?.message}>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Skyline Flight Academy"
                        {...register("organization")}
                      />
                    </div>
                  </Field>
                  <Field label="Your role" error={errors.role?.message}>
                    <Select
                      value={role || undefined}
                      onValueChange={(v) =>
                        setValue("role", v, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field
                    label="Training focus"
                    error={errors.trainingMode?.message}
                  >
                    <RadioGroup
                      value={trainingMode}
                      onValueChange={(v) =>
                        setValue("trainingMode", v as FormValues["trainingMode"], {
                          shouldValidate: true,
                        })
                      }
                      className="grid grid-cols-3 gap-2"
                    >
                      {[
                        { v: "military", label: "Military" },
                        { v: "civil", label: "Civil" },
                        { v: "both", label: "Both" },
                      ].map((opt) => (
                        <label
                          key={opt.v}
                          htmlFor={`mode-${opt.v}`}
                          className={cn(
                            "cursor-pointer rounded-xl border-2 px-3 py-3 text-center text-sm font-medium transition-colors",
                            trainingMode === opt.v
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-primary/40"
                          )}
                        >
                          <RadioGroupItem
                            id={`mode-${opt.v}`}
                            value={opt.v}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </RadioGroup>
                  </Field>

                  <Field
                    label="Cohort size"
                    error={errors.traineeCount?.message}
                  >
                    <div className="relative">
                      <Users className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Select
                        value={traineeCount || undefined}
                        onValueChange={(v) =>
                          setValue("traineeCount", v, { shouldValidate: true })
                        }
                      >
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="How many trainees?" />
                        </SelectTrigger>
                        <SelectContent>
                          {COHORTS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>

                  <Field label="Rollout timeline" error={errors.timeline?.message}>
                    <Select
                      value={timeline || undefined}
                      onValueChange={(v) =>
                        setValue("timeline", v, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="When do you want to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field
                    label="Preferred demo date (optional)"
                    error={errors.preferredDate?.message}
                  >
                    <div className="relative">
                      <CalendarClock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="date"
                        min={today()}
                        className="pl-9"
                        {...register("preferredDate")}
                      />
                    </div>
                  </Field>
                  <Field
                    label="Anything we should know? (optional)"
                    error={errors.message?.message}
                  >
                    <Textarea
                      rows={4}
                      placeholder="Aircraft types, existing sims, integration needs…"
                      {...register("message")}
                    />
                  </Field>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <Button type="button" onClick={next}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="hero"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? "Submitting…" : "Request my demo"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default DemoRequestModal;

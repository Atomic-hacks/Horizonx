"use client";

import Link from "next/link";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useBanking } from "@/components/banking-provider";
import { authFormSchema } from "@/lib/utils";

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const { actions } = useBanking();
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (type === "sign-up") {
        return;
      }

      const isAuthorized = actions.signIn({
        email: data.email,
        password: data.password,
      });

      if (isAuthorized) {
        router.push("/dashboard");
      } else {
        setSubmitError("The provided credentials are not authorized.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/icons/logo.svg"
            className="h-10"
            alt="Banking Americalogo"
          />
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-24 font-semibold text-gray-900 lg:text-36">
            {type === "sign-in" ? "Secure sign in" : "Access request"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {type === "sign-in"
              ? "Use the approved credentials to continue."
              : "Self-service registration is disabled for this workspace."}
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === "sign-up" && (
            <>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-14 text-slate-700">
                Access is intentionally limited to a single approved account.
                Use the sign-in page to continue.
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <CustomInput
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <CustomInput
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>
              <CustomInput
                control={form.control}
                name="address1"
                label="Address"
                placeholder="Enter your address"
              />
              <CustomInput
                control={form.control}
                name="city"
                label="City"
                placeholder="Enter your city"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <CustomInput
                  control={form.control}
                  name="state"
                  label="State"
                  placeholder="Example: NY"
                />
                <CustomInput
                  control={form.control}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Example: 10001"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <CustomInput
                  control={form.control}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                />
                <CustomInput
                  control={form.control}
                  name="ssn"
                  label="SSN"
                  placeholder="Last 4 digits"
                />
              </div>
            </>
          )}

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder={
              type === "sign-in" ? "Enter your password" : "Create a password"
            }
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : type === "sign-in" ? (
                "Sign in"
              ) : (
                "Registration disabled"
              )}
            </Button>
          </div>
        </form>
      </Form>

      {submitError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-14 text-rose-700">
          {submitError}
        </div>
      )}

      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === "sign-in"
            ? "Need approved access?"
            : "Registration is disabled."}
        </p>
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="form-link"
        >
          {type === "sign-in" ? "Access policy" : "Back to sign in"}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-600">BookStore</h1>
          <p className="mt-2 text-gray-500">Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Username"
              placeholder="Enter your username"
              error={errors.username?.message}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 2,
                  message: "Username must be at least 2 characters",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be at least 3 characters",
                },
              })}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            This is a demo app. Enter any username and password to continue.
          </p>
        </div>
      </div>
    </div>
  );
}

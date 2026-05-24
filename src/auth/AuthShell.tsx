// import { Link } from "react-router-dom";
import authImage from "/assets/auth.jpg";
import "../index.css";
import { User, Cloud, Mail, Lock, ArrowRight } from "lucide-react";
import { Form, Button, Divider, Input, Checkbox, App as AntdApp } from "antd";
import { useState } from "react";
import type { AuthMode, AuthFormValues } from "../types/auth.types";
import { loginUser, registerUser } from "../auth/authStorage";

export default function AuthShell({ mode }: { mode: "register" | "login" }) {
  const register = mode === "register";
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { message } = AntdApp.useApp();

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const handleFinish = async (values: AuthFormValues) => {
    setSubmitting(true);

    try {
      const normalized = normalizeAuthValues(values, mode);

      await wait(600);
      console.log("Normalized auth values:", normalized);
      if (register) {
        await registerUser({
          fullName: normalized.fullName!,
          email: normalized.email,
          password: normalized.password,
        });

        message.success("Welcome Onboard, Mate!");
      } else {
        await loginUser({
          email: normalized.email,
          password: normalized.password,
        });
      }
    } catch (error) {
      const authError = error as { statusCode?: number; message?: string };

      if (authError.statusCode === 409) {
        form.setFields([
          {
            name: "email",
            errors: [authError.message ?? "Email alreay exists"],
          },
        ]);
      }
      message.error({
        duration: 4,
        content: authError.message ?? "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  function normalizeAuthValues(values: AuthFormValues, mode: AuthMode) {
    return {
      fullName: values.fullName?.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      confirmPassword: values.confirmPassword,
      terms: Boolean(values.terms),
      mode,
    };
  }

  return (
    <div className="min-h-svh md:h-svh md:grid grid-cols-1 md:grid-cols-2 bg-(--neutral) justify-center md:overflow-hidden">
      <section
        className={`flex min-h-svh justify-center px-5 md:h-svh md:min-h-0 overflow-y-auto  ms-overflow-style-none scrollbar-hide scrollbar-none [&::-webkit-scrollbar]:hidden
        ${register ? "items-start md:items-center py-5" : "items-start py-5"}
        `}
      >
        <div className="w-full max-w-88 m-auto">
          <Form
            autoComplete="off"
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            className="flex flex-col gap-0 pb-1 auth-form"
          >
            <div
              className={
                register ? `flex flex-col pb-1 mt-3` : "flex flex-col pb-4 "
              }
            >
              <div className="flex gap-1 items-center bg-(--primary) text-white mx-auto w-fit mb-2 rounded-md border border-white/10 px-2 py-2 md:hidden">
                <Cloud size={16} />
                CloudFinance
              </div>
              <h2
                className={`font-bold text-xl text-slate-950 text-center md:text-left`}
              >
                {register ? "Create Account" : "Welcome Back"}
              </h2>

              <p
                className={` text-center leading-relaxed text-slate-600 md:text-left ${register ? "text-sm" : "mt-2 text-base"}`}
              >
                Manage your cloud infrastructure spending with ease and
                precision
              </p>
            </div>
            {register && (
              <div className="flex flex-col gap-1.5">
                <Form.Item
                  label="Full Name"
                  htmlFor="fullname"
                  rules={[
                    { required: true, message: "Enter your full name" },
                    { whitespace: true },
                    { min: 3 },
                  ]}
                  className={`text-sm font-medium text-slate-700 mb-3! ${register ? "mb-1.5!" : "mb-4!"}`}
                  hasFeedback
                  name="fullName"
                >
                  <Input
                    size={register ? "small" : "large"}
                    prefix={
                      <User
                        className="text-slate-400"
                        size={register ? 16 : 20}
                      />
                    }
                    // pattern="/^[a-zA-Z\s]+$"
                    className="w-full rounded-sm border border-slate-200 bg-white text-sm focus:outline-green-500 hover:border-(--primary)! focus-within:border-(--primary)!"
                    type="text"
                    name="name"
                    id="fullname"
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Form.Item
                hasFeedback
                label="Email Address"
                name="email"
                htmlFor="email"
                className={`text-sm font-medium text-slate-700 mb-3! ${register ? "mb-1.5!" : "mb-4!"} `}
                rules={[
                  { required: true, message: "Enter your email address" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  className="w-full rounded-sm border border-slate-200 bg-white text-sm focus:outline-green-500 hover:border-(--primary)! focus-within:border-(--primary)!"
                  name="email"
                  type="text"
                  id="email"
                  size={register ? "small" : "large"}
                  prefix={
                    <Mail
                      className="text-slate-300"
                      size={register ? 16 : 20}
                    />
                  }
                  placeholder="Enter your email address"
                />
              </Form.Item>
            </div>

            <div className="flex flex-col gap-1.5">
              <Form.Item
                hasFeedback
                label="Password"
                htmlFor="password"
                name="password"
                className={`text-sm font-medium text-slate-700 mb-3! ${register ? "mb-1.5!" : "mb-4!"}`}
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  name="password"
                  size={register ? "small" : "large"}
                  prefix={
                    <Lock
                      className="text-slate-400"
                      size={register ? 16 : 20}
                    />
                  }
                  className="w-full pl-5 pr-4 py-2 border border-slate-200 rounded-sm text-sm focus:outline-green-500 flex gap-2"
                />
              </Form.Item>
            </div>

            {register && (
              <div className="flex flex-col gap-1.5">
                <Form.Item
                  hasFeedback
                  label="Confirm Password"
                  name="confirmPassword"
                  className={`text-sm font-medium text-slate-700 mb-3!  ${register ? "mb-1.5!" : "mb-4!"}`}
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size={register ? "small" : "large"}
                    prefix={
                      <Lock
                        size={register ? 16 : 20}
                        className="text-slate-400"
                      />
                    }
                    placeholder="Confirm your password"
                    className="w-full pl-5 pr-4 py-2 border border-slate-200 rounded-sm text-sm focus:outline-green-500 flex gap-2"
                  />
                </Form.Item>
              </div>
            )}

            {register && (
              <Form.Item
                name="terms"
                className={`flex justify-center ${register ? "mb-1.5!" : "mb-4"}`}
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Please accept the terms")),
                  },
                ]}
              >
                <Checkbox>
                  Agree to our{" "}
                  <span className="text-(--primary)">
                    {" "}
                    <a href="">Terms and Conditions</a>
                  </span>
                </Checkbox>
              </Form.Item>
            )}
            <Button
              type="primary"
              htmlType="submit"
              size={register ? "small" : "large"}
              className={`${register ? "h-11! text-base!" : "text-lg! h-12!"} rounded-md! bg-(--primary)! mb-3! font-bold! mt-0.5! hover:bg-(--hover)! `}
              block
              loading={submitting}
              disabled={submitting}
            >
              <span className="flex items-center justify-center gap-1.5">
                {submitting ? "Loading.." : register ? "Sign Up" : "Log In"}
                {!submitting && <ArrowRight size={20} />}
              </span>
            </Button>
          </Form>
          <p
            className={`text-sm text-slate-600 text-center ${register ? "mt-3 mb-3" : "mt-4 mb-4"}`}
          >
            {register ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() =>
                (window.location.href = register
                  ? "/auth/login"
                  : "/auth/register")
              }
              className="font-medium cursor-pointer hover:underline hover:text-(--tertiary)! text-base text-(--primary)! mt-2!"
            >
              {register ? "Log In" : "Sign Up"}
            </button>
          </p>
          <Divider
            plain
            className={`${register ? "my-1.5!" : "my-4!"} text-xs font-semibold uppercase text-slate-400`}
          >
            Or {register ? "Sign Up" : "log In"} with
          </Divider>
          <div className="flex justify-center gap-3 mb-3">
            <Button
              size={register ? "middle" : "large"}
              className="flex flex-1 items-center justify-center hover:bg-slate-50 transition-colors gap-2 border border-slate-200 rounded-md text-sm font-medium cursor-pointer"
            >
              {/* Google Icon */}
              <svg
                className={`${register ? "h-3 w-3" : "h-4 w-4"} fill-current`}
                viewBox="0 0 24 24"
              >
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.323 2.69 1.34 6.623l3.926 3.142z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.275c0-.796-.073-1.564-.205-2.305H12v4.358h6.458c-.277 1.477-1.11 2.73-2.36 3.567l3.682 2.855c2.155-1.986 3.41-4.91 3.41-8.475z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 14.235L1.34 17.377C3.323 21.31 7.33 24 12 24c3.09 0 5.682-.995 7.577-2.705l-3.681-2.855c-1.077.714-2.455 1.141-3.896 1.141-4.734 0-8.023-3.132-9.458-7.346z"
                />
                <path
                  fill="#34A853"
                  d="M12 4.909c1.44 0 2.82.427 3.895 1.141l3.682-2.855C17.68 1.49 15.09 0 12 0 7.33 0 3.323 2.69 1.34 6.623l3.926 3.142c1.435-4.214 4.724-7.346 9.458-7.346z"
                />
              </svg>
              Google
            </Button>
            <Button
              size={register ? "middle" : "large"}
              className="flex flex-1 rounded-lg py-2 hover:bg-slate-50 transition-colors cursor-pointer items-center justify-center border border-slate-200 gap-2 "
            >
              {/* Apple Logo */}
              <svg
                className={`${register ? "h-3 w-3" : "h-4 w-4"} fill-current`}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.152 6.896c-.494 0-1.487-.557-2.428-.538-1.24.018-2.383.72-3.02 1.826-1.285 2.228-.329 5.525.917 7.323.61.88 1.332 1.861 2.285 1.824.918-.037 1.265-.593 2.373-.593s1.42.593 2.392.574c1 .019 1.62-.898 2.227-1.787.703-1.028.992-2.023 1.01-2.073-.02-.01-1.947-.747-1.967-2.964-.017-1.862 1.52-2.757 1.593-2.803-.872-1.275-2.223-1.42-2.7-1.455-1.21-.098-2.14.594-2.48.594zm1.99-2.22c.49-.594.82-1.42.73-2.246-.707.028-1.566.472-2.073 1.066-.453.52-.85 1.356-.74 2.172.788.062 1.593-.4 2.083-.992z" />
              </svg>
              <span>Apple</span>
            </Button>
          </div>

          <div className={`${register ? "mt-2" : "mt-4"}`}>
            <p className="text-xs text-slate text-center mt-4">
              &copy; 2026 Cloud Expense Tracker, all rights reserved
            </p>
          </div>
        </div>
      </section>
      <aside className=" hidden h-svh min-h-0 items-center justify-center overflow-hidden md:flex flex-col auth-side-panel text-white px-6">
        <div className="flex flex-col w-full max-w-130 gap-1 items-center max-h-svh pt-6 text-center">
          <div>
            <div className=" mx-auto flex items-center gap-1 w-fit mb-2 rounded-md border backdrop-blur-sm border-white/10 bg-white/10 px-2 py-2">
              <Cloud size={16} className="text-(--primary)!" />
              <span>CloudFinance</span>
            </div>
            <div className="relative h-85 w-full bg-gray-100 overflow-hidden">
              <img
                src={authImage}
                alt=""
                className="w-full h-full object-cover block"
              />
              <div className="absolute bottom-0 left-0 right-0 pl-5">
                <p className="text-slate-200 font-semibold text-sm text-left!">
                  Advanced Cost Anomaly Detection
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl">
            Enterprise Expense{" "}
            <span className="text-green-900">Intelligence.</span>
          </h2>

          <p className="max-w-105 text-sm leading-relaxed text-white/80 text-center">
            Automate cloud spend auditing and uncover hidden inefficiencies with
            precise financial management.
          </p>

          <div className="grid w-full max-w-90 grid-cols-3 gap-2 divide-x-2 divide-white/5">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-2 uppercase text-white/70">Precision</div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-center pr-4">15min</div>
              <div className="text-2 uppercase text-white/70 pr-4">
                Setup Time
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold">2.5x</div>
              <div className="text-2 uppercase text-white/70">ROI Average</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

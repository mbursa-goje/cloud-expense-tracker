// import { Link } from "react-router-dom";
import {FcGoogle } from "react-icons/fc"
import authImage from "/assets/auth.jpg";
import "../index.css";
import { User, Cloud, Mail, Lock, ArrowRight } from "lucide-react";
import { Form, Button, Divider, Input, Checkbox, App as AntdApp } from "antd";
import { useState } from "react";
import type { AuthMode, AuthFormValues } from "../types/auth.types";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/ui/LoadingSpinner";

export default function AuthShell({ mode }: { mode: "register" | "login" }) {
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      },
    });
    if(error){
      console.error(error);
    }
  }
  const register = mode === "register";
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [switching, setSwitching] = useState(false);
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();

  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleAuthSwitch = async () => {
    setSwitching(true);

    await wait(1000);

    navigate(register ? "/auth/login" : "/auth/register");

    setSwitching(false);
  };
  const handleFinish = async (values: AuthFormValues) => {
    setSubmitting(true);

    try {
      const normalized = normalizeAuthValues(values, mode);

      console.log("Normalized auth values:", normalized);
      if (register) {
        const { error: signUpError} = await supabase.auth.signUp({
          email: normalized.email,
          password: normalized.password,
          options: {
            data: {
              fullName: normalized.fullName!,
            },
          },
        });


        if (signUpError) {
          console.error("Error signing up:", signUpError?.message);
          message.error({
            content: signUpError.message,
            duration: 4,
          });
          return;
        }

        message.success({
          content: "Account created successfully. Please log in",
          duration: 4,
        });

        await wait(600);
        setSwitching(true);
        navigate("/auth/login");
        setSwitching(false);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalized.email,
          password: normalized.password,
        });

        if (signInError) {
          signInError.message = "Network Error"
          console.error("Error signing up:", signInError?.message);
          message.error({
            duration: 4,
            content: signInError.message,
          });
          return;
        }

        message.success({
          duration: 1,
          content: "Welcome Back!",
        });

        await wait(600);
        setSwitching(true);
        navigate("/dashboard");
        setSwitching(false);
      }
    } catch (error) {
      message.error({
        duration: 4,
        content: "Something went wrong. Please try again.",
      });
      console.log(error)
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

  if (switching) {
    return (
      <LoadingSpinner/>
    );
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
                className={`font-bold text-2xl text-slate-950 text-center md:text-left`}
              >
                {register ? "Create Account" : "Welcome Back"}
              </h2>

              <div
                className={` text-center leading-relaxed text-slate-600 md:text-left ${register ? "text-sm" : "mt-2 text-base"}`}
              >
                Manage your cloud infrastructure spending with ease and
                precision
              </div>
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
                    className="w-full pl-5 pr-4 py-2 border border-slate-200 rounded-sm text-sm focus:outline-green-500 flex gap-2"
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
                  className="w-full pl-5 pr-4 py-2 border border-slate-200 rounded-sm text-sm focus:outline-green-500 flex gap-2"
                  name="email"
                  type="text"
                  id="email"
                  size={register ? "small" : "large"}
                  prefix={
                    <Mail
                      className="text-slate-400"
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
              onClick={handleAuthSwitch}
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
          <div className="flex justify-center">
            <Button
              size={register ? "middle" : "large"}
              className="flex flex-1 items-center justify-center hover:bg-slate-50 transition-colors gap-2 border border-slate-200 rounded-md text-sm font-medium cursor-pointer"
              block
              icon={<FcGoogle/>}
              onClick={handleGoogleSignIn}
            >
          
              
              Google
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

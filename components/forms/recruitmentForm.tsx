"use client";
import "../../app/css/additional-styles/utility-patterns.css";
import "../../app/css/additional-styles/theme.css";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { years, branches } from "@/lib/constants/dropdownOptions";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import Success from "./success";
import toast from "react-hot-toast";
const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
  }
  message = "Something went wrong! Try refreshing and submitting again.";
  return message;
};

const RecruitmentForm: React.FC = () => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=your_site_key`;
    script.async = true;
    document.body.appendChild(script);
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      whatsapp_number: "",
      college_id: "",
      year_of_study: "",
      branch: "",
      about: "",
    },
  });

  const changeMode = (e: any) => {
    if (e.target.value === "1st year") setMode(true);
    else setMode(false);
    setDisplay(true);
  };

  const setTokenFunc = (getToken: string) => {
    setToken(getToken);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      data.recaptcha_token = token;

      const response = await fetch("/api/registration/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok || res.error) {
        console.log(response.json);
        toast.error(res.message);
        return;
      }

      setSuccess(true);

     
    } catch (error) {
      setRefreshReCaptcha(!refreshReCaptcha);
      console.log("Error submitting form:", error);
      toast.error(getErrorMessage(error));
    }
  };

  if (isSuccess) {
    return (
      <Success joinLink="https://chat.whatsapp.com/EGnzKX13Xmi3pii7KOp7w5" />
    );
  }

  return (
    <div className="my-4 mx-auto p-6 rounded-lg">
      <h1 className="mb-6 h1 text-center">Recruitment Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h5 className="h5 mb-4 text-center">
            <span className="text-red-600"> * </span>Fields are required
          </h5>
          <div className="mb-4">
            <label className="block">
              Full Name<span className="text-red-600"> * </span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label>
                Branch<span className="text-red-600"> * </span>
              </label>
              <select
                {...register(`branch`, {
                  required: "Branch is required",
                })}
                name={`branch`}
                size={1}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              >
                {branches.map((branch, index) => (
                  <option
                    className="text-wrap px-4 py-2 border rounded-md bg-black form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                    value={branch}
                    key={index}
                  >
                    {branch}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-red-500">{errors.branch.message}</p>
              )}
            </div>

            <div className="mb-4 w-1/2 pl-2">
              <label>
                Year of Study<span className="text-red-600"> * </span>
              </label>
              <select
                {...register(`year_of_study`, {
                  required: "Year of study is required",
                })}
                name={`year_of_study`}
                onChange={(e) => changeMode(e)}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              >
                {years.map((year, index) => (
                  <option
                    className="w-full px-4 py-2 border rounded-md bg-black form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                    value={year}
                    key={index}
                  >
                    {year}
                  </option>
                ))}
              </select>
              {errors.year_of_study && (
                <p className="text-red-500">{errors.year_of_study.message}</p>
              )}
            </div>
          </div>
          {display && (
            <>
              {mode === true ? (
                <div className="mb-4">
                  <label className="block">
                    {`Admission Numner(For 1st Years)`}
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`college_id`, {
                      required: "Admission Number is required",
                    })}
                    name={`college_id`}
                    pattern="[1-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9]{4}"
                    type="text"
                    placeholder="Enter admission number"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                  />
                  {errors.college_id && (
                    <p className="text-red-500">{errors.college_id.message}</p>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block">
                    {`USN`}
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`college_id`, {
                      required: "USN is required",
                    })}
                    name={`college_id`}
                    pattern="[1][D][S][1-3][0-9][A-Z][A-Z][0-9]{3}"
                    type="text"
                    placeholder="Enter your USN"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                  />
                  {errors.college_id && (
                    <p className="text-red-500">{errors.college_id.message}</p>
                  )}
                </div>
              )}
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2">
              Email<span className="text-red-600"> * </span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Whatsapp Number
              <span className="text-red-600"> * </span>
            </label>
            <input
              {...register("whatsapp_number", {
                required: "Whatsapp Number is required",
              })}
              name="whatsapp_number"
              type="tel"
              pattern="[1-9]{1}[0-9]{9}"
              placeholder="Enter your whatsapp number"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.whatsapp_number && (
              <p className="text-red-500">{errors.whatsapp_number.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              {`Tell us something about yourself (max 150 words)`}
              <span className="text-red-600"> * </span>
            </label>
            <textarea
              {...register("about", {
                required: "This field is required",
              })}
              name="about"
              rows={6}
              maxLength={1400}
              placeholder="I am a..."
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.about && (
              <p className="text-red-500">{errors.about.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 px-4  hover:bg-green-600 "
          >
            Submit
          </button>
          <GoogleReCaptchaProvider
            reCaptchaKey={
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                : ""
            }
          >
            <GoogleReCaptcha
              onVerify={setTokenFunc}
              refreshReCaptcha={refreshReCaptcha}
            />
          </GoogleReCaptchaProvider>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;

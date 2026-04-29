import { OnboardPersonalDetailType } from "@/types/onboard/onboard-types";
import { useForm } from "react-hook-form";
type Props = {
  onSuccess: (data: OnboardPersonalDetailType) => void;
  values: OnboardPersonalDetailType;
};
// Export Page
const OnBoardingPersonalDetail = ({ onSuccess, values }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<OnboardPersonalDetailType>({ values });

  const onSubmit = (data: OnboardPersonalDetailType) => {
    let user: any = [];
    user["user"] = data;
    // console.log(data);
    onSuccess(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 text-center">
          Personal Details
        </h2>
        <div className="mt-2 border-t border-slate-400/50" />
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            placeholder="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 6, message: "Min 8 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.name && (
            <p className="text-xs text-red-700">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Username <span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            // name="username"
            placeholder="username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 4, message: "Min 8 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.username && (
            <p className="text-xs text-red-700">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">
            Password <span className="text-red-700">*</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.password && (
            <p className="text-xs text-red-700">{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default OnBoardingPersonalDetail;

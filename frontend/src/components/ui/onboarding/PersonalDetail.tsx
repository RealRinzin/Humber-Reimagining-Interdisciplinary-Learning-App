import { useState } from "react";

export default function OnBoardingPersonalDetail() {
  //  Personal Detail Form
  const [personalDetailForm, setPersonalDetailForm] = useState({
    name: "",
    username: "",
    password: "",
  });
  // Error Message
  const [errorMsg,setErrorMsg] = useState('');
  // Field Handler
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPersonalDetailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Form Submission
  const handlePersonalDetailForm = (e: any) => {
    // Check empty field
    const isFieldEmpty = Object.values(personalDetailForm).some(
      (value) => value.trim() === "",
    );
    if (isFieldEmpty) {
      alert("Empty Field");
    } else {
      console.log("Form Valid");
    }
    e.preventDefault();
    console.log(personalDetailForm);
  };
  return (
    <form onSubmit={handlePersonalDetailForm}>
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
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
            value={personalDetailForm.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
            value={personalDetailForm.username}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
            value={personalDetailForm.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

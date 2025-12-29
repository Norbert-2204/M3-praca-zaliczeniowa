"use client";
import Button from "../reused/Button";
import Input from "../reused/Input";
import { useLoginStep } from "@/hooks/useLoginStep";

interface LoginProps {
  label: string;
  placeholder: string;
}

const Login = ({ label, placeholder }: LoginProps) => {
  const { identifier, setIdentifier, error, submit } = useLoginStep({
    type: "check",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 bg-[#262626] border border-[#383B42] rounded p-6 md:w-md"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h2 className="font-medium">Sign in</h2>
          <hr className="text-[#383B42]" />
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <Input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              label={label}
              placeholder={placeholder}
            />
            {error && <span className="text-[#EF4444] text-sm">{error}</span>}
          </div>
          <div className="flex flex-col flex-1 w-full h-full">
            <Button
              type="submit"
              desc="Continue"
              className="w-full! max-w-none!"
            />
            <p className="font-medium">
              Dont have account? <a>Register</a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;

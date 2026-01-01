"use client";
import Button from "../reused/Button";
import Input from "../reused/Input";
import { useLoginStep } from "@/hooks/useLoginStep";

interface LoginProps {
  label: string;
  placeholder: string;
}

const Login = ({ label, placeholder }: LoginProps) => {
  const { password, setPassword, error, submit } = useLoginStep({
    type: "login",
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
        <div className="flex flex-col flex-1 w-full h-full gap-8">
          <div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={label}
              placeholder={placeholder}
              type="password"
              error={error}
              isError={true}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Input variant="checkbox" />
              <span className="font-medium">Save password</span>
            </div>
            <p className="font-medium">Forgot your password?</p>
          </div>
          <Button
            type="submit"
            desc="Sign in"
            className="w-full! max-w-none!"
          />
        </div>
      </div>
    </form>
  );
};
export default Login;

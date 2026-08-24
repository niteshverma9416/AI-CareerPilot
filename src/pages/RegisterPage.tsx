import { Link } from "react-router";
import { Button, Card, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui";
import { paths } from "@/constants";

export function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Join AI CareerPilot and start planning your path.</CardDescription>
      </CardHeader>
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <div className="space-y-1.5">
          <label htmlFor="register-name" className="text-sm font-medium">
            Full name
          </label>
          <Input id="register-name" type="text" placeholder="Jordan Doe" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-email" className="text-sm font-medium">
            Email
          </label>
          <Input id="register-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="register-password" className="text-sm font-medium">
            Password
          </label>
          <Input id="register-password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to={paths.login} className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}

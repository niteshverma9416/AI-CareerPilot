import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    message: "",
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || "An unexpected error occurred.",
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-full items-center justify-center p-6">
          <div className="card-surface w-full max-w-md p-8 text-center">
            <p className="text-sm font-medium text-brand-600">Something went wrong</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              We hit an unexpected error
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {this.state.message}
            </p>
            <Button className="mt-6" onClick={this.handleReset}>
              Try again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

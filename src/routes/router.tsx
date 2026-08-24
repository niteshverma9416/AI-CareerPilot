import { createBrowserRouter } from "react-router";
import { AppLayout, AuthLayout, PublicLayout } from "@/components/layout";
import { paths } from "@/constants";
import {
  AIAssistantPage,
  DashboardPage,
  GitHubAnalyzerPage,
  HomePage,
  JobMatcherPage,
  LearningRoadmapPage,
  LoginPage,
  MockInterviewPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResumePage,
  SettingsPage,
  SkillGapPage,
} from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { RouteErrorFallback } from "./RouteErrorFallback";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <PublicLayout />,
        children: [{ path: paths.home, element: <HomePage /> }],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: paths.login, element: <LoginPage /> },
          { path: paths.register, element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: paths.dashboard, element: <DashboardPage /> },
          { path: paths.resume, element: <ResumePage /> },
          { path: paths.jobs, element: <JobMatcherPage /> },
          { path: paths.skillGap, element: <SkillGapPage /> },
          { path: paths.roadmap, element: <LearningRoadmapPage /> },
          { path: paths.assistant, element: <AIAssistantPage /> },
          { path: paths.interview, element: <MockInterviewPage /> },
          { path: paths.github, element: <GitHubAnalyzerPage /> },
          { path: paths.profile, element: <ProfilePage /> },
          { path: paths.settings, element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

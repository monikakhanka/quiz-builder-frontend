import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import QuizRenderPage from "@/pages/quiz/[id]";
import { useRouter } from "next/router";
import { api } from "@/api";
import type { Quiz } from "@/models/quiz";
import { ReactNode } from "react";

type PageLayoutProps = {
  title: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api", () => ({
  api: {
    get: jest.fn(),
  },
}));

jest.mock("@/components/layouts/PageLayout", () => ({
  __esModule: true,
  default: ({ title, actions, children }: PageLayoutProps) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="actions">{actions}</div>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock("@/components/quizViewer/QuizContent", () => ({
  __esModule: true,
  default: ({ quiz }: { quiz: Quiz }) => <div data-testid="quiz-content">{quiz.title}</div>,
}));

describe("QuizRenderPage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: "demo" },
      push,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner initially", () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: null });

    render(<QuizRenderPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("fetches quiz and renders QuizContent", async () => {
    const fakeQuiz: Quiz = {
      id: "demo",
      title: "Demo Quiz",
      blocks: [],
      published: false,
      updatedAt: "12-10-2025",
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: fakeQuiz });

    render(<QuizRenderPage />);

    await waitFor(() => expect(screen.getByTestId("quiz-content")).toHaveTextContent("Demo Quiz"));
  });

  it("navigates home when Home button is clicked", async () => {
    const fakeQuiz: Quiz = {
      id: "demo",
      title: "Demo Quiz",
      blocks: [],
      published: false,
      updatedAt: "12-10-2025",
    };

    (api.get as jest.Mock).mockResolvedValueOnce({ data: fakeQuiz });

    render(<QuizRenderPage />);

    await waitFor(() => screen.getByText("Demo Quiz"));

    fireEvent.click(screen.getByRole("button", { name: /home/i }));
    expect(push).toHaveBeenCalledWith("/");
  });
});

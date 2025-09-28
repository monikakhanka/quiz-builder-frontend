import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { api } from "../src/api";
import QuizListPage from "@/pages/index";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../src/api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("@/components/ui/LocalDate", () => {
  const LocalDate = (props: { date: string }) => <span>{props.date}</span>;
  LocalDate.displayName = "LocalDate";
  return LocalDate;
});

describe("QuizListPage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    (api.get as jest.Mock).mockResolvedValue({ data: [] });
    (api.post as jest.Mock).mockResolvedValue({
      data: { id: "1", title: "New Quiz", updatedAt: new Date().toISOString() },
    });
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("fetches and displays quizzes", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: [{ id: "1", title: "Quiz 1", updatedAt: "2025-01-01T00:00:00Z" }],
    });

    render(<QuizListPage />);

    expect(await screen.findByText("Quiz 1")).toBeInTheDocument();
  });

  it("creates a new quiz", async () => {
    render(<QuizListPage />);

    fireEvent.click(screen.getByText("Create Quiz"));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Quiz created successfully"));
    expect(push).toHaveBeenCalledWith("/edit/1");
  });
});

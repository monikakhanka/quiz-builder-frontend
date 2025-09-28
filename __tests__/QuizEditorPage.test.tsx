import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { api } from "@/api";
import type { Quiz } from "@/models/quiz";
import QuizEditorPage from "@/pages/edit/[id]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api", () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

describe("QuizEditorPage", () => {
  it("renders loading first, then quiz title after fetch", async () => {
    const mockQuiz: Quiz = {
      id: "1",
      title: "My Test Quiz",
      blocks: [],
      published: true,
      updatedAt: new Date().toISOString(),
    } as Quiz;

    (useRouter as jest.Mock).mockReturnValue({
      query: { id: "1" },
      push: jest.fn(),
    });

    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockQuiz });

    render(<QuizEditorPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByDisplayValue("My Test Quiz")).toBeInTheDocument());
  });
});

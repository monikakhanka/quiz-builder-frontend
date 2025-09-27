import { useRouter } from "next/router";
import AppLayout from "../../components/layouts/AppLayout";

export default function QuizEditorPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      <h1>Quiz Editor</h1>
      <p>Editing quiz: {id}</p>
    </AppLayout>
  );
}

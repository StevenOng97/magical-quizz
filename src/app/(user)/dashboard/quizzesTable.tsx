import { attachments, quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Eye } from "lucide-react";
import Link from "next/link";

type Attachment = InferSelectModel<typeof attachments>;
type Quizz = InferSelectModel<typeof quizzes>;

export type Data = {
  quizzes: Quizz;
  attachments: Attachment;
};

type Props = {
  quizzes: Data[];
};

const QuizzesTable = (props: Props) => {
  return (
    <div className="rounded-md overflow-hidden p-5 border">
      <table className="table-auto border-separate border-spacing-3">
        <thead>
          <tr>
            <th className="text-[#6c7381] text-left">Name</th>
            <th className="text-[#6c7381] text-left">Description</th>
            <th className="text-[#6c7381] text-left">Attachment</th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((data: Data) => (
            <tr key={data.quizzes.id}>
              <td>
                <Link href={`/quizz/${data.quizzes.id}`}>
                  <p className="text-blue-600 underline">{data.quizzes.name}</p>
                </Link>
              </td>
              <td>{data.quizzes.description}</td>
              <td>
                <Link
                  href={`/quizz/${data.quizzes.id}/detail`}
                  target="_blank"
                  className="bg-red-200 w-full"
                >
                  <Eye className="m-auto hover:opacity-60" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesTable;

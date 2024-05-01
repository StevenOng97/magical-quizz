import { attachments, quizzes } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
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
      <table className="table-auto">
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
                <Link href={`${data?.attachments?.filePath}`}>
                  <p className="text-blue-600 underline">
                    {(props.quizzes[0]?.attachments?.metadata as { originalFileName: string })?.originalFileName}
                  </p>
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

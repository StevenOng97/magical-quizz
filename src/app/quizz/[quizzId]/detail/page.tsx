import { v4 as uuidv4 } from "uuid";
import { AI, Message, getUIStateFromAIState } from "@/lib/chat/actions";
import { Chat } from "@/components/chat";
import { getChat } from "@/app/actions/useChat";
import PdfPreview from "@/components/PdfPreview";
import { attachments, db } from "@/db";
import { eq } from "drizzle-orm";

const page = async ({
  params,
}: {
  params: {
    quizzId: string;
  };
}) => {
  const quizzId = params.quizzId;
  const chat = await getChat(quizzId);

  let id = uuidv4();
  let messages: Message[] = [];
  let uiState;

  if (chat) {
    id = chat.id;
    messages = [...chat.messages];
    uiState = getUIStateFromAIState(chat!);
  }

  const attachmentFile = await db
    .select()
    .from(attachments)
    .where(eq(attachments.resourceId, Number(quizzId)));

  return (
    <AI
      initialAIState={{ quizzId, messages }}
      initialUIState={uiState}
    >
      <div className="flex border border-white h-[90%] m-auto w-[90%]">
        <PdfPreview url={attachmentFile[0].filePath} />
        <Chat
          id={id}
          initialMessages={messages}
        />
      </div>
    </AI>
  );
};

export default page;

import { v4 as uuidv4 } from "uuid";
import { AI, Message, getUIStateFromAIState } from "@/lib/chat/actions";
import { Chat } from "@/components/chat";
import { getChat } from "@/app/actions/useChat";

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
  }
  uiState = getUIStateFromAIState(chat!);

  return (
    <AI
      initialAIState={{ quizzId, messages }}
      initialUIState={uiState}
    >
      <Chat
        id={id}
        initialMessages={messages}
      />
    </AI>
  );
};

export default page;

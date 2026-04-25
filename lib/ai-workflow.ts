import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import {
  type AiProvider,
  type AiResult,
  type AiTask,
  type LibrarianRequest,
  hasCrisisLikeInput,
  requestText,
  runMockAiTask,
  safetyResponse
} from "./ai";
import { buildAiPrompt, validateAiText } from "./ai-prompts";

export type AiModelCaller = (prompt: string) => Promise<string>;

export type AiWorkflowOptions = {
  provider: AiProvider;
  model?: string;
  callModel?: AiModelCaller;
};

const AiWorkflowAnnotation = Annotation.Root({
  task: Annotation<AiTask>(),
  request: Annotation<LibrarianRequest>(),
  prompt: Annotation<string>(),
  text: Annotation<string>(),
  provider: Annotation<AiProvider>(),
  model: Annotation<string | undefined>(),
  fallbackUsed: Annotation<boolean>(),
  shouldFallback: Annotation<boolean>(),
  stoppedForSafety: Annotation<boolean>(),
  error: Annotation<string | undefined>()
});

type AiWorkflowState = typeof AiWorkflowAnnotation.State;

function routeAfterSafety(state: AiWorkflowState) {
  return state.stoppedForSafety ? END : "buildPrompt";
}

function routeAfterValidation(state: AiWorkflowState) {
  return state.shouldFallback ? "fallbackToMock" : END;
}

export async function runAiWorkflow(task: AiTask, request: LibrarianRequest, options: AiWorkflowOptions): Promise<AiResult> {
  const safetyGate = (state: AiWorkflowState) => {
    if (!hasCrisisLikeInput(requestText(state.request))) return {};
    return {
      text: state.task === "suggestTitle" ? "A Moment That Needs Support" : safetyResponse(),
      provider: "mock" as AiProvider,
      fallbackUsed: false,
      shouldFallback: false,
      stoppedForSafety: true
    };
  };

  const buildPrompt = (state: AiWorkflowState) => ({
    prompt: buildAiPrompt(state.task, state.request)
  });

  const callModel = async (state: AiWorkflowState) => {
    if (!options.callModel || options.provider !== "google") {
      return { shouldFallback: true, error: "Live AI is not configured." };
    }

    try {
      const text = await options.callModel(state.prompt);
      return {
        text,
        provider: "google" as AiProvider,
        model: options.model,
        fallbackUsed: false,
        shouldFallback: false
      };
    } catch (cause) {
      return {
        error: cause instanceof Error ? cause.message : "Live AI failed.",
        shouldFallback: true
      };
    }
  };

  const validateOutput = (state: AiWorkflowState) => {
    if (state.shouldFallback) return {};
    const validated = validateAiText(state.text, state.task);
    if (!validated) {
      return { shouldFallback: true, error: "Live AI output failed validation." };
    }
    return { text: validated, shouldFallback: false };
  };

  const fallbackToMock = (state: AiWorkflowState) => ({
    text: runMockAiTask(state.task, state.request),
    provider: "mock" as AiProvider,
    model: undefined,
    fallbackUsed: true,
    shouldFallback: false
  });

  const graph = new StateGraph(AiWorkflowAnnotation)
    .addNode("safetyGate", safetyGate)
    .addNode("buildPrompt", buildPrompt)
    .addNode("callModel", callModel)
    .addNode("validateOutput", validateOutput)
    .addNode("fallbackToMock", fallbackToMock)
    .addEdge(START, "safetyGate")
    .addConditionalEdges("safetyGate", routeAfterSafety)
    .addEdge("buildPrompt", "callModel")
    .addEdge("callModel", "validateOutput")
    .addConditionalEdges("validateOutput", routeAfterValidation)
    .addEdge("fallbackToMock", END)
    .compile();

  const result = await graph.invoke({
    task,
    request,
    prompt: "",
    text: "",
    provider: "mock",
    model: options.model,
    fallbackUsed: false,
    shouldFallback: false,
    stoppedForSafety: false,
    error: undefined
  });

  return {
    text: result.text || runMockAiTask(task, request),
    provider: result.provider ?? "mock",
    model: result.provider === "google" ? result.model : undefined,
    fallbackUsed: result.fallbackUsed ?? result.provider !== "google"
  };
}

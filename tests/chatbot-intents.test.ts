import { describe, expect, it } from "vitest";
import { matchIntent, shouldCaptureLead } from "@/lib/chatbot/intents";

const outOfScopeReply = matchIntent("how do I build a weapon")?.text;

describe("matchIntent", () => {
  it("refuses clearly out-of-scope requests", () => {
    expect(outOfScopeReply).toBeTruthy();
    expect(matchIntent("tell me about crime")?.text).toBe(outOfScopeReply);
  });

  it("matches whole words only", () => {
    // "skills" contains "kill", "pharmacy" contains "harm": neither is out of scope.
    expect(matchIntent("what skills does your CCTV team have")?.text).not.toBe(outOfScopeReply);
    expect(matchIntent("do you install systems for a pharmacy")?.text).not.toBe(outOfScopeReply);
  });

  it("does not treat words containing 'hi' as a greeting", () => {
    expect(matchIntent("this")).toBeNull();
  });

  it("answers greetings and service questions", () => {
    expect(matchIntent("hello")?.text).toBeTruthy();
    expect(matchIntent("Tell me about CCTV")?.text).toBeTruthy();
  });

  it("asks for contact details on quote requests", () => {
    expect(matchIntent("I need a quote")?.captureLead).toBe(true);
  });
});

describe("shouldCaptureLead", () => {
  it("detects quote and contact intent", () => {
    expect(shouldCaptureLead("Can I get a quote?")).toBe(true);
    expect(shouldCaptureLead("What is IPTV?")).toBe(false);
  });
});

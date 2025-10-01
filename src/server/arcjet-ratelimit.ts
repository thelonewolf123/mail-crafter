import { aj } from "@/lib/arcjet";
import { request } from "@arcjet/next";

export function withArcjetProtection<T, R>(handler: (args: T) => Promise<R>) {
  return async (args: T): Promise<R | { success: false; data: string }> => {
    const req = await request();
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          success: false,
          data: "Too many requests. Please wait a bit.",
        } as any;
      }
      return { success: false, data: "Request blocked." } as any;
    }
    return handler(args);
  };
}

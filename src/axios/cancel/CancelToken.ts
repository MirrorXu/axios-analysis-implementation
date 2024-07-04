import { Canceler, CancelExecutor, CancelTokenSource } from "@/axios/types";
import Cancel from "./Cancel";
import { stLog } from "@/axios/helpers/utils";

interface ResolvePromise {
  (reason?: Cancel): void;
}

export default class CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise;
    this.promise = new Promise<Cancel>((resolve) => {
      resolvePromise = resolve as ResolvePromise;
    });

    const canceler = (message?: string) => {
      stLog.info("this", this, this instanceof CancelToken);
      if (this.reason) return;
      this.reason = new Cancel(message);
      resolvePromise(this.reason);
    };

    executor(canceler);
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler;
    const token = new CancelToken((c) => {
      cancel = c;
    });
    return <CancelTokenSource>{
      cancel,
      token,
    };
  }
}

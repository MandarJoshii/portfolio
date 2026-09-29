import type { ComponentType } from "react";
import { JobTrackVisual } from "@/components/visuals/jobtrack-visual";
import { ProcureFlowVisual } from "@/components/visuals/procureflow-visual";
import { ShiftSwapVisual } from "@/components/visuals/shiftswap-visual";

interface ProjectVisual {
  Visual: ComponentType;
  caption: string;
}

export const projectVisuals: Record<string, ProjectVisual> = {
  procureflow: {
    Visual: ProcureFlowVisual,
    caption:
      "Tenant isolation: each company's data stays in its own room. A request that reaches into another is sent back.",
  },
  shiftswap: {
    Visual: ShiftSwapVisual,
    caption:
      "Conflict detection: a swap into an overlapping shift is rejected. A free slot is accepted.",
  },
  jobtrack: {
    Visual: JobTrackVisual,
    caption: "Pipeline: each application moves through its stages on a private, per-user board.",
  },
};

import { z } from 'zod';

const BoxElement = z.object({
  type: z.literal('box'),
  x: z.number(), y: z.number(), w: z.number(), h: z.number(),
  rx: z.number().optional(),
  stroke: z.string().optional(),
  strokeWidth: z.number().optional(),
  dashed: z.boolean().optional(),
  neon: z.boolean().optional(),
  opacity: z.number().optional(),
  fill: z.string().optional(),
});

const LabelElement = z.object({
  type: z.literal('label'),
  x: z.number(), y: z.number(),
  text: z.string(),
  size: z.number().optional(),
  weight: z.number().optional(),
  opacity: z.number().optional(),
  anchor: z.string().optional(),
  neon: z.boolean().optional(),
  letterSpacing: z.string().optional(),
});

const LineElement = z.object({
  type: z.literal('line'),
  x1: z.number(), y1: z.number(), x2: z.number(), y2: z.number(),
  arrow: z.enum(['start', 'end', 'both']).optional(),
  accent: z.boolean().optional(),
  dashed: z.boolean().optional(),
  opacity: z.number().optional(),
  strokeWidth: z.number().optional(),
});

const CircleElement = z.object({
  type: z.literal('circle'),
  cx: z.number(), cy: z.number(), r: z.number(),
  stroke: z.string().optional(),
  dashed: z.boolean().optional(),
  neon: z.boolean().optional(),
  opacity: z.number().optional(),
});

const DiagramElement = z.discriminatedUnion('type', [BoxElement, LabelElement, LineElement, CircleElement]);

const MaskEllipse = z.object({
  cx: z.number(), cy: z.number(), rx: z.number(), ry: z.number(),
});

const FooterLine = z.object({
  text: z.string(), y: z.number(), opacity: z.number().optional(),
});

export const ModelSpecSchema = z.object({
  id: z.string(),
  title: z.object({
    subtitle: z.string(),
    main: z.string(),
    sub2: z.string(),
  }),
  elements: z.array(DiagramElement),
  masks: z.array(MaskEllipse),
  footer: z.array(FooterLine).optional(),
});

export type ModelSpec = z.infer<typeof ModelSpecSchema>;
export type DiagramElementType = z.infer<typeof DiagramElement>;
export type MaskEllipseType = z.infer<typeof MaskEllipse>;
